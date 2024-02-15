import React from 'react'
import Header from './Header.tsx';
import PersonContent from './PersonContent.tsx';
import { useParams } from 'react-router-dom';

const PersonDetails = () => {
    const { id } = useParams();
    return (
        <div>
            <Header isHomePage={ false}/>
            <PersonContent id={id} />
        </div>
    )
}




export default PersonDetails
