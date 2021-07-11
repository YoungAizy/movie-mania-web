import React, { useEffect } from 'react';
import axios from 'axios';
import Chip from '@material-ui/core/Chip';

const Genres = (props) => {
    const { type, setGenres } = props;
    useEffect(() => {
        const fetchGenres = async () => {
            const {data} = await axios(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
            setGenres(data.genres)
        }

        fetchGenres();
        
    },[type,setGenres])

    const onSelected = (genre) => {
        props.setselectedGenres([...props.selectedGenres, genre]);
        props.setGenres(props.genres.filter(e => e.id !== genre.id));
    }
    const unSelected = (genre) => {
        setGenres([...props.genres, genre]);
        props.setselectedGenres(props.selectedGenres.filter(e => e.id !== genre.id));
    }
    return (
        <div style={{ margin: ".6rem 0" }}>
            {props.selectedGenres && props.selectedGenres.map(item => ( 
                <Chip key={item.id} style={{ margin: ".3rem" }} label={item.name} size='small' clickable color='primary' onDelete={()=>unSelected(item)} />)
            )}
            {props.genres && props.genres.map(item => ( 
                <Chip key={item.id} style={{ margin: ".3rem" }} label={item.name} size='small' clickable onClick={()=>onSelected(item)} />)
            )}
        </div>
    )
}

export default Genres
