import React from 'react'

type propTypes={
  tabs: (()=>React.JSX.Element)[],
  tabIndex: number
}
const TabPage = ({tabs, tabIndex}:propTypes) => {
    const Tab = tabs[tabIndex];
  return (
    <Tab/>
  )
}

export default TabPage