import React, { useState } from 'react'
import Genres from './Genres.tsx';
import MyDialog from './styled/MyDialog.tsx';
import StyledBtn from './StyledBtn.tsx';
import { useNavigate } from 'react-router-dom';

const WatchList = ({open,setOpen,setProcessing}) => {
    const [genres, setGenres] = useState([]);
    const [selectedGenres, setselectedGenres] = useState([]);
    const [tvGenres, setTvGenres] = useState([]);
    const [selectedTvGenres, setselectedTvGenres] = useState([]);

    const navigate = useNavigate();
    const saveWatchList = e=>{
      e.preventDefault();
      setOpen(false);
      setProcessing(true);
      // navigate('/profile');
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