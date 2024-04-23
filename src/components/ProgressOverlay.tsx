import { Backdrop, LinearProgress, Stack } from '@mui/material';
import React from 'react'

const ProgressOverlay = ({open,authText}) => {
  return (
    <Backdrop
      sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
      onClick={()=>{}}
      >
      <Stack sx={{ width: '65%', color:"lightgray", letterSacing:'1px', textTransform:"uppercase", marginBottom: '14px' }} spacing={4}>
        <h3 style={{textAlign:"center", letterSpacing: '1px'}} >{authText}</h3>
        <LinearProgress />
      </Stack>
    </Backdrop>
  )
}

export default ProgressOverlay;