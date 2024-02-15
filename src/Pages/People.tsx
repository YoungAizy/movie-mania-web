import React, { useEffect, useState } from 'react'
import { useNavigate }  from 'react-router-dom';
import Header from '../components/Header.tsx'
import axios from 'axios'
import { img_300, unavailable } from '../config/config'
import { IconButton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import '../styles/Card.scss'
import CustomPagination from '../components/Pagination/CustomPagination.tsx';

export default function People() {
    const [page, setPage] = useState(1);
    const [numofPages, setNumOfPages] = useState(1)
    const [searchPage, setSearchPages] = useState(1)
    const [people, setPeople] = useState([])
    const [searchQuery, setSearchQuery] = useState("")
    const [searching, setSearching] = useState(false)
    const savedFaves = JSON.parse(sessionStorage.getItem('peopleFaves')) || {};

    const saveFave = (e, newFave) => {
        if (savedFaves[newFave.id]) {
            // If the selected person is already favourited, remove them from favourite list
            delete savedFaves[newFave.id];
            sessionStorage.setItem('peopleFaves', JSON.stringify(savedFaves));
            e.target.style.color = "black"
        } else {
            // Add a new favourite person 
            savedFaves[newFave.id] = newFave;
            sessionStorage.setItem('peopleFaves', JSON.stringify(savedFaves));
            e.target.style.color = "rgb(235, 222, 47)"
        }     
    }

    useEffect(() => {
        if(searchQuery.length === 0 )return setSearching(false);
        const Search = async()=>{
            setPeople([])
            const { data } = await axios(`https://api.themoviedb.org/3/search/person?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchQuery}&page=${searchPage}&include_adult=false`);
            setPeople(data.results);
            setNumOfPages(data.total_pages)
        }

        searching && Search();
       
   }, [searchPage, searchQuery, searching])

    useEffect(() => {
        // console.log("hey", savedFaves)
        const fetch = async () => {
            setPeople([])
            const {data} = await axios(`https://api.themoviedb.org/3/person/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`);
            setPeople(data.results);
            setNumOfPages(data.total_pages)
        }
        !searching && fetch();

        
        // eslint-disable-next-line
    },[page, searching])

    return (
        <div>
            <Header isHomePage={false} />
            <form className='search-form'>
                <div className="search-container">
                    <input className='search-input' type="text" placeholder="Search for a person..." onChange={e => {setSearching(true); setSearchQuery(e.target.value)}}/>
                </div>
            </form>
            <div className="people-wrapper">
                {people && people.map((person: {}) => (
                    <div key={person.id} style={{ margin: "1rem" }}><CardPerson faved={savedFaves} person={person} saveFave={saveFave} /></div>))}
            </div>
            <CustomPagination numofPages={numofPages} setPage={!searching ? setPage:setSearchPages }/>
        </div>
    )
}

const FrontCard = ({ poster, name, department }) => {
    return (  
       <div className="card">
            <img src={poster ? `${img_300}${poster}`: unavailable}  alt='' className="poster"/>
            <h2>{name}</h2>
            <div className="card-footer">
                <span className="span-dark">{department}</span>
            </div>
        </div>
    )
}
type cardPropTypes={
    person: {},
    saveFave: React.MouseEventHandler,
    faved: any[],
    isFav?: boolean,
    setClicked: Function,
}
export const CardPerson = ({ person, saveFave, isFav, setClicked=()=>{}, faved }:cardPropTypes) => {
    let navigate = useNavigate();

    const getPersonInfo = (id) => {
        console.log(id)
        if (isFav) {
            setClicked(id)
        } else {
            navigate(`/people/${id}`)
        }
    }

        return (
            <div>
                   <div className="card-wrap">
                    <div className="card-inner">    
                    <FrontCard poster={person.profile_path} name={person.name} department={person.known_for_department} />
                     <div className="card-back" >
                        <h2>{person.name}</h2>
                        <ul>
                            <li><strong>Career: </strong>{person.known_for_department}</li>
                            <li><strong>Known For: </strong> 
                            { person['known_for'].map(movie=>(<i key={movie.id}>{movie.title}, </i>))}</li>
                            <li><strong>Popularity: </strong> 50.9</li>
                        </ul>
                        <div className='card-footer'>
                            <button className='btn-more' onClick={()=>getPersonInfo(person.id)}>More</button>
                            <IconButton
                                onClick={e=>saveFave(e, person)}
                                style={{justifySelf:'end', padding:"8px"}}
                                size="large"><StarIcon style={{color:`${faved[person.id] ? "rgb(235, 222, 47)":"black"}`}}/></IconButton>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        );
}

