import React, { useContext, useEffect, useState  } from 'react'
import axios from 'axios';
import CardItems from './CardItems.tsx'
import CustomPagination from './Pagination/CustomPagination.tsx';
import { AppContext } from '../Context/AppContext.tsx';

const Movies = ({urlGenres, content, setContent }) => {
    const {collection} = useContext(AppContext);
    const [page, setPage] = useState(1);
    const [numofPages, setNumOfPages] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [favoredMovies, setFavoredMovies] = useState(JSON.parse(sessionStorage.getItem("movies")) || {});
    
    useEffect(()=>{
        const wait = async()=>{
            const favored = await collection;
            console.log('favored', favored);
            setFavoredMovies(favored.movie)
        }
        wait();
    //eslint-disable-next-line react-hooks/exhaustive-deps
    },[collection]);
    useEffect(() => {
        const fetch = async () => {
            try{
                const { data } =
                    await axios(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=${page}&with_genres=${urlGenres}`);
                    console.log("data", data);
                setContent(data.results);
                setNumOfPages(data.total_pages);
                data && setIsLoading(false);
            }catch(error){
                console.log(error.message);
                console.log("ERROR:", error);
                setIsLoading(false)
            }
        }

    fetch()

    },[page,urlGenres,setContent]);
    return (
        <div className="container">
                <CardItems
                    data={content}
                    type="movie"
                    loading={isLoading}
                    faves={favoredMovies}
                />
            <CustomPagination numofPages={numofPages} setPage={setPage }/>
        </div>
    )
}

export default Movies
