import React, {useState, useEffect} from 'react'
import HorizontalTimeline from './HorizontalTimeline.tsx';
import axios from 'axios'
import { img_500, unavailable } from '../config/config';

const PersonContent = ({ id }) => {
    const [content, setContent] = useState([]);
    const [credits, setCredits] = useState([]);
    const [filtered, setFiltered] = useState([])
 
    const fetchPerson = async () => {
        const { data } = await axios(`https://api.themoviedb.org/3/person/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
        setContent(data)
    }
    const fetchCredits = async () => {
        const  {data } = await axios(`https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
        setCredits(data)
        setFiltered(data["cast"])
    }

    useEffect(() => {
        fetchPerson();
        fetchCredits();
        // eslint-disable-next-line 
    },[])
    return (
        <div >
            <HorizontalTimeline content={filtered} credits={ credits}/>
            <div className='content-wrapper' >
                <div className='personal-details'><img src={content.profile_path ? `${img_500}${content.profile_path}`: unavailable} alt='' />
                    <span className='details'><strong>Name: </strong>{content.name} </span>
                    <span className='details'><strong>Birth Date: </strong>{content.birthday}</span>
                    <span className='details'><strong>Sex: </strong> {content.gender === 1 ? "Female" : "Male"}</span>
                    <span className='details'><strong>Department: </strong>{content.known_for_department} </span>
                    <span className='details'><strong>Place of Birth: </strong>{content.place_of_birth} </span>
                </div>
                <div className='biography' ><div><h4>Biography</h4> <p className='bio'>{ content.biography}</p></div></div>
            </div>
        </div>
    )
}

export default PersonContent
