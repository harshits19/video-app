import { useDispatch } from "react-redux";
import { toggleNavState } from "../utilities/navSlice";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../utilities/useFetch";
import { SearchSVG } from "../utilities/SVG";
import lightBtn from "../assets/light.svg";
import darkBtn from "../assets/dark.svg";
import { LogoLight, LogoDark } from "../utilities/SVG";

const Header = ({ theme, setTheme }) => {
  const dispatch = useDispatch(); //for sideNav state change
  const toggleNavHandler = () => {
    dispatch(toggleNavState());
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [searchState, setSearchState] = useState(false);
  const [themeBoxState, setThemeBoxState] = useState(false);

  const backdrop = (
    <div
      className="searchBackdrop"
      onClick={() => {
        setSearchState(false);
      }}></div>
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchResults();
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);
  const fetchResults = () => {
    useFetch(
      `search?client=chrome&ds=yt&q=${searchQuery}`,
      `https://corsproxy.io/?http://suggestqueries.google.com/complete`
    ).then((data) => {
      setSuggestions(data[1]);
    });
  };
  return (
    <>
      <div className="header">
        <div className="menuLogoSection">
          <div className="menuSection">
            <svg
              height="24"
              width="24"
              viewBox="0 0 24 24"
              className="hamIcon"
              onClick={() => toggleNavHandler()}>
              <path d="M21,6H3V5h18V6z M21,11H3v1h18V11z M21,17H3v1h18V17z"></path>
            </svg>
          </div>
          <div className="logoSection">
            <Link to="/" className="textNone">
              {theme == "lightTheme" ? <LogoLight /> : <LogoDark />}
            </Link>
          </div>
        </div>
        <div className="searchSection">
          <div className="searchBar">
            <input
              type="text"
              className="searchInput"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
              onFocus={() => setSearchState(true)}
            />
            {searchQuery && (
              <div
                className="clearBtn"
                onClick={() => {
                  setSearchQuery("");
                  setSearchState(false);
                }}>
                <svg height="24" width="24" viewBox="0 0 24 24">
                  <path d="m12.71 12 8.15 8.15-.71.71L12 12.71l-8.15 8.15-.71-.71L11.29 12 3.15 3.85l.71-.71L12 11.29l8.15-8.15.71.71L12.71 12z"></path>
                </svg>
              </div>
            )}
            {suggestions.length > 0 && searchState && (
              <>
                <div className="searchResultContainer">
                  {suggestions.map((suggestion) => (
                    <Link
                      to={"/results?search_query=" + suggestion}
                      className="textNone"
                      key={suggestion}
                      onClick={() => {
                        setSearchState(false), setSearchQuery(suggestion);
                      }}>
                      <div className="searchResultItems">
                        <SearchSVG classTitle="searchIcon" />
                        {suggestion}
                      </div>
                    </Link>
                  ))}
                </div>
                {backdrop}
              </>
            )}
            <div className="searchBtn" onClick={() => setSearchState(false)}>
              {searchQuery ? (
                <Link
                  to={"/results?search_query=" + searchQuery}
                  className="textNone">
                  <SearchSVG />
                </Link>
              ) : (
                <SearchSVG />
              )}
            </div>
          </div>
          <div className="menuSection">
            <svg height="24" width="24" viewBox="0 0 24 24">
              <path d="M12 3C10.34 3 9 4.37 9 6.07V11.93C9 13.63 10.34 15 12 15C13.66 15 15 13.63 15 11.93V6.07C15 4.37 13.66 3 12 3ZM18.5 12H17.5C17.5 15.03 15.03 17.5 12 17.5C8.97 17.5 6.5 15.03 6.5 12H5.5C5.5 15.24 7.89 17.93 11 18.41V21H13V18.41C16.11 17.93 18.5 15.24 18.5 12Z"></path>
            </svg>
          </div>
        </div>
        <div className="mobileSearch">
          <Link to="/resSearch" className="textNone">
            <svg height="24" width="24" viewBox="0 -1 22 22">
              <path d="M20.87,20.17l-5.59-5.59C16.35,13.35,17,11.75,17,10c0-3.87-3.13-7-7-7s-7,3.13-7,7s3.13,7,7,7c1.75,0,3.35-0.65,4.58-1.71 l5.59,5.59L20.87,20.17z M10,16c-3.31,0-6-2.69-6-6s2.69-6,6-6s6,2.69,6,6S13.31,16,10,16z"></path>
            </svg>
          </Link>
        </div>
        <div className="rightSection">
          <div
            className="menuSection themeBtn"
            onClick={() => setThemeBoxState(!themeBoxState)}>
            <svg height="24" width="24" viewBox="0 0 24 24">
              <path d="M12 16.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zM10.5 12c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5zm0-6c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5z"></path>
            </svg>
          </div>
          {themeBoxState && (
            <div className="themeSelectBox">
              <div className="themeBoxTitle">
                <svg
                  height="24"
                  width="24"
                  viewBox="0 0 24 24"
                  className="boxBackBtn"
                  onClick={() => {
                    setThemeBoxState(false);
                  }}>
                  <path d="M21,11v1H5.64l6.72,6.72l-0.71,0.71L3.72,11.5l7.92-7.92l0.71,0.71L5.64,11H21z"></path>
                </svg>
                Appearance
              </div>
              <div className="themeBoxOptions">
                <div
                  className="themeBoxMode"
                  onClick={() => {
                    setTheme("lightTheme");
                    setThemeBoxState(false);
                  }}>
                  {theme == "lightTheme" ? (
                    <svg height="24" width="24" viewBox="0 0 24 24">
                      <path d="m9 18.7-5.4-5.4.7-.7L9 17.3 20.6 5.6l.7.7L9 18.7z"></path>
                    </svg>
                  ) : (
                    <svg height="24" width="24" viewBox="0 0 24 24"></svg>
                  )}
                  Light Theme
                </div>
                <div
                  className="themeBoxMode"
                  onClick={() => {
                    setTheme("darkTheme");
                    setThemeBoxState(false);
                  }}>
                  {theme == "darkTheme" ? (
                    <svg height="24" width="24">
                      <path d="m9 18.7-5.4-5.4.7-.7L9 17.3 20.6 5.6l.7.7L9 18.7z"></path>
                    </svg>
                  ) : (
                    <svg height="24" width="24"></svg>
                  )}
                  Dark Theme
                </div>
              </div>
            </div>
          )}
          <div className="userSection">
            <svg height="22" width="22" viewBox="0 0 23 23">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 1c4.96 0 9 4.04 9 9 0 1.42-.34 2.76-.93 3.96-1.53-1.72-3.98-2.89-7.38-3.03A3.996 3.996 0 0016 9c0-2.21-1.79-4-4-4S8 6.79 8 9c0 1.97 1.43 3.6 3.31 3.93-3.4.14-5.85 1.31-7.38 3.03C3.34 14.76 3 13.42 3 12c0-4.96 4.04-9 9-9zM9 9c0-1.65 1.35-3 3-3s3 1.35 3 3-1.35 3-3 3-3-1.35-3-3zm3 12c-3.16 0-5.94-1.64-7.55-4.12C6.01 14.93 8.61 13.9 12 13.9c3.39 0 5.99 1.03 7.55 2.98C17.94 19.36 15.16 21 12 21z"></path>
            </svg>
            <span>Sign In</span>
          </div>
        </div>
        <div className="themeSwitch">
          {theme == "lightTheme" ? (
            <img
              src={darkBtn}
              className="themeSwitchBtns"
              onClick={() => setTheme("darkTheme")}
            />
          ) : (
            <img
              src={lightBtn}
              className="themeSwitchBtns"
              onClick={() => setTheme("lightTheme")}
              fill="#ffffff"
            />
          )}{" "}
        </div>
      </div>
    </>
  );
};
export default Header;
