import React, { useState , useEffect, useContext } from 'react'
import axios from 'axios';
import CardItems from './CardItems.tsx'
import CustomPagination from './Pagination/CustomPagination.tsx';
import { AppContext } from '../Context/AppContext.tsx';

const TvShows = ({ urlGenres, content, setContent  }) => {
    const [page, setPage] = useState(1);
    const [numofPages, setNumOfPages] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [favoredShows,setFavoredShows] = JSON.parse(sessionStorage.getItem('shows')) || {};
    const {collection} = useContext(AppContext)
    
    useEffect(()=>{
        const wait = async()=>{
            const favored = await collection;
            console.log('favored', favored);
            setFavoredShows(favored.tv)
        }
        wait();
    //eslint-disable-next-line react-hooks/exhaustive-deps
    },[collection]);

    useEffect(() => {
        const fetch = async () => {
            try{
                const { data } =
                    await axios(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${urlGenres}`)
                setContent(data.results);
                setNumOfPages(data.total_pages);
                setIsLoading(false)
            }catch(error){
                console.log(error.message);
                console.log("ERROR:", error);
                setIsLoading(false)
            }
        }
        fetch()
       
    }, [page, urlGenres, setContent])
    return (
        <div className="container">
              <CardItems
                    data={content}
                    type="tv"
                    loading={isLoading}
                    faves={favoredShows}
                />
            
            <CustomPagination numofPages={numofPages} setPage={setPage }/>
        </div>
    )
}

export default TvShows
