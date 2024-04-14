import axios from 'axios'
const useSearch = () => {
    return async(type, searchText)=>{
        try {
            const { data } = await axios(`https://api.themoviedb.org/3/search/${type}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchText}&page=1&include_adult=false`);
            return data.results;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}
export default useSearch;