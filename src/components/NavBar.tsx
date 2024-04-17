import React, {useState, useEffect} from 'react';
import { Container } from '@mui/material';
import StyledBtn from './StyledBtn.tsx';
import SigninModal from "./SigninModal.tsx";
import ProgressOverlay from './ProgressOverlay.tsx';

const NavBar = ({ dialogOpen, setDialogOpen, processing = false, authText = "Signing In...", children}) => {
  const [processingForm, setProcessing] = useState(false);

  useEffect(()=>{
    setProcessing(processing);
  },[processing])
  return (
    <>    
      <Container className="flex" 
        style={{ flexDirection:"row", justifyContent:"space-between", alignItems:"baseline", paddingTop:16}}
        sx={(theme)=>({
          [theme.breakpoints.down("sm")]: {
              paddingLeft: theme.spacing(1),
              paddingRight: theme.spacing(1)
          }
      })}>
          <StyledBtn onClick={()=>{}}> Explore </StyledBtn>
          <StyledBtn onClick={()=>setDialogOpen(true)}> Sign In </StyledBtn>
      </Container>
      {children}
      <ProgressOverlay open={processingForm} authText={authText} />
      <SigninModal isOpen={dialogOpen} setOpen={setDialogOpen} setProcessing={setProcessing}/>
    </>
  )
}

export default NavBar