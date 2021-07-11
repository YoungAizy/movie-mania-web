import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import './Header.css';
import MenuIcon from '@material-ui/icons/Menu';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';

const Header = ({setTabIndex,isHomePage, setContent})=>{
    const [tab, setTab] = useState(0);

    const darkTheme = createMuiTheme({
        palette: {
            type: "dark",
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
        
            {(window.innerWidth>720 || isHomePage) && <span id="open" onClick={openNav} className="span-dark"><MenuIcon></MenuIcon></span>}
            <span className="first title">Movie</span>
            <span className="second title">App</span>
            {isHomePage && (
                <ThemeProvider theme={darkTheme} >
                    <Tabs className="tabs" indicatorColor='primary' value={tab} textColor="secondary" onChange={(event, newVal) => onTabChange(newVal)} centered>
                    <Tab style={{width:"50%"}} label="Movies" />
                    <Tab style={{ width: "50%" }} label="Tv Series" />
                    </Tabs>
                </ThemeProvider>
            )} 
        </header>
    )
}

export default Header;