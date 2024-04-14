import React from 'react';
import { Avatar, InputLabel } from '@mui/material';
import TextInput from './styled/TextInput.tsx';
import '../styles/userForm.scss';
import '../styles/account.scss';

type props ={
  username: string,
  setUsername: Function,
  picture: any,
  setPicture: Function,
  age?: number,
  setAge?: Function
}

const UserForm = ({username,setUsername, picture, setPicture, age, setAge}:props) => {
    const choosePicture = file=>{
      console.log('file:', file.type)
      const metadata = {
        contentType: 'image/jpeg',
      };
      const reader = new FileReader();
      reader.onload = e =>{
        console.log(e?.target);
        setPicture(e?.target.result)
      }
      reader.readAsDataURL(file);
    }
  return (
    <div className='flex-center-column auth-form-wrapper'>
      <label htmlFor="avi" style={{cursor:"pointer"}}>
        <input type="file"  id="avi" accept='image/*' hidden onChange={e=>choosePicture(e?.target.files[0])} />
        <Avatar
          src={picture}
          alt='avatar'
          style={{width:160, height:160}}
          />
      </label>
      <div style={{width:'100%', textAlign:'center'}}>
        <InputLabel htmlFor='username' sx={theme=>({
          textAlign:'start', 
          marginLeft:'3.3rem',
          [theme.breakpoints.down("sm")]:{
            marginLeft:'1rem'
          }
          })}>Username:</InputLabel>
        <TextInput id="username" type='text' value = {username}
          onChange={e=>setUsername(e.target.value)}
          variant="outlined" />

      </div>
      {age && 
      <>
        <label htmlFor="age">Age:</label>
        <TextInput id="age" type='number' value = {age}
          onChange={e=>setAge(e.target.value)}
          variant="outlined" />
      </>}
    </div>
  )
}

export default UserForm