import { get, onValue, query, ref, update } from 'firebase/database'
import { useContext } from 'react'
import { db } from '../config/firebase.ts'
import { AuthContext } from '../Context/AuthContext.tsx'
import { AppContext } from '../Context/AppContext.tsx'

const useCollections = () => {
    const {user} = useContext(AuthContext);
    const path = 'users/' + user?.username + '/collections/';

    const {setCollections} = useContext(AppContext);

    const save = (data, itemType:string , cb:Function, collection = "public")=>{
        update(ref(db,path+collection+"/"+itemType),data)
        .then(()=>{
            console.log('saved...');
            cb();
        })
        .catch(error=>{
            console.log("Error writing collection to database:", error);
            cb(error);
        });
    }
    const unSave = (data, itemType:string , cb:Function, collection = "public")=>{}
    const getAll = ()=>{
        onValue(ref(db,path+'_names'), snapshot =>{
            if(snapshot.exists()){
                setCollections(snapshot.val())
            }
        })
    }
    const getCollection = async (collection="public")=>{
        const result = await get(query(ref(db,path+collection)))
        return result.val();
    }
    const deleteCollection = (collection)=>{}

    return {save, unSave, getAll, getCollection, deleteCollection};
}

export default useCollections