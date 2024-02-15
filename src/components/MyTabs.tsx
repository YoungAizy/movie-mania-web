import React, { useState } from 'react'
import { Tab, Tabs } from '@mui/material'
import TabPage from './TabPage.tsx'

type propTypes={
  tabs: (()=>React.JSX.Element)[]
}
const MyTabs = ({tabs}:propTypes) => {
    const [tab,setTab] = useState(0)
  return (
    <>
      <Tabs className="tabs" indicatorColor='primary' value={tab} color="ghostwhite" onChange={(event, newVal) =>{console.log(event); setTab(newVal)}} centered>
          <Tab style={{width:"50%"}} label="Feed" />
          <Tab style={{ width: "50%" }} label="Collections" />
      </Tabs>
      <TabPage tabs={tabs} tabIndex={tab} />
    </>
  )
}

export default MyTabs