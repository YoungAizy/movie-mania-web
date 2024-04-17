import React, {useState, createContext, useEffect} from 'react';
import { User } from 'firebase/auth';

interface tempType {
    email: string,
    password: string
}

export interface authContextType {
    user: userType | User | undefined; 
    setUser: React.Dispatch<React.SetStateAction<userType | User | undefined>>;
    temp: tempType | null;
    setTemp: React.Dispatch<React.SetStateAction<tempType | null>>;
    loggedIn: boolean;
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

interface userType{
    username: string;
    photo: string;
    loggedIn: boolean;
}
export const AuthContext = createContext<authContextType | string | null>(null);

export const AuthContextProvider = ({children})=>{
    const savedUser = JSON.parse(localStorage.getItem('user'))
    const [user, setUser] = useState<userType | User | undefined >();
    const [temp, setTemp] = useState<tempType | null>(null);
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    
    useEffect(()=>{
        setUser(savedUser);
        setLoggedIn(savedUser.loggedIn);
    },[savedUser]);

    return(
        <AuthContext.Provider value={{user,setUser, temp, setTemp, loggedIn, setLoggedIn}}>
            {children}
        </AuthContext.Provider>
    )
}