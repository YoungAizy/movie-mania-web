import React from 'react';
import {FormControl, InputAdornment,TextField,Select, MenuItem} from '@mui/material';
import {styled} from '@mui/material/styles';
import TvIcon from '@mui/icons-material/Tv';
import MovieIcon from '@mui/icons-material/Movie';
import PersonIcon from '@mui/icons-material/Person';


const SearchInput = styled(TextField)({

    '.MuiInputBase-root':{
      backgroundColor: 'rgba(0,0,0,0.35)',
      color: 'white',
      borderRadius: 16
    },
    ' .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'antiqueWhite',
        borderRadius: 15,
      },
      '&:hover fieldset': {
        borderColor: 'antiqueWhite',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'antiqueWhite',
      },
    },
    ' .MuiSelect-icon':{
      display:'none'
    },
    '.MuiOutlinedInput-root':{
      paddingRight: 0
    },
    ' .MuiInputAdornment-root':{
      '& .MuiInput-root':{ 
        backgroundColor: 'white',
      borderRadius: " 0 14px 14px 0"}
    }
}
)

const SearchField = ({type, setType,searchText,setSearchText})=> {

  return (
    <div className='search-wrapper'>
        <FormControl variant="outlined">
            <SearchInput 
              type='text'
              value = {searchText}
              onChange={e=>setSearchText(e.target.value)}
              variant="outlined"
              InputProps={{
                endAdornment: <InputAdornment position="end">
                
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
                </InputAdornment>,
              }}
              size="small"
              margin="dense"
              
            />
        </FormControl>
    </div>
  )
}

export default SearchField;