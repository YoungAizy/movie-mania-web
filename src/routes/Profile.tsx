import React, { useContext, useEffect } from 'react'
import ProfileHeader from '../components/ProfileHeader.tsx'
import MyTabs from '../components/MyTabs.tsx'
import BottomNav from '../components/BottomNav.tsx'
import FeedTab from '../components/FeedTab.tsx'
import CollectionsTab from '../components/CollectionsTab.tsx'
import '../styles/profile.scss';
import { AuthContext } from '../Context/AuthContext.tsx'
import useAuth from '../myhooks/useAuth.ts'

export default function Profile() {
    const tabs = [FeedTab,CollectionsTab]
    const auth = useAuth()
    const {temp, setTemp, loggedIn} = useContext(AuthContext);

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
        <BottomNav />
    </div>
  )
}
