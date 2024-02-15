import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { img_300, unavailable } from '../config/config.js'
import '../styles/Card.scss'
import ContentModal from './ContentModal/ContentModal.tsx'

export const Trending = () => {
    const [content, setContent] = useState([]);
    const [faves, setFaves] = useState([]);

    useEffect(() => {
    const fetch = async() => {
      const { data } =
        await axios(`https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.REACT_APP_API_KEY}`)
        setContent(data.results);
    }

    fetch()
  }, [])

    return (
        <div>
            <h2 style={{textAlign:'center'}}>TRENDING</h2>
            <div  className="trending-container">
            {content && content.map(item => (
                <Card key={item.id} id={item.id} poster={item.poster_path} title={item.title || item.name}
                    summary={item.overview}
                    type={item.media_type}
                    release_date={item.release_date || item.first_air_date}
                    rating={item.vote_average}
                    faves={faves} setFaves={setFaves}
                />
            )
            )}</div>
        </div>
    )
}

const Card = (props)=>{

      return (
        <ContentModal contentStyle="card-trending" id={props.id} type={props.type} faves={props.faves} setFaves={props.setFaves} >
              <img src={props.poster ? `${img_300}${props.poster}`: unavailable} alt='' className="poster-trending" />
        </ContentModal>
    )
}
