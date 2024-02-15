import React from 'react'
import Movies from './Movies.tsx'
import TvShows from './TvShows.tsx'

const Content = ({ tabIndex, urlGenres, content, setContent }) => {
    if (tabIndex === 0) {
        return (
            <div className="shows-content">
                <Movies urlGenres={urlGenres} content={ content} setContent={setContent}  />
            </div>
        )
    }

    return (
        <div className="shows-content"><TvShows urlGenres={urlGenres} content={ content} setContent={setContent} /></div>
    )
}

export default Content
