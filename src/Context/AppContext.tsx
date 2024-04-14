import React, {useState, createContext} from 'react'

export const AppContext = createContext();
export const ContextProvider = ({children})=>{
    const [movies, setMovies] = useState({});
    const [tv, setTv] = useState({});
    const [people, setPeople] = useState({});
    const [searchContent, setSearchContent] = useState(null)
    const [selected, setSelected] = useState(null);

    return(
        <AppContext.Provider 
        value={{movies, setMovies, 
            tv, setTv, 
            people, setPeople, 
            selected, setSelected, 
            searchContent, setSearchContent}}>
            
            {children}
        </AppContext.Provider>
    )
}