import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import Genres from "./Genres.tsx";
import useSearch from "../myhooks/useSearch.ts";

const SearchSideBar = (props) => {
  const [searchText, setSearchText] = useState("");
  const searchQuery = useSearch();

  const fetchSearch = async (e) => {
    e.preventDefault();
    try {
      const { data } = await searchQuery(props.type, searchText);
      props.setContent(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  const closeMobileSearch = (e) => {
    document.getElementById("search-container").classList.toggle("show-search");
    e.target.style.display = "none";
  };

  if (window.innerWidth <= 720) {
    return (
      <div id="mobileSearch-wrapper" onClick={(e) => closeMobileSearch(e)}>
        <div
          id="search-container"
          className="argh"
          style={{ background: "black" }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mobile-searchbar">
            <form style={{ background: "white", borderRadius: "8px" }}>
              <TextField
                onChange={(e) => setSearchText(e.target.value)}
                style={{ width: "84%", color: "white" }}
                id="outlined-size-small"
                label="Search field"
                type="search"
                variant="outlined"
                size="small"
              />
              <button
                onClick={(e) => fetchSearch(e)}
                style={{
                  padding: "6.5px 6px",
                  width: "16%",
                  background: "#41445bf2",
                  border: "none",
                  cursor: "pointer",
                  borderBottomRightRadius: "6px",
                  borderTopRightRadius: "6px",
                }}
              >
                <SearchIcon></SearchIcon>
              </button>
            </form>
            <Genres
              genres={props.genres}
              setGenres={props.setGenres}
              selectedGenres={props.selectedGenres}
              setselectedGenres={props.setselectedGenres}
              type={props.type}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="searchbar" style={{ width: "100%" }}>
      <div className="search">
        <form style={{ background: "white", borderRadius: "8px" }}>
          <TextField
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: "84.16%", color: "white" }}
            id="outlined-size-small"
            label="Search"
            type="search"
            variant="outlined"
            size="small"
          />
          <button
            onClick={fetchSearch}
            style={{
              padding: "6.5px 6px",
              background: "#41445bf2",
              border: "none",
              cursor: "pointer",
              borderBottomRightRadius: "6px",
              borderTopRightRadius: "6px",
            }}
          >
            <SearchIcon sx={{ color: "white" }}></SearchIcon>
          </button>
        </form>
        <Genres
          genres={props.genres}
          setGenres={props.setGenres}
          selectedGenres={props.selectedGenres}
          setselectedGenres={props.setselectedGenres}
          type={props.type}
        />
      </div>
    </div>
  );
};

export default SearchSideBar;
