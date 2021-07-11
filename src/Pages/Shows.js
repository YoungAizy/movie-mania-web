import React, { useState } from 'react'
import SearchSideBar from '../components/SearchSideBar'
import ShowsHeader from '../components/ShowsHeader'
import Content from '../components/Content'
import '../components/Shows.css'
import useGenres from '../myhooks/useGenre';

export default function Shows() {
    const [tabIndex, setTabIndex] = useState(0);
     const [genres, setGenres] = useState([]);
    const [selectedGenres, setselectedGenres] = useState([]);
    const urlGenres = useGenres(selectedGenres);
    const [content, setContent] = useState([]);
    

    const changeTab = (idx) => {
        setTabIndex(idx)
    }
    return (
        <div className="listed-shows">
            <ShowsHeader setTabIndex={changeTab} setContent={setContent}/>
            <SearchSideBar  genres={ genres} setGenres={setGenres} selectedGenres={selectedGenres} setselectedGenres={setselectedGenres} type={tabIndex===0 ? `movie`:`tv`} content={ content} setContent={setContent} />
            <Content tabIndex={tabIndex} urlGenres={urlGenres} content={ content} setContent={setContent} />
        </div>
    )
}
