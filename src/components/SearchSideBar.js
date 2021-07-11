import React, { useState} from 'react'
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Genres from './Genres'

const SearchSideBar = props => {
    const [searchText, setSearchText] = useState('');

    const fetchSearch = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios(`https://api.themoviedb.org/3/search/${props.type}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchText}&page=1&include_adult=false`);
            props.setContent(data.results)
        } catch (error) {
            console.log(error)
        }
    }

    const closeMobileSearch = (e) => {
        document.getElementById("search-container").classList.toggle("show-search");
        e.target.style.display = "none";
    }

    if (window.innerWidth <= 720) {
        return (
            <div id="mobileSearch-wrapper" onClick={e=>closeMobileSearch(e)}>
                <div id="search-container" className="argh" style={{background:"black"}} onClick={e => e.stopPropagation()}>
                    <div className="mobile-searchbar">
                        <form style={{background:"white", borderRadius:"8px"}}>
                            <TextField onChange={(e)=>setSearchText(e.target.value)} style={{width:"84%", color:"white"}} id="outlined-size-small" label="Search field" type="search" variant="outlined" size="small" />
                            <button onClick={e => fetchSearch(e)} style={{padding:"6.5px 6px", width:"16%", background:"blue", border:"none", cursor:"pointer", borderBottomRightRadius:"6px", borderTopRightRadius:"6px"}}><SearchIcon></SearchIcon></button>
                        </form>
                        <Genres genres={props.genres} setGenres={props.setGenres} selectedGenres={props.selectedGenres} setselectedGenres={props.setselectedGenres} type={props.type} />
                    </div>
                </div>

            </div>
        )
    }

    return (
        <div className="searchbar" style={{ width: '100%' }}>
            <div className="search">
                <form style={{background:"white", borderRadius:"8px"}}>
                     <TextField onChange={(e)=>setSearchText(e.target.value)} style={{width:"84.16%", color:"white"}} id="outlined-size-small" label="Search field" type="search" variant="outlined" size="small" />
                 <button onClick={e => fetchSearch(e)} style={{padding:"6.5px 6px", background:"blue", border:"none", cursor:"pointer", borderBottomRightRadius:"6px", borderTopRightRadius:"6px"}}><SearchIcon></SearchIcon></button>
                </form>
                <Genres genres={ props.genres} setGenres={props.setGenres} selectedGenres={props.selectedGenres} setselectedGenres={props.setselectedGenres} type={props.type} />
            </div>
        </div>
    )
}



export default SearchSideBar
