import React from 'react';
import {Select, MenuItem} from '@mui/material';
import TvIcon from '@mui/icons-material/Tv';
import MovieIcon from '@mui/icons-material/Movie';
import PersonIcon from '@mui/icons-material/Person';

const TypeSelect = ({type,setType}) => {
  return (
    <Select
        labelId="type-select-label"
        id="type-select-outlined"
        value={type}
        onChange={e => setType(e.target.value)}
        label="Type"
        sx={{
            color: 'white',
            lineHeight: '1em',
            '.MuiSelect-select':{
                padding: '6px 16px',
                paddingRight: '16px !important',
                minHeight: '1em'
            },
            '.MuiSelect-icon':{
                display: 'none'
            },
            '.MuiOutlinedInput-notchedOutline':{
                border: 'none'
            }
        }}
    >
        <MenuItem selected value={'movie'}><MovieIcon/></MenuItem>
        <MenuItem value={"tv"}><TvIcon/> </MenuItem>
        <MenuItem value={"people"}><PersonIcon/> </MenuItem>
    </Select>
  )
}

export default TypeSelect