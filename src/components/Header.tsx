import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import '../styles/Header.scss';
import MenuIcon from '@mui/icons-material/Menu';
import { createTheme } from '@mui/material';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import NavigationDrawer from './NavigationDrawer.tsx';


// declare module '@mui/styles/defaultTheme' {
//   // eslint-disable-next-line @typescript-eslint/no-empty-interface
//   interface DefaultTheme extends Theme {}
// }


const Header = ({setTabIndex,isHomePage, setContent})=>{
    const [tab, setTab] = useState(0);
    const [openNavigation, setOpenNavigation] = useState(false);

    const darkTheme = createTheme({
        palette: {
            mode: "dark",
            secondary: {
                main: "#fff"
            }
        }
    })

    const onTabChange = (index) => {
        setContent([])
        setTabIndex(index)
        setTab(index)
    }

    // const openNav = () => {
    //     if (window.innerWidth > 720)
    //         return document.getElementById("mySidenav").style.width = "250px";
    //     document.getElementById("mobileSearch-wrapper").style.display = "block";
    //     document.getElementById("search-container").classList.toggle("show-search");
    // }

    return (
        <header>
            <NavigationDrawer openNavigation={openNavigation} setOpenNavigation={setOpenNavigation} />
        
            <span id="open" onClick={()=>setOpenNavigation(true)} className=""><MenuIcon></MenuIcon></span>
            <span className="first title">Movie</span>
            <span className="second title">App</span>
            {isHomePage && (
                <StyledEngineProvider injectFirst>
                    <ThemeProvider theme={darkTheme} >
                        <Tabs className="tabs" indicatorColor='primary' value={tab} textColor="secondary" onChange={(event, newVal) => onTabChange(newVal)} centered>
                            <Tab style={{width:"50%"}} label="Movies" />
                            <Tab style={{ width: "50%" }} label="Tv Series" />
                        </Tabs>
                    </ThemeProvider>
                </StyledEngineProvider>
            )} 
        </header>
    );
}

export default Header;