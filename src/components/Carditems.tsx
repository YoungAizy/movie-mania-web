import React from 'react'
import CardItem from './CardItem.tsx';
// import { AppContext } from '../Context/AppContext.tsx';

function CardItems({data, loading, faves, type, is_Search=false}) {
    // const {setSearchContent} = useContext(AppContext);
    // const content = {};
    const p = loading ? Array.from(new Array(4)): (data ? data: [null]);
 
    return (
    <>
        {p[0] || loading ? p.map((item,index)=>{
            // if(p[0]) content[item.id] = item;
            return (
            <CardItem
                key={item?.id ? item.id: index} id={item?.id ? item.id: index} 
                poster={item?.poster_path} 
                title={item?.title || item?.name}
                summary={item?.overview}
                type={type || ""}
                release_date={item?.release_date || item?.first_air_date}
                rating={item?.vote_average}
                faves={faves}
                isSearch={is_Search}
            />)
            }): (<h2>No Results</h2>)
        }
        {/* {Object.keys(content).length >=1 && setSearchContent(content)} */}
    </>
  )
}

export default CardItems;