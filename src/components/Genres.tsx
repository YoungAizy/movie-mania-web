import React, { useEffect } from 'react';
import axios from 'axios';
import Chip from '@mui/material/Chip';

type propTypes={
    type?: string,
    genres?: {}[],
    setGenres: Function ,
    selectedGenres: {}[],
    setselectedGenres: Function,
    selectedColor?: any
}

const Genres = ({ type, genres, setGenres, selectedGenres, setselectedGenres, selectedColor='primary' }:propTypes) => {
    
    useEffect(() => {
        const fetchGenres = async () => {
            const {data} = await axios(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
            setGenres(data.genres.filter(item => !selectedGenres.some(({id}) => id ===item.id)))
        }

        if(type) fetchGenres();
        
    },[type,setGenres])

    const onSelected = (genre) => {
        setselectedGenres([...selectedGenres, genre]);
        setGenres(genres.filter(e => e.id !== genre.id));
    }
    const unSelected = (genre) => {
        setGenres([...genres, genre]);
        setselectedGenres(selectedGenres.filter(e => e.id !== genre.id));
    }
    return (
        <div style={{ margin: ".6rem 0" }}>
            {selectedGenres && selectedGenres.map(item => ( 
                <Chip key={item.id} sx={{ margin: ".3rem" }} label={item.name} size='small' clickable color={selectedColor} onDelete={()=>type && unSelected(item)} />)
            )}
            {genres && genres.map(item => ( 
                <Chip key={item.id} sx={{ margin: ".3rem", color: 'white' }} label={item.name} size='small' clickable onClick={()=>onSelected(item)} />)
            )}
        </div>
    )
}

export default Genres
