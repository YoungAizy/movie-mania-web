import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

const CustomPagination = ({ numofPages, setPage }) => {
    
    const darkTheme = createMuiTheme({
        palette: {
            type: 'dark'
        }
    })

    const onPageChange = (event, value) => {
        setPage(value);
        window.scroll(0, 0);
    }
    return (
        <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "12px" }}>
            <ThemeProvider theme={darkTheme}>

            <Pagination count={numofPages} defaultPage={1} onChange={onPageChange}/>
            </ThemeProvider>
        </div>
    )
}

export default CustomPagination
