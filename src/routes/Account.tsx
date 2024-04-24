import React, { useContext, useState, useEffect } from "react";
import UserForm from '../components/UserForm.tsx';
import { ArrowBack } from "@mui/icons-material";
import StyledBtn from '../components/StyledBtn.tsx'
import '../styles/account.scss'
import Genres from "../components/Genres.tsx";
import AuthForm from "../components/AuthForm.tsx";
import Divider from '@mui/material/Divider';
import { useNavigate} from "react-router-dom";
import { AuthContext } from "../Context/AuthContext.tsx";
import WatchList from "../components/WatchList.tsx";
import ProgressOverlay from "../components/ProgressOverlay.tsx";
import { AppContext } from "../Context/AppContext.tsx";
import useWatchList from "../myhooks/useWatchList.ts";
import useUpdate from "../myhooks/useUpdate.ts";
import ConfirmationDialog from "../components/dialogs/ConfirmationDialog.tsx";

const Account = ()=>{
    const {watchlist} = useContext(AppContext);
    //username(unique), email(unique), password, age >= 13, picture
    const [username,setUsername] = useState("")
    const [picture,setPicture] = useState("")
    const [email,setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [open,setOpen] = useState(false)
    const [processing,setProcessing] = useState(false)

    const {user} = useContext(AuthContext);

    const navigate = useNavigate();
    const getWatchList = useWatchList();
    const update = useUpdate();
    //Update WatchList
    const [genres, setGenres] = useState([]);
    const [tvGenres, setTvGenres] = useState([]);

    //Confirmation Dialog state
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [field, setField] = useState("");
    const [newVal, setNewVal] = useState("");
    const [promptText, setPromptText] = useState("");
    const [reject, setReject] = useState<React.Dispatch<any>|null>(null);
    const [accept, setAccept] = useState<Function|null>(null);

    //Privacy Settings
    /**Public profile: boolean, automatically publicize collections: boolean, 
    * hide followership: boolean, (hiding your followership status will disable visitors from following you)
    Enable 2FA: checkbox, Allow Movie mania to collect data for better recommendations: checkbox,
    Delete Profile: button*/

    //Download data option for favourite collections

    useEffect(()=>{
        if(!watchlist){
            try {
                getWatchList(setGenres,setTvGenres);
            } catch (error) {
                console.log("Error happened", error);
            }
        }else{
            setGenres(watchlist?.movies || [])
            setTvGenres(watchlist?.television || [])
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[watchlist])

    const updateUsername = ()=>{
        console.log("hello");
        if(username === user.username) return;
        const _update = ()=>{
            console.log("hello yielkd 2")
            setIsDialogOpen(false)
            setProcessing(true);
            update.username(username,setProcessing);
        }
        const setup = ()=>{
            setNewVal(username);
            setField("Username");
            setReject(()=>setUsername);
            setAccept(()=>_update);
            setIsDialogOpen(true);
        }
        
        return setup();
    }

    const updateEmail = ()=>{
        console.log("hey there")
        // const verify = (code)=>{
        //     setIsDialogOpen(false)
        //     setProcessing(true)
        //     setTimeout(()=> setProcessing(false),5000);
                        
        // }
        // const verifySetup = ()=>{
        //     setPromptText("Code");
        //     setAccept(()=>verify);
        //     setIsDialogOpen(true);
        // }
        const _update = (password)=>{
            console.log("new password", password);
            setIsDialogOpen(false)
            setReject(null);
            setProcessing(true)
            update.email(password,email,setProcessing);
        }
        const setup = ()=>{
            setNewVal(email);
            setPromptText("Password");
            setReject(()=>setEmail);
            setAccept(()=>_update);
            setIsDialogOpen(true);
        }

        return setup();
    }

    const updatePassword = ()=>{
        setProcessing(true);
        update.password(password, newPassword, setProcessing);
    }

    return(
        <div className='account-container'>
            <ArrowBack onClick={()=>navigate('/profile')} 
            sx={{width:'2em',height:'2em',padding:'.5em', paddingLeft:0,cursor:'pointer'}} />
            <div className='account-details-container'>
                <h2>Account Settings</h2>
                <UserForm username={username || user.username} setUsername={setUsername} onKeyPress={updateUsername} picture={picture || user.photo} setPicture={setPicture} />
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
                <StyledBtn onClick={()=>setOpen(true)} sx={{margin:'1.5rem 1rem 2rem'}}>Update WatchList</StyledBtn>
                <div className="auth-form-wrapper">
                    <AuthForm e_mail={email || user.email} setEmail={setEmail} onEmailEnter={updateEmail} passwrd={password} setPasswrd={setPassword} passwrdLabel="Old Password:"
                        passwrd2={newPassword} setPasswrd2={setNewPassword} passwrd2Label="New Password:" />
                </div>
                <StyledBtn onClick={updatePassword} sx={{margin:'1rem 1rem .5rem'}}>Update</StyledBtn>
                <Divider sx={{margin:'1rem', width:'80%', height:2, backgroundColor:'aliceblue'}} />
                <StyledBtn onClick={()=>console.log()} sx={{margin:'1rem'}}>Delete Account</StyledBtn>
                <WatchList  open={open} setOpen={setOpen} setProcessing={setProcessing} watchList={watchlist} isUpdate />
                <ProgressOverlay open={processing} authText='Updating...' />
                <ConfirmationDialog open={isDialogOpen} setOpen={setIsDialogOpen} oldVal={'noit'} newVal={newVal} field={field}
                    promptText={promptText} Reject={reject} Accept={accept} />
            </div>
            
        </div>
    )
}

export default Account;