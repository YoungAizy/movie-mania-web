import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import '../styles/Header.scss';
import MenuIcon from '@mui/icons-material/Menu';
import { createTheme } from '@mui/material';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';


// declare module '@mui/styles/defaultTheme' {
//   // eslint-disable-next-line @typescript-eslint/no-empty-interface
//   interface DefaultTheme extends Theme {}
// }


const Header = ({setTabIndex,isHomePage, setContent})=>{
    const [tab, setTab] = useState(0);

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

    const openNav = () => {
        if (window.innerWidth > 720)
            return document.getElementById("mySidenav").style.width = "250px";
        document.getElementById("mobileSearch-wrapper").style.display = "block";
        document.getElementById("search-container").classList.toggle("show-search");
}

/* Set the width of the side navigation to 0 */
const closeNav = ()=> {
  document.getElementById("mySidenav").style.width = "0";
}

    return (
        <header>
            <div id="mySidenav" className="sidenav">
                <Link to="/">Movies &amp; Series</Link>
                <Link to="/people">People</Link>
                <Link to="/favourites">Favourites</Link>
                <button className="closebtn" onClick={closeNav}>&times;</button>
              
            </div>
        
            {(window.innerWidth>720 || isHomePage) && <span id="open" onClick={openNav} className=""><MenuIcon></MenuIcon></span>}
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