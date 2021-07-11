import React, { useEffect, useState, useMemo } from 'react'
import ContentModal from '../components/ContentModal/ContentModal';
import Header from '../components/Header'
import PersonContent  from '../components/PersonContent';
import { img_300, unavailable } from '../config/config';
import { CardPerson } from './People';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export default function Favourites() {
    const [movies, setMovies] = useState([]);
    const [shows, setShows] = useState([]);
    const [people, setPeople] = useState([]);
    const [personClicked, setPersonClicked] = useState();
    const a = useMemo(()=>JSON.parse(sessionStorage.getItem('faveShows')) || {},[]);
    const b = useMemo(()=>JSON.parse(sessionStorage.getItem('faveMovies'))|| {},[]);
    const c = useMemo(()=>JSON.parse(sessionStorage.getItem('peopleFaves'))||{},[]);

    useEffect(() => {
        a && setShows(Object.values(a));
        b && setMovies(Object.values(b));
        c && setPeople(Object.values(c));
    }, [a,b,c]);
    
    const removeFave = (element, faves) => {
        delete c[faves.id];
        sessionStorage.setItem('peopleFaves', JSON.stringify(c));
        element.target.style.color = "black"
    }

    return (
        <div>
            <Header isHomePage={false} />
            <div className="favourites-wrapper">
                <div className="people-section">
                    <h1 id="peopleHeader" className="headers">
                        {personClicked ? <button style={btnStyle} onClick={()=>setPersonClicked(null)}><ArrowBackIcon /></button> : "People"}
                    </h1>
                    <div className='people-container' style={{height: `${people.length===0 && "auto"}`}}>
                        {people.length>0 ? people.map(person =>
                            (<div key={person.id} style={{ margin: "0 1rem 1rem" }}><CardPerson person={person} saveFave={removeFave} faved={c} isFav={true} setClicked={setPersonClicked} /></div>)) :
                            (  <div style={{width:"100%"}}>
            <h4 style={{textAlign:"center"}}>No Content.</h4>
        </div>)}
                    </div>
                </div>
                <div className="shows-favs">
                    {personClicked ? (<PersonContent id={personClicked} />) : (
                        <div>
                            <h1 className="headers" style={{marginTop:"0"}}>Movies</h1>
                            <div className="faves-container">
                                {movies.length>0 ? movies.map(movie => (
                                    <FavouriteItem key={movie.id} poster={movie.poster_path} content={movie} type="movie" faves={b} />
                                )): <h2 style={{textAlign:"center", width:"100%", color:"gray"}}>No Favourites Set Yet.</h2>}
                            </div>
                            <h1 className="headers">Shows</h1>
                            <div className="faves-container">
                                {shows.length>0 ? shows.map(show => (
                                    <FavouriteItem key={show.id} poster={show.poster_path} content={show} type="tv" faves={a} />
                                )): <h2 style={{textAlign:"center", width:"100%", color:"gray"}}>No Favourites Set Yet.</h2>}
                            </div>
                        </div>
                   )}
                </div>
                
            </div>
        </div>
    )
}

const FavouriteItem = ({ poster, content, type, faves }) => {
    
    return (
        <ContentModal id={content.id} type={type} faves={faves} stored={content} contentStyle="fav-card">
            <img style={{height:"100%"}} src={poster ? `${img_300}${poster}`: unavailable} alt="" />
        </ContentModal>
    )
}

const btnStyle = { cursor: "pointer", border: "none", background:"inherit", padding:"4px 12px" }
