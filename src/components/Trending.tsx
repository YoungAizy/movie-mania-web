import React, {useContext, useEffect, useState} from 'react'
import axios from 'axios'
import { img_300, unavailable } from '../config/config.ts'
import '../styles/Card.scss'
import ContentModal from './ContentModal/ContentModal.tsx'
import { AppContext } from '../Context/AppContext.tsx'

export const Trending = () => {
    const {collection} = useContext(AppContext);
    const [content, setContent] = useState([]);
    const [favoredMovies, setFavoredMovies] = useState(JSON.parse(sessionStorage.getItem("movies")) || {});
    
    useEffect(()=>{
        const wait = async()=>{
            const favored = await collection;
            console.log('favored', favored);
            setFavoredMovies(favored.movie)
        }
        wait();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    useEffect(() => {
    const fetch = async() => {
      const { data } =
        await axios(`https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.REACT_APP_API_KEY}`)
        console.log("trending", data.results[0].original_title);
        setContent(data.results);
    }

    fetch()
  }, [])

    return (
        <div>
            <h2 style={{textAlign:'center'}}>TRENDING</h2>
            <div  className="trending-container">
            {content && content.map(item => (
                <Card key={item.id} id={item.id} poster={item.poster_path} title={item.title}
                    summary={item.overview}
                    type={'movie'}
                    release_date={item.release_date || item.first_air_date}
                    rating={item.vote_average}
                    faves={favoredMovies}
                />
            )
            )}</div>
        </div>
    )
}

const Card = (props)=>{

      return (
        <ContentModal contentStyle="card-trending" id={props.id} title={props.title} type={props.type} faves={props.faves}>
              <img src={props.poster ? `${img_300}${props.poster}`: unavailable} alt='' className="poster-trending" />
        </ContentModal>
    )
}
