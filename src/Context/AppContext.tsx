import React, {useState, createContext, useReducer} from 'react'
import useCollections from '../myhooks/useCollections.ts';

type watchlistType ={
    movies: []; 
    television: []
}
export interface ContextType {
    watchlist: watchlistType | null; 
    setWatchlist: React.Dispatch<React.SetStateAction<watchlistType | null>>;
    collection: any|null;
    setCollection: React.Dispatch<any | null>;
    collections: {}|null;
    setCollections: React.Dispatch<React.SetStateAction<{} | null>>;
}

export const AppContext = createContext<ContextType | {}>({});
const initialCollectionState = {
    people: JSON.parse(sessionStorage.getItem("favePeople")),
    tv: JSON.parse(sessionStorage.getItem("faveTv")),
    movies: JSON.parse(sessionStorage.getItem("faveMovies")),
}
const collectionReducer = (state, action)=>{
    switch(action.type){
        case "save":
            const copiedState = state[action.collectionField];
            copiedState[action.id] = action.data
            return{
                ...state, [action.collectionField]: copiedState
            };
        case "unsave":
            const copiedStateField = state[action.collectionField];
            delete copiedStateField[action.id]
            return{
                ...state, [action.collectionField]: copiedStateField 
            };;
        default:
            return state;
        }
    }
export const AppContextProvider = ({children})=>{
    // const [searchContent, setSearchContent] = useState(null)
    // const [selected, setSelected] = useState(null);
    const [watchlist, setWatchlist] = useState<watchlistType | null>(null);
    const [collections, setCollections] = useState<{}|null>(null);
    const publicCollection = useCollections();
    const collectionInit = async(state)=>{
        console.log("hello kitty!")
       if(!sessionStorage.getItem("faveMovies") && !sessionStorage.getItem("faveTv") && !sessionStorage.getItem("favePeople")){
            console.log("something collection")
            const result = await publicCollection.getCollection();
            console.log('App Context', result);
            return{
                people: result?.people || {},
                tv: result?.shows || {},
                movie: result?.movies || {} 
            }
       }else
        return state;
    }
    const [collection, setCollection] = useReducer(collectionReducer,initialCollectionState,collectionInit);
        
        return(
        <AppContext.Provider 
            value={{watchlist, setWatchlist, collection, setCollection, collections, setCollections
            }}>
            {children}
        </AppContext.Provider>
    )
}