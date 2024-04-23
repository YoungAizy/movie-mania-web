import React, { useRef, useEffect} from 'react';
import '../styles/horizontalTimeline.scss'

const HorizontalTimeline = ({ content, credits }) => {
    const ref = useRef(null);
    const scrollPaused = useRef(false);

    const scroll =()=> {
        const id = setInterval(()=>{
            ref.current?.scrollBy(2,0);
            if(ref.current?.clientWidth + ref.current?.scrollLeft >= ref.current?.scrollWidth)
                stop();
        },50);
        return id;
    }
    let scrollerID = useRef(null); 
    const stop = () => clearInterval(scrollerID.current)

    useEffect(()=>{
        if(!scrollPaused.current){
            console.log("Entered if statement")
            stop();
            scrollerID.current = scroll();
        }
        return stop
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[content]);
    const toggleScrollState = ()=>{

        if(!scrollPaused.current){
            console.log("Entered if statement")
            stop();
        }else{
            scrollerID.current = scroll();
        }
        scrollPaused.current = !scrollPaused.current;
    }
   
    return (
        <div ref={ref} onClick={toggleScrollState} className="timeline"  >
            
            {content && content.map((credit,index) => (
                <div key={index} className="wrapper top">
                    <div className="content"><span className="span-dark"><strong>{credit.name || credit.title}({(credit.first_air_date || credit.release_date || '....').substring(0, 4)})</strong></span><hr/><span>{credit.character}</span></div>
                </div>
          ))}
           
        </div>
    )
}

export default HorizontalTimeline;