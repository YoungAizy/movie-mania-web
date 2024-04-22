import { Drawer } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import TextInput from './styled/TextInput.tsx'
import StyledBtn from './StyledBtn.tsx'
import '../styles/navigationDrawer.scss'

const NavigationDrawer = ({openNavigation,setOpenNavigation}) => {

  const logout = ()=>{}
  
  return (
    <Drawer className="sidenav" anchor='left' open={openNavigation} onClose={()=>setOpenNavigation(false)} sx={{
      '.MuiDrawer-paper':{
        backgroundColor: "rgb(20, 20, 34)",
        overflowX: "hidden",
        padding: "60px 12px 16px",
        width: '250px'
      }
    }}>
        <button className="closebtn" onClick={()=>setOpenNavigation(false)}>&times;</button>
        <div style={{display:"flex", justifyContent:"center", margin:'2vh 0'}}>
          <TextInput value={""} sx={{
            '.MuiOutlinedInput-input':{
              padding: '8.5px 14px'
            }
          }} />
        </div>
        <Link to="/home">Movies &amp; Series</Link>
        <Link to="/people">People</Link>
        <Link to="/favourites">Collections</Link>
        <Link to="profile">Profile</Link>
        <StyledBtn sx={{marginBlock: "auto"}} btnColor='error' onClick={logout}>Logout</StyledBtn>
    </Drawer>
  )
}

export default NavigationDrawer;