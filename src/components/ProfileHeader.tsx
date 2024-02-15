import React, { useState } from 'react';
import { Avatar } from '@mui/material';
import { Settings as SettingsIcon } from '@mui/icons-material';
import '../styles/profileHeader.scss';
import Genres from './Genres.tsx';
import { useNavigate } from 'react-router-dom';

const ProfileHeader = () => {
  //Avatar,| @username, watchList carousels, | cogwheel for settings
  const [genres] = useState([{name:"comedy", id:1}, {name:"action", id:2}, {name:"horror", id:3}]);
  const [tvGenres] = useState([{name:"comedy", id:1}, {name:"action", id:2}, {name:"horror", id:3}, 
    {name:"documentary",id:4},{name:"documentary",id:5}]);
    const navigate = useNavigate();
  return (
    <div className='profile-header'>
        <Avatar className='avi' alt="avatar" />
        <div className="user-info">
            <div className="username-wrapper">
                <h3>@horror_lover</h3>
                <SettingsIcon className="settings-icon" onClick={()=>navigate('/profile/settings')} />
            </div>
            <div className="carousel"><Genres selectedGenres={genres} selectedColor='secondary' setselectedGenres={()=>{}} setGenres={()=>{}} /> </div>
            <div className="carousel"><Genres selectedGenres={tvGenres} setselectedGenres={()=>{}} setGenres={()=>{}} /></div>
        </div>
    </div>
  )
}

export default ProfileHeader