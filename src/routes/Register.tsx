import React, { useState } from "react";
import UserForm from "../components/UserForm.tsx";
import NavBar from "../components/NavBar.tsx";
import AuthForm from "../components/AuthForm.tsx";
import { InputLabel } from "@mui/material";
import TextInput from "../components/styled/TextInput.tsx";
import StyledBtn from "../components/StyledBtn.tsx";
import WatchList from "../components/WatchList.tsx";

const Register = ()=>{
    //username(unique), email(unique), password, age >= 13, picture
    const [username, setUsername] = useState("")
    const [picture, setPicture]  = useState("")
    const [age, setAge] = useState(13)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [verifyPassword, setVerifyPassword] = useState("")

    const [open,setOpen] = useState(false);

    //WatchList: Genres
    // const [watchList, setWatchList]= useState([])
    //TODO: Switch Trending with WatchList for signed up users
    //TODO: Later on merge WatchList and 'Based on Favourites' in 'Explore' tab
    
    // const addToWatchList = (genre)=>{
    //     setWatchList([...watchList, genre]);
    // }

    const register = e=>{
        e.preventDefault();
        setOpen(true);
    }

    return(
        <>
            <NavBar />
            <form className="flex-center-column" style={{padding:'2rem 0'}}>
                <h2 className="uppercase">Registration</h2>
                <UserForm username={username} setUsername={setUsername} age={age} setAge={setAge}
                picture={picture} setPicture={setPicture} />
                <div style={{width:"80%", marginBottom:16}}>
                    <AuthForm e_mail={email} setEmail={setEmail} passwrd={password} setPasswrd={setPassword} passwrdLabel="Password:"
                        passwrd2={verifyPassword} setPasswrd2={setVerifyPassword} passwrd2Label="Repeat Password:" />
                </div>
                {/* <div className='flex-center-column' style={{width:"80%", marginBottom:16}}>
                    <InputLabel >Repeat Password</InputLabel>
                    <TextInput type="password" value={verifyPassword} onChange={e=>setVerifyPassword(e.target.value)} 
                        variant='outlined'/>
                </div> */}
                <StyledBtn btnType="submit" onClick={register} >Register</StyledBtn>
                <WatchList open={open} setOpen={setOpen}/>
            </form>
        </>
    )
}

export default Register;