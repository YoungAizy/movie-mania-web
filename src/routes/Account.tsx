import React, { useState } from "react";
import UserForm from '../components/UserForm.tsx';
import { ArrowBack } from "@mui/icons-material";
import StyledBtn from '../components/StyledBtn.tsx'
import '../styles/account.scss'
import Genres from "../components/Genres.tsx";
import AuthForm from "../components/AuthForm.tsx";
import Divider from '@mui/material/Divider';
import { useNavigate, Link } from "react-router-dom";

const Account = ()=>{
    //username(unique), email(unique), password, age >= 13, picture
    const [username,setUsername] = useState("")
    const [picture,setPicture] = useState("")
    const [email,setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")

    const navigate = useNavigate();
    //Update WatchList
    const [genres] = useState([{name:"comedy", id:1}, {name:"action", id:2}, {name:"horror", id:3}]);
    const [tvGenres] = useState([{name:"comedy", id:1}, {name:"action", id:2}, {name:"horror", id:3}, 
        {name:"thriller",id:4},{name:"documentary",id:5}]);

    //Privacy Settings
    /**Public profile: boolean, automatically publicize collections: boolean, 
    * hide followership: boolean, (hiding your followership status will disable visitors from following you)
    Enable 2FA: checkbox, Allow Movie mania to collect data for better recommendations: checkbox,
    Delete Profile: button*/

    //Download data option for favourite collections

    return(
        <div className='account-container'>
            <ArrowBack onClick={()=>navigate('/profile')} 
            sx={{width:'2em',height:'2em',padding:'.5em', paddingLeft:0,cursor:'pointer'}} />
            <div className='account-details-container'>
                <h2>Account Settings</h2>
                <UserForm username={username} setUsername={setUsername} picture={picture} setPicture={setPicture} />
                {/* <h3>WatchList</h3> */}
                <div className="watchlist">
                    <div className="watchlist-wrapper">
                        <h3>Film:</h3>
                        <Genres selectedGenres={genres} selectedColor='secondary' setselectedGenres={()=>{}} setGenres={()=>{}} />
                    </div>
                    <div className="watchlist-wrapper">
                        <h3>Television:</h3>
                        <Genres selectedGenres={tvGenres} setselectedGenres={()=>{}} setGenres={()=>{}} />
                    </div>
                </div>
                <StyledBtn onClick={()=>console.log()} sx={{margin:'1.5rem 1rem 2rem'}}>Update WatchList</StyledBtn>
                <div className="auth-form-wrapper">
                    <AuthForm e_mail={email} setEmail={setEmail} passwrd={password} setPasswrd={setPassword} passwrdLabel="Old Password:"
                        passwrd2={newPassword} setPasswrd2={setNewPassword} passwrd2Label="New Password:" />
                </div>
                <StyledBtn onClick={()=>console.log()} sx={{margin:'1rem 1rem .5rem'}}>Update</StyledBtn>
                <Divider sx={{margin:'1rem', width:'80%', height:2, backgroundColor:'aliceblue'}} />
                <StyledBtn onClick={()=>console.log()} sx={{margin:'1rem'}}>Delete Account</StyledBtn>
            </div>
            
        </div>
    )
}

export default Account;