import React from 'react'
import { Container } from '@mui/material'
import StyledBtn from './StyledBtn.tsx'

const NavBar = () => {
  return (
    <Container className="flex" style={{ flexDirection:"row", justifyContent:"space-between", alignItems:"baseline", paddingTop:16}}>
        <StyledBtn onClick={()=>{}}> Explore </StyledBtn>
        <StyledBtn onClick={()=>{}}> Sign In </StyledBtn>
    </Container>
  )
}

export default NavBar