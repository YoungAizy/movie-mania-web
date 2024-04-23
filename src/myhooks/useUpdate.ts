import { ref, update as Update } from "firebase/database";
import { auth, db } from "../config/firebase.ts";
import { Dispatch, useContext } from "react";
import { AppContext } from "../Context/AppContext.tsx";
import { AuthContext } from "../Context/AuthContext.tsx";
import { signInWithEmailAndPassword, updatePassword, updateProfile, verifyBeforeUpdateEmail } from "firebase/auth";


const useUpdate = ()=>{
    const {user,setUser} = useContext(AuthContext)
    const {setWatchlist} = useContext(AppContext)

    const watchList = (watchlist, setProcessing)=>{
    
        const update = ()=>{
            const newWatchList = {['users/' + user.userId + '/watchlist']: watchlist}
            console.log('*****', newWatchList);
            Update(ref(db),newWatchList).then(()=>{setProcessing(false);setWatchlist(watchlist)})
            .catch(error=> console.log("ERROR UPDATING DB:", error));
        }
        update();
    }
    const password = (password: string, newPassword:string, setProcessing: Dispatch<any>)=>{
        const update = ()=>{
            signInWithEmailAndPassword(auth,user.email,password)
            .then((userCred)=>{
                updatePassword(userCred.user,newPassword)
                .then(()=>{
                    setProcessing(false);
                    alert('Update Successful');
                })
                .catch(error=>{
                    console.log('Couldn\'t Update Password:', error);
                    setProcessing(false);
                });
            }).catch(error=>{
                console.log("An Error Occured:", error);
                setProcessing(false);
                alert('There was an error authenticating your credentials: '+ error.message);
            })
        }
        update();
    }
    const email = (password,newEmail, setProcessing)=>{
        const update = ()=>{
            signInWithEmailAndPassword(auth, user.email,password)
            .then((userCred)=>{
                verifyBeforeUpdateEmail(userCred.user,newEmail)
                .then(()=>{
                    const userObj = {...user, email: newEmail};
                    localStorage.setItem('user', JSON.stringify(userObj));
                    setUser(userObj)
                    setProcessing(false);
                    alert('Update Successful. Check your email');
                    // next();
                })
                .catch(error=>{
                    console.log('Couldn\'t Update Email:', error);
                    alert('Couldn\'t Update Email: '+ error.message);
                    setProcessing(false);
                });

            })
            .catch(error=>{
                console.log("An Error Occured:", error);
                alert('There was an error authenticating your credentials: '+ error.message);
                setProcessing(false);
            });
        }
        // const verifyEmail = (code,setProcessing)=>{

        // }
        update();
    }

    const username = (newUsername,setProcessing)=>{
        const user = JSON.parse(localStorage.getItem('auth'));
        const update = ()=>{
            updateProfile(user, {displayName: newUsername})
            .then(()=> {
                const userObj = {...user, username: newUsername};
                localStorage.setItem('user', JSON.stringify(userObj));
                setUser(userObj)
                setProcessing(false); 
                alert('Update Successful')})
        }

        return update();
    }

    return {email,password, watchList, username};

}

export default useUpdate;