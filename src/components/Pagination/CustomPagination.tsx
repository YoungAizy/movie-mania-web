import React from 'react';
import Pagination from '@mui/material/Pagination';
import { createTheme, ThemeProvider, Theme, StyledEngineProvider, adaptV4Theme } from '@mui/material';


declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}


const CustomPagination = ({ numofPages, setPage }) => {
    
    const darkTheme = createTheme(adaptV4Theme({
        palette: {
            mode: 'dark'
        }
    }))

    const onPageChange = (event, value) => {
        setPage(value);
        window.scroll(0, 0);
    }
    return (
        <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "12px" }}>
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={darkTheme}>

                <Pagination count={numofPages} defaultPage={1} onChange={onPageChange}/>
                </ThemeProvider>
            </StyledEngineProvider>
        </div>
    );
}

export default CustomPagination
