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
    btnColor?: "primary" | "secondary" | "info" | "warning" | "success" | "error" | "inherit",
    variant?: "text" | "outlined" | "contained",
    sx?: any
}
const StyledBtn = ({children, onClick, btnSize="medium", btnColor ='primary', btnType="button", variant="contained",sx, classes = null}:propTypes)=>{


    return(
        <Button sx={{
            // color:btnColor,
            borderRadius: 6,
            ...sx
        }} 
        onClick={onClick} color={btnColor} type={btnType} size={btnSize} variant={variant} className={classes} > {children}</Button>
    )
}

export default StyledBtn;