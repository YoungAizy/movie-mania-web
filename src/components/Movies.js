import React, { useEffect, useState  } from 'react'
import axios from 'axios';
import CardItem from './CardItem'
import CustomPagination from './Pagination/CustomPagination';

const Movies = ({urlGenres, content, setContent }) => {
    const [page, setPage] = useState(1);
    const [numofPages, setNumOfPages] = useState();
    const favMovies = JSON.parse(sessionStorage.getItem("faveMovies")) || {};
    
    useEffect(() => {
        const fetch = async () => {
            const { data } =
                await axios(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${urlGenres}`)
            setContent(data.results);
            setNumOfPages(data.total_pages);
        }

    fetch()

    },[page,urlGenres,setContent]);
    return (
        <div className="container">
            {content && content.map(e => (
                <CardItem
                key={e.id} id={e.id} poster={e.poster_path} title={e.title || e.name}
                    summary={e.overview}
                    type="movie"
                    release_date={e.release_date}
                    rating={e.vote_average}
                    faves={favMovies}
                />)
            )}
            <CustomPagination numofPages={numofPages} setPage={setPage }/>
        </div>
    )
}

export default Movies
