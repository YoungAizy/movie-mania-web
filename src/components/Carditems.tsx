import React, { useContext } from 'react'
import CardItem from './CardItem.tsx';
import { AppContext } from '../Context/AppContext.tsx';

function Carditems({data, loading, faves, type, is_Search}) {
    const {setSearchContent} = useContext(AppContext);
    const content = {};
    const p = loading ? Array.from(new Array(2)): (data ? data: [null]);
 
    return (
    <>
        {p[0] || loading ? p.map((item,index)=>{
            console.log("Jeep",p[0])
            if(p[0]) content[item.id] = item;
            return (
            <CardItem
                key={item?.id ? item.id: index} id={item?.id ? item.id: index} 
                poster={item?.poster_path} 
                title={item?.title || item?.name}
                summary={item?.overview}
                type={type || ""}
                release_date={item?.release_date}
                rating={item?.vote_average}
                faves={faves}
                isSearch={is_Search}
            />)
            }): (<h2>No Results</h2>)
        }
        {Object.keys(content).length >=1 && setSearchContent(content)}
    </>
  )
}

export default Carditems;