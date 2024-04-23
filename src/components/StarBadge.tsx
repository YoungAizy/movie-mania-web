import { IconButton } from '@mui/material'
import React from 'react';
import StarIcon from '@mui/icons-material/Star'

const StarBadge = ({saveFave, faves, id}) => {
  return (
    <IconButton onClick={e => saveFave(e)} style={{ backgroundColor: '#8b8b8be3' }} size="medium">
        <StarIcon style={{ color: `${faves?.hasOwnProperty(id) ? "gold":'black'}`}}/>
    </IconButton>
  )
}

export default StarBadge