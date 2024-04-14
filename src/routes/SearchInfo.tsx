import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import SearchInfoHeader from '../components/SearchInfoHeader.tsx';
import axios from 'axios';

import SearchInfoBody from '../components/SearchInfoBody.tsx';

function SearchInfo() {
    const [searchParams] = useSearchParams();
    const [content, setContent] = useState(null);
    const type = searchParams.get('type');
    const id = searchParams.get('id');

    useEffect(()=>{
      const fetchData = async()=>{
        const { data } = await axios(`https://api.themoviedb.org/3/${type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
        console.log('data:', data)
        setContent(data)
      }
 
      fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
  return (
    <div>
        <SearchInfoHeader poster={content?.poster_path} backdrop={content?.backdrop_path} title={content?.title || content?.name} tagline={content?.tagline} year={(content?.first_air_date || content?.release_date || '....').substring(0, 4)} />
        <SearchInfoBody synopsis={content?.overview} />
    </div>
  )
}

export default SearchInfo