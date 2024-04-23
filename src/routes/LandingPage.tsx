/* eslint-disable no-multi-str */
import React, {useContext, useRef, useState} from "react";
import NavBar from "../components/NavBar.tsx";
import { Container } from "@mui/material";
import SearchField from '../components/SearchField.tsx'
import StyledBtn from "../components/StyledBtn.tsx";
import { ArrowForward } from "@mui/icons-material";
import "../styles/welcomePage.scss"
import CardItems from "../components/CardItems.tsx";
import useSearch from "../myhooks/useSearch.ts";
import { useSearchParams } from "react-router-dom";
import { AppContext } from "../Context/AppContext.tsx";

export default function WelcomePage(){
    const [type,setType] = useState('movie');
    const [isLoading, setIsLoading] = useState(false);
    const [content, setContent] = useState(null);
    const [searchText, setSearchText] = useState("");
    const firstClick = useRef(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const open = searchParams.get("signin")
    const [dialogOpen,setDialogOpen] = useState(open ? Boolean(open):false);
    const search = useSearch();
    const {setSearchContent} = useContext(AppContext)
    
    const setTransitions = ()=>{
        console.log("first click!")
        const collapse = document.getElementById('introduction');
        const container =document.getElementById('intro-text');
        const searchWrapper = document.getElementById('search-wrapper');
        const searchContent = document.getElementById('landing-search-content-overlay');
        searchContent?.parentElement?.classList.add('search-section');
        searchContent?.nextElementSibling?.classList.add('search-results');
        document.getElementById('card-list-wrapper')?.classList.add('show-card-list');
        const main = document.getElementsByTagName('main')[0]
        searchContent?.classList.add('search-content');
        collapse?.classList.add('hide');
        searchWrapper.style.translate = '0px';
        searchWrapper?.classList.add('search-top');
        container?.classList.add('flex-top');
        main.style.alignItems = 'center';

        firstClick.current = false;
    }
    const searchBtnClick = async(e)=>{
        setIsLoading(true);
        e.target.classList.add('inline-btn');
        console.log("hellp", e.target.classList)
        const result = await search(type,searchText);
        if(firstClick) {
            setTransitions();
            setTimeout(()=>{
                setContent(result);
                setSearchContent(result);
                setIsLoading(false);
            },4100);
        }else{
            setContent(result);
            setIsLoading(false)
        }
        setSearchParams({search:searchText});
        console.log("Hey", result);
    }

    return(
        <div className="flex welcome-pg" style={{ flexDirection:"column", justifyContent:"space-between", height:"100vh", overflowY:"hidden"}}>
        <NavBar dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} >
        <main >
            <Container id="intro-text" className="flex intro-container"
                sx={(theme)=>({
                    [theme.breakpoints.down("sm")]: {
                        paddingLeft: theme.spacing(1),
                        paddingRight: theme.spacing(1)
                    }
                })}
                >
                <div className="landing-content" id="introduction">
                    <h1>Movie Mania</h1>
                    {WELCOME_TEXT}
                </div>
                  <div id="search-wrapper" className="search-wrapper1">
                    <SearchField type={type} setType={setType} searchText={searchText} setSearchText={setSearchText} />
                    <StyledBtn sx={{margin:".5rem"}} onClick={searchBtnClick} ><ArrowForward /></StyledBtn>
                  </div>
            </Container>
            <div id="search-section" >
                <div id="landing-search-content-overlay"></div>
                <div className="landing-search-content">
                    {!isLoading && <h3 style={{textAlign:"center", marginTop:12}}>{searchText}</h3>}
                    <div id="card-list-wrapper">
                        <CardItems loading={isLoading} data={content} faves={null} type={type} is_Search={true}/>
                    </div>
                </div>
            </div>
        </main>
        </NavBar>
        </div>
    )
}

const WELCOME_TEXT = <p>For movie lovers on the hunt to discover new gems. Search millions of titles and
    and add to your watchlist</p>

// const textStyle = {
// find out what's playing, soon to be released, and a collection of old favourite(s) movies
// }

// Keep record of old favourite films and discover new ones. 
//                     Follow your favourite <b>actors</b> & <b>directors</b> to see upcoming projects they are working on.
//                     For movie lovers on the hunt to discover new gems. Search millions of titles to remind yourself of old faves