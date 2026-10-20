import { onValue, ref } from "firebase/database";
import { db } from "../config/firebase.ts";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext.tsx";
import { AppContext } from "../Context/AppContext.tsx";


const useWatchList = () => {
    const {user} = useContext(AuthContext);
    const {setWatchlist} = useContext(AppContext);
    const userId = user.userId || user.uid;
    const getWatchList = (setGenres, setTvGenres): void=>{
        onValue(ref(db, 'users/' + userId ), (snapshot) =>{
            if(snapshot.exists()) {
              setGenres(snapshot.val().movies);
              setTvGenres(snapshot.val().television);
              setWatchlist(snapshot.val());
            }
          });
    }
    return getWatchList;
}

export default useWatchList