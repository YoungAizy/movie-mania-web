import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import SigninModal from "../components/SigninModal.tsx";
import NavBar from "../components/NavBar.tsx";

const WelcomePage = () => {
    const [dialogOpen,setDialogOpen] = useState(false);

  return (
    <>
    {/* <NavBar signInClick={()=>setDialogOpen(true)} exploreClick={()=>{}} /> */}
    <Outlet />
    <SigninModal isOpen={dialogOpen} setOpen={setDialogOpen} />
    </>
  )
}

export default WelcomePage;