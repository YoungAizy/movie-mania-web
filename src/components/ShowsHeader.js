import React from 'react'
import Header from './Header'
import { Trending } from './Trending'

const ShowsHeader = ({setTabIndex, setContent}) => {
    return (
        <div className="shows-header">
            <Trending />
            <Header setTabIndex={setTabIndex} isHomePage={ true} setContent={setContent}/>
        </div>
    )
}

export default ShowsHeader
