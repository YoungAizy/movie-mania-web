import React, { useState } from 'react'
import SearchSideBar from '../components/SearchSideBar.tsx'
import ShowsHeader from '../components/ShowsHeader.tsx'
import Content from '../components/Content.tsx'
import '../styles/Shows.scss'
import useGenres from '../myhooks/useGenre.ts';

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
