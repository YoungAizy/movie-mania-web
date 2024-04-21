import React, { useEffect, useState, useContext } from 'react';
import { Avatar } from '@mui/material';
import { Settings as SettingsIcon } from '@mui/icons-material';
import '../styles/profileHeader.scss';
import Genres from './Genres.tsx';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext.tsx';
import { auth} from '../config/firebase.ts';
import { AppContext } from '../Context/AppContext.tsx';
import useWatchList from '../myhooks/useWatchList.ts';

const ProfileHeader = () => {
  //Avatar,| @username, watchList carousels, | cogwheel for settings
  const {loggedIn, user} = useContext(AuthContext);
  const {watchlist} = useContext(AppContext)
  const [username, setUsername] = useState( user.username);
  const [photoUrl, setPhotoUrl] = useState(user.photo);
  const [genres, setGenres] = useState([]);
  const [tvGenres, setTvGenres] = useState([]);
  const navigate = useNavigate();
  const getWatchlist = useWatchList();
    
    console.log('profile user', auth.currentUser);
    useEffect(()=>{
      console.log('auth', auth);
      if(loggedIn && !watchlist){
        getWatchlist(setGenres, setTvGenres);
      }else{
        setGenres(watchlist?.movies || [])
        setTvGenres(watchlist?.television || [])
      }
      setUsername(user.username);
      setPhotoUrl(user.photo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[user])
  return (
    <div className='profile-header'>
        <Avatar className='avi' alt="avatar" src={photoUrl} />
        <div className="user-info">
            <div className="username-wrapper">
                <h3>@{username}</h3>
                <SettingsIcon className="settings-icon" onClick={()=>navigate('/profile/settings')} />
            </div>
            <div className="carousel"><Genres selectedGenres={genres} selectedColor='secondary' setselectedGenres={()=>{}} setGenres={()=>{}} /> </div>
            <div className="carousel"><Genres selectedGenres={tvGenres} setselectedGenres={()=>{}} setGenres={()=>{}} /></div>
        </div>
    </div>
  )
}

export default ProfileHeader