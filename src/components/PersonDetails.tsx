import React from 'react'
import Header from './Header.tsx';
import PersonContent from './PersonContent.tsx';
import { useParams } from 'react-router-dom';

const PersonDetails = () => {
    const { id } = useParams();
    return (
        <>
            <Header isHomePage={false} setTabIndex={undefined} setContent={undefined}/>
            <PersonContent id={id} />
        </>
    )
}




export default PersonDetails
