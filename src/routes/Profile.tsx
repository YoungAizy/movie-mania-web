import React, { useContext, useEffect, useState } from 'react'
import ProfileHeader from '../components/ProfileHeader.tsx'
import MyTabs from '../components/MyTabs.tsx'
import FeedTab from '../components/FeedTab.tsx'
import CollectionsTab from '../components/CollectionsTab.tsx'
import '../styles/profile.scss';
import { AuthContext } from '../Context/AuthContext.tsx'
import useAuth from '../myhooks/useAuth.ts'
import NavigationDrawer from '../components/NavigationDrawer.tsx'
import { Fab } from '@mui/material'
import { ChevronRight } from '@mui/icons-material'

export default function Profile() {
    const tabs = [FeedTab,CollectionsTab]
    const auth = useAuth()
    const {temp, setTemp, loggedIn} = useContext(AuthContext);
    const [openNavigation,setOpenNavigation] = useState(false);

    useEffect(()=>{
      if(!loggedIn && temp?.email){
        console.log("logging in...")
        async function login(){
          try{
            await auth.login(temp.email, temp.password)
            setTemp(null)
          }catch(error){
            console.log(error);
            alert('An Error occured, couldn\'t sign you in');
          }
        }
        login();
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
    <div className='profile-wrapper'>
        <ProfileHeader />
        <MyTabs tabs={tabs} />
        <Fab color='primary' size="small" onClick={()=>setOpenNavigation(true)} sx={{
          position: 'fixed',
          bottom: '30px',
          borderRadius: '0 8px 8px 0'
        }} > <ChevronRight /> </Fab>
        <NavigationDrawer openNavigation={openNavigation} setOpenNavigation={setOpenNavigation} />
    </div>
  )
}
