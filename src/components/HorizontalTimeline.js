import React from 'react';
import './HorizontalTimeline.css'

const HorizontalTimeline = ({ content, credits }) => {
   
    return (
        <div id='tl' className="timeline"  >
            
            {content && content.map((credit,index) => (
                index%2===0 ? (<div key={index} className="wrapper top">
                    <div className="content"><span className="span-dark"><strong>{credit.name || credit.title}({(credit.first_air_date || credit.release_date || '....').substring(0, 4)})</strong></span><hr/><span>{credit.character}</span></div>
                </div>) : (<div key={index} className="wrapper down">
                       <div className="content"><span className="span-dark"><strong>{credit.name || credit.title}({(credit.first_air_date || credit.release_date || '....').substring(0, 4)})</strong></span><hr/><span>{credit.character}</span></div>
                    </div>)
          ))}
           
        </div>
    )
}

export default HorizontalTimeline
