import React from 'react'
import '../styles/profileTabs.scss'
import FeedCard from './FeedCard.tsx'

const FeedTab = () => {
  return (
    <div className='tab'>
        { Array.from(new Array(5)).map((item,index)=>(
        <FeedCard key={index} />
        ))}
    </div>
  )
}

export default FeedTab;