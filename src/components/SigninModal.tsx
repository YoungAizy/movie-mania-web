import React, { useState } from 'react'
import MyDialog from './styled/MyDialog.tsx';
import {FormControl, InputLabel,} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import StyledBtn from './StyledBtn.tsx';
import AuthForm from './AuthForm.tsx'
import "../styles/signinModal.scss";

const useStyles = {
      paper: {
      width: '100%',
      height: '60%',
      maxHeight: '80%',
      borderRadius: 8, 
      color: 'whitesmoke'
    },
  };

const SigninModal = () => {
  const classes = useStyles;
  const [open, setOpen] = useState(true);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  
  const regBtnClick = (e)=>{
    e.preventDefault();
    navigate("/register")
  }

  return (
    <div>
        <MyDialog 
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            sx={{
              backgroundColor: 'rgba(127, 128, 129, 0.8)',
            }}
            open={open}
            onClose={()=>setOpen(false)}
            closeAfterTransition
            >
            <div style={classes.paper}>
              <h2 style={{textAlign:"center", color:"antiquewhite"}}>Sign-In</h2>
              <AuthForm e_mail={email} setEmail={setEmail} 
                passwrd={password} setPasswrd={setPassword} passwrdLabel='Password:' />
              <p style={{marginLeft:32}}>
                <Link to="/" style={{color:"whitesmoke"}}>forgot Password</Link>
              </p>
              <div className="flex-center">
                <StyledBtn btnSize='large' onClick={()=>{}}>Login</StyledBtn>
                <p >or</p>
                <StyledBtn btnSize='medium' onClick={regBtnClick}>Register</StyledBtn>
              </div>
            </div>
        </MyDialog>
    </div>
  )
}

export default SigninModal