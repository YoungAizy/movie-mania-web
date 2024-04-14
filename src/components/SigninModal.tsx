import React, { useState } from 'react'
import MyDialog from './styled/MyDialog.tsx';
// import {FormControl, InputLabel,} from '@mui/material';
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import StyledBtn from './StyledBtn.tsx';
import AuthForm from './AuthForm.tsx'
import "../styles/signinModal.scss";
import { auth } from '../config/firebase.ts';

const useStyles = {
      paper: {
      width: '100%',
      height: '60%',
      maxHeight: '80%',
      borderRadius: 8, 
      color: 'whitesmoke'
    },
  };

const SigninModal = ({isOpen, setOpen, setProcessing}) => {
  
  const classes = useStyles;
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  
  const regBtnClick = (e)=>{
    e.preventDefault();
    navigate("/register")
  }

  const onLoginClick = async (e)=>{
    e.preventDefault();
    setOpen(false)
    setProcessing(true);
    setTimeout(()=> setProcessing(false),5000);
    // try{
    //   const {user}= await signInWithEmailAndPassword(auth,email,password);
    //   console.log(user);
    // }catch(error){
    //   console.log(error);
    // }
  }

  return (
    <div>
        <MyDialog 
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            sx={theme=>({
              margin: "12px 4px",
              [theme.breakpoints.down('sm')]:{
                '.MuiDialog-paper':{
                  width: '92%'
                }
              }
            })}
            open={isOpen}
            onClose={()=>setOpen(false)}
            closeAfterTransition
            >
            <div style={classes.paper}>
              <h2 style={{textAlign:"center", color:"antiquewhite", marginTop: 8 }}>Sign-In</h2>
              <AuthForm e_mail={email} setEmail={setEmail} 
                passwrd={password} setPasswrd={setPassword} passwrdLabel='Password:' />
              <p style={{
                // marginLeft:32
                marginLeft: 8,
                marginTop: 4
                }}>
                <Link to="/" style={{color:"whitesmoke"}}>forgot Password</Link>
              </p>
              <div className="flex-center">
                <StyledBtn btnSize='large' onClick={onLoginClick}>Login</StyledBtn>
                <p >or</p>
                <StyledBtn btnSize='medium' onClick={regBtnClick}>Register</StyledBtn>
              </div>
            </div>
        </MyDialog>
    </div>
  )
}

export default SigninModal