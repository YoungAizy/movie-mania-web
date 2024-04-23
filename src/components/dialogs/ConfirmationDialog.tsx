import React, { useState } from 'react'
import MyDialog from '../styled/MyDialog.tsx'
import { DialogActions } from '@mui/material';
import StyledBtn from '../StyledBtn.tsx';
import TextInput from '../styled/TextInput.tsx';

const ConfirmationDialog = ({open, setOpen, oldVal, newVal, field, Reject, Accept, submitBtnText = "Accept", promptText}) => {
    const [inputVal, setInputVal] = useState("");

    const onReject = ()=>{
        Reject(oldVal);
        setOpen(false);
    }
    const onAccept = ()=>{
        if(promptText) Accept(inputVal);
        else Accept();
    }
  return (
    <MyDialog sx={{'.MuiDialog-paper':{padding:'12px',color:'white'}}} open={open} onClose={()=>{}} >
        <div>
            {!promptText ? <h3 style={{textAlign:"center", marginLeft:'16px'}}>Update {field} to {newVal}?</h3>:
            <h3 style={{marginLeft:'16px'}}>Verify {promptText}</h3>}
            {promptText && <TextInput type='text' value = {inputVal} onChange={e=>setInputVal(e.target.value)} variant="outlined" />}
        </div>
        <DialogActions>
            {Reject && <StyledBtn onClick={onReject} btnColor={'error'} >Cancel</StyledBtn>}
            <StyledBtn onClick={onAccept}>{submitBtnText}</StyledBtn>
        </DialogActions>

    </MyDialog>
  )
}

export default ConfirmationDialog;