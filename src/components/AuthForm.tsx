import React from 'react'
import TextInput from './styled/TextInput.tsx'
import { Divider, InputLabel } from '@mui/material'
import '../styles/userForm.scss';

type props={
    e_mail: string,
    passwrd: string,
    passwrdLabel: string
    setEmail: Function,
    setPasswrd: Function,
    passwrd2?: string,
    passwrd2Label?: string,
    setPasswrd2?: Function,
}
const AuthForm = ({e_mail,setEmail,passwrd, passwrdLabel, setPasswrd, passwrd2, passwrd2Label, setPasswrd2}: props) => {

    return (
        <div className='flex-center-column' >
            <div className="formInput-wrapper">
                <InputLabel style={{textAlign:'start', marginLeft:'12%'}}>Email:</InputLabel>
                <TextInput type='email' value={e_mail} onChange={e=>setEmail(e.target.value)} 
                    placeholder='JohnDoe@abc.com' variant='outlined' />
            </div>
            {passwrd2Label === "New Password:" && 
            <Divider sx={{margin:'1rem 1rem 0', width:'90%', height:2, backgroundColor:'aliceblue'}} />}
            {passwrd2Label === "New Password:" && <h3 style={{marginBottom:'1.5rem'}}>Update Password</h3>}
            <div className="formInput-wrapper">
                <InputLabel style={{textAlign:'start', marginLeft:'12%'}}>{passwrdLabel}</InputLabel>
                <TextInput type='password' value={passwrd} onChange={e=>setPasswrd(e.target.value)} 
                    variant='outlined' />
            </div>
            { passwrd2Label && <div className="formInput-wrapper">
                <InputLabel style={{textAlign:'start', marginLeft:'12%'}}>{passwrd2Label}</InputLabel>
                <TextInput type='password' value={passwrd2} onChange={e=>setPasswrd2(e.target.value)} 
                    variant='outlined' />
            </div>}
        </div>
    )
}

export default AuthForm