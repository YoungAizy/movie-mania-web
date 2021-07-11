import React from 'react'
import Header from './Header';
import PersonContent from './PersonContent';
import { useParams } from 'react-router';
import "./PersonDetails.css"

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
