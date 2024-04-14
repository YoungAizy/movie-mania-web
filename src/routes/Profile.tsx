import React from 'react'
import ProfileHeader from '../components/ProfileHeader.tsx'
import MyTabs from '../components/MyTabs.tsx'
import BottomNav from '../components/BottomNav.tsx'
import FeedTab from '../components/FeedTab.tsx'
import CollectionsTab from '../components/CollectionsTab.tsx'
import '../styles/profile.scss';

export default function Profile() {
    const tabs = [FeedTab,CollectionsTab]

    return (
    <div className='profile-wrapper'>
        <ProfileHeader />
        <MyTabs tabs={tabs} />
        <BottomNav />
    </div>
  )
}
