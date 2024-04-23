import React, { useEffect, useState, useContext } from "react";
import UserForm from "../components/UserForm.tsx";
import NavBar from "../components/NavBar.tsx";
import AuthForm from "../components/AuthForm.tsx";
import StyledBtn from "../components/StyledBtn.tsx";
import WatchList from "../components/WatchList.tsx";
import "../styles/register.scss"
import { AuthContext } from "../Context/AuthContext.tsx";

const Register = ()=>{
    const [dialogOpen,setDialogOpen] = useState(false);
    const [processing,setProcessing] = useState(false);
    //username(unique), email(unique), password, age >= 13, picture
    const [username, setUsername] = useState("")
    const [picture, setPicture]  = useState(null)
    const [metadata, setMetaData] = useState(null)
    const [age, setAge] = useState(13)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [verifyPassword, setVerifyPassword] = useState("")

    const [open,setOpen] = useState(false);

    const {user, setUser, setTemp} = useContext(AuthContext);

    const [worker, setWorker] = useState<any>(null);

    //WatchList: Genres
    // const [watchList, setWatchList]= useState([])
    //TODO: Switch Trending with WatchList for signed up users
    //TODO: Later on merge WatchList and 'Based on Favourites' in 'Explore' tab
    
    // const addToWatchList = (genre)=>{
    //     setWatchList([...watchList, genre]);
    // }

    useEffect(()=>{
        const w = new Worker(new URL('../workers/signup.worker.ts', import.meta.url));
        setWorker(w);
        // setUser( new Promise(()=>{}));
        // worker.current.onmessage=({data})=>{
        //     switch (data.type) {
        //         case 'registered':
        //             user.current = Promise.resolve(data.data);
        //             break;
        //         case 'failure':
        //             console.log(data.data);
        //             alert(data.data);
        //             break;
        //         case 'close':
        //             break;
        //         default:
        //             break;
        //     }
        // }
    },[]);
    useEffect(()=>{
        console.log('useEffect');
        if(worker){
            worker.onmessage = ({data})=>{
                console.log('onmessage', data);
                if(data.type === 'registered') {
                    setUser(data.data);
                    setProcessing(false);
                    setOpen(true);
                }
                console.log('User', user);
            }}
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[worker]);
    useEffect(()=>{
        console.log('User changed', user);
    },[user])

    const register = e=>{
        e.preventDefault();
        if(password !== verifyPassword) {
            alert("Passwords must match!");
            return;
        }
        setTemp({email,password});
        console.log('hello');
        worker.postMessage({username, password,email,picture, metadata})
        setProcessing(true);
    }

    return(
        <>
            <NavBar dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} processing={processing} authText="Registering..." >
                <form className="flex-center-column" style={{padding:'0rem 0 1.2rem'}}>
                    <h2 className="uppercase">Registration</h2>
                    <UserForm username={username} setUsername={setUsername} age={age} setAge={setAge}
                    picture={picture} setPicture={setPicture} setMetadata={setMetaData}/>
                    <div className='reg-auth-form'>
                        <AuthForm e_mail={email} setEmail={setEmail} passwrd={password} setPasswrd={setPassword} passwrdLabel="Password:"
                            passwrd2={verifyPassword} setPasswrd2={setVerifyPassword} passwrd2Label="Repeat Password:" />
                    </div>
                    <StyledBtn btnType="submit" onClick={register} >Register</StyledBtn>
                    <WatchList open={open} setOpen={setOpen} setProcessing={setProcessing}/>
                </form>
            </NavBar>
        </>
    )
}

export default Register;