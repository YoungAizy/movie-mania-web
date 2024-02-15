import React, { useState } from 'react'
import TextInput from './styled/TextInput.tsx'
import StyledBtn from './StyledBtn.tsx'

const PasswordUpdateDialog = () => {
  const [oldPasswrd,setOldPasswrd] = useState("");
  const [newPasswrd, setNewPasswrd] = useState(""); 
  return (
    <div>
        <h2>Update Password</h2>
        <TextInput value={oldPasswrd} />
        <TextInput value={newPasswrd} />
        <div className="dialog-submit-btns">
            <StyledBtn >Cancel</StyledBtn>
            <StyledBtn >Update</StyledBtn>
        </div>
    </div>
  )
}

export default PasswordUpdateDialog