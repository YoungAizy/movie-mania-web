import {useContext} from 'react';
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../config/firebase.ts"
import { AuthContext } from "../Context/AuthContext.tsx"

export const isLoggedIn = ()=>{
    const loggedIn = JSON.parse(localStorage.getItem('auth'))?.loggedIn;
    return loggedIn;
}


const useAuth = () => {
    const {setUser, setLoggedIn} = useContext(AuthContext);
    const register = (email: string, password: string)=>{
        try {
            
        } catch (error) {
            
        }
    }
    const login = async(email: string, password: string)=>{
        const {user}= await signInWithEmailAndPassword(auth,email,password);
        localStorage.setItem('auth',JSON.stringify(user));
        const userObj ={
            username: user.displayName,
            userId: user.uid,
            picture: user.photoURL,
            email: user.email,
            verified: user.emailVerified,
            loggedIn: true
        }
        localStorage.setItem('user', JSON.stringify(userObj));
        setUser(userObj);
        setLoggedIn(userObj.loggedIn);
        return user;
    }
    return {register, login};
}

export default useAuth;