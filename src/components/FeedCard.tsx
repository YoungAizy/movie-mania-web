import React from 'react'
import TestPic from '../assets/pic2.jpg'
import '../styles/feedCard.scss'

const FeedCard = () => {
  return (
    <div className='feed-card'>
        <div className="thumbnail">
            <img src={TestPic} alt="feed card thumbnail" />
        </div>
        <div className="feed-card-body">
            <h3 className="feed-card-title">Kill Bosoon</h3>
            <span className="release-date">(2004-08-27)</span>
            <p className="feed-card-text">Ipsum Loreum dolor</p>
            <div className="stream-links">Netflix, Hulu, Prime</div>
        </div>
    </div>
  )
}

export default FeedCard