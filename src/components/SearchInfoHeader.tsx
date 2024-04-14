import React from 'react';
import Avatar from '@mui/material/Avatar';
import { img_300, img_500, unavailable, unavailableLandscape } from '../config/config.ts'
import '../styles/searchInfo.scss';

const SearchInfoHeader = ({poster, backdrop, title, tagline, year}) => {
  const bg = backdrop ? `${img_500}${backdrop}` : unavailableLandscape;
  const headerStyle ={
    backgroundImage: `url(${bg})`,
  }
    
  return (
    <header id='search-resultPage-header' style={headerStyle}>
      <Avatar variant='rounded' alt={title+" poster"} src={poster ? `${img_300}${poster}`: unavailable} 
      sx={(theme)=>({
        [theme.breakpoints.down('sm')]:{
          display: 'none'
        }
      })}/>
      <div className="header-title">
        <h2>{title+" "}({year})</h2>
        <span>{tagline}</span>
      </div>
    </header>
  )
}

export default SearchInfoHeader