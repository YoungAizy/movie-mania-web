/* eslint-disable no-multi-str */
import React from "react";
import NavBar from "../components/NavBar.tsx";
import { Container } from "@mui/material";
import SearchField from '../components/SearchField.tsx'
import SigninModal from "../components/SigninModal.tsx";

export default function WelcomePage(){
    import('../styles/welcomePage.css')


    return(
        <div className="flex welcome-pg" style={{ flexDirection:"column", justifyContent:"space-between", height:"100%"}}>
        <NavBar />
        <main >
            <Container id="intro-text" className="flex" style={{ flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
                <div className="landing-content">
                    <h1>Movie Mania</h1>
                    <p>{WELCOME_TEXT}</p>
                </div>
                <SearchField />
            </Container>
            <div id="search-section" >
                <div className="landing-content">
                <div id="welcome_pg_searchbar"></div>
                </div>
            </div>
            <SigninModal />
        </main>
        </div>
    )
}

const WELCOME_TEXT = "Keep record of old favourite films and discover new ones. \
                    Follow your favourite <b>actors</b> & <b>directors</b> to see upcoming projects they are working on. \
                    For movie lovers on the hunt to discover new gems. Search millions of titles to remind yourself of old faves"

// const textStyle = {
// find out what's playing, soon to be released, and a collection of old favourite(s) movies
// }