import {styled }from '@mui/material/styles';
import { TextField } from '@mui/material';

const TextInput = styled(TextField)({  

      width: "80%",
        '.MuiInputBase-root':{
          color: 'white',
          margin: "14px 0"
        },
        '.MuiOutlinedInput-input':{
          padding: "14px 16px"
        },
        '.MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'antiqueWhite',
            borderRadius: 32,
          },
          '&:hover fieldset': {
            borderColor: 'antiqueWhite',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'antiqueWhite',
          },
        },
        '.MuiSelect-icon':{
          display:'none'
        },
        '.MuiOutlinedInput-adornedEnd':{
          paddingRight: 0
        },
        ' .MuiInputAdornment-root':{
          '& .MuiInput-root':{ 
            backgroundColor: 'white',
            borderRadius: 24}
        }
    }
    )

export default TextInput