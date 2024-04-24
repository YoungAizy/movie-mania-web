import React from 'react';
import {FormControl, InputAdornment,TextField} from '@mui/material';
import {styled} from '@mui/material/styles';


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

const SearchField = ({adornment = null,searchText,setSearchText})=> {

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
                  {adornment}
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