import React from 'react';
import {Button} from '@mui/material';

/* PROPS
btnText
btnColor
btnRadius
btnSize? small | medium | large
**/

type propTypes={
    children: React.ReactNode,
    onClick: React.MouseEventHandler,
    btnType?: "button" | "submit" | "reset",
    btnSize?: "small" | "medium" | "large",
    btnColor?: string,
    variant?: "text" | "outlined" | "contained",
    sx?: any
}
const StyledBtn = ({children, onClick, btnSize="medium", btnColor ='secondary', btnType="button", variant="contained",sx}:propTypes)=>{


    return(
        <Button sx={{
            color:btnColor,
            borderRadius: 6,
            ...sx
        }} 
        onClick={onClick} type={btnType} size={btnSize} variant={variant} > {children}</Button>
    )
}

export default StyledBtn;