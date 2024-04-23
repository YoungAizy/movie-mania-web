import React, { useContext, useEffect, useState } from 'react'
import Genres from './Genres.tsx';
import MyDialog from './styled/MyDialog.tsx';
import StyledBtn from './StyledBtn.tsx';
import { useNavigate } from 'react-router-dom';
import {set, ref} from 'firebase/database';
import {db} from '../config/firebase.ts';
import { AuthContext } from '../Context/AuthContext.tsx';
import useUpdate from '../myhooks/useUpdate.ts';

type propsType ={
  open: boolean;
  setOpen: any;
  setProcessing: any;
  watchList?: {movies?: [], television?: []};
  isUpdate?: boolean;
}

const WatchList = ({open,setOpen,setProcessing, watchList, isUpdate}: propsType) => {
    const [genres, setGenres] = useState([]);
    const [selectedGenres, setselectedGenres] = useState( []);
    const [tvGenres, setTvGenres] = useState([]);
    const [selectedTvGenres, setselectedTvGenres] = useState([]);

    const {user} = useContext(AuthContext);

    const navigate = useNavigate();
    const update = useUpdate()
    useEffect(()=>{
      setselectedGenres(watchList?.movies || []);
      setselectedTvGenres(watchList?.television || []);
    },[watchList])

    const saveWatchList = (e)=>{
      e.preventDefault();
      const userId = user.uid;
      console.log('watchList', userId)
      if(!isUpdate){ 
        console.log('new batch')
        set(ref(db, 'users/' + userId), {
          movies: selectedGenres,
          television: selectedTvGenres,
        }).then(()=> navigate('/profile')).catch(error=> console.log('watchlist error:', error));
      }else{
        console.log('else')
        if(
          (JSON.stringify(selectedGenres) !== JSON.stringify(watchList?.movies)) || 
          (JSON.stringify(selectedTvGenres) !== JSON.stringify(watchList?.television)))
        {
          console.log('oops!')
          update.watchList({movies: selectedGenres, television: selectedTvGenres}, setProcessing);
        }
      }
        
      setOpen(false);
      setProcessing(true);
    }
  return (
    <MyDialog open={open} onClose={()=>setOpen(false)}>
      <h2 style={{textAlign:"center", color:"ghostwhite"}}>Pick Your WatchList</h2>
        <h3 style={{padding:"0 .4rem",marginBottom:8}}>Movies:</h3>
        <Genres type={"movie"} genres={genres} setGenres={setGenres} 
            selectedGenres={selectedGenres} setselectedGenres={setselectedGenres} />
        <h3 style={{padding:"0 .4rem",marginBottom:8}}>Tv Series:</h3>
        <Genres type={"tv"} genres={tvGenres} setGenres={setTvGenres} 
            selectedGenres={selectedTvGenres} setselectedGenres={setselectedTvGenres} />

        <div className='flex-center'>
          <StyledBtn btnType='submit' btnSize='medium' onClick={saveWatchList}>Submit</StyledBtn>
        </div>
    </MyDialog>
  )
}

export default WatchList