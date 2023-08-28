import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleNavState } from "../utilities/navSlice";
import { addQuery } from "../utilities/searchSlice";
import useFetch from "../utilities/useFetch";
import lightBtn from "../assets/light.svg";
import darkBtn from "../assets/dark.svg";
import {
  SearchSVG,
  LogoLight,
  LogoDark,
  CrossSVG,
  MicSVG,
  DotsSVG,
  TickSVG,
  UserSVG,
} from "../utilities/SVG";

const Header = ({ theme, setTheme }) => {
  const nav = useNavigate();
  const dispatch = useDispatch(); //for sideNav state change
  const suggestionsCache = useSelector((store) => store.suggestionsCache);

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
      suggestionsCache[searchQuery]
        ? setSuggestions(suggestionsCache[searchQuery])
        : fetchResults();
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const fetchResults = useCallback(() => {
    useFetch(
      `search?client=chrome&ds=yt&q=${searchQuery}`,
      `https://corsproxy.io/?http://suggestqueries.google.com/complete`
    ).then((data) => {
      dispatch(addQuery({ [searchQuery]: data[1] }));
      setSuggestions(data[1]);
    });
  }, [searchQuery]);

  return (
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
        <form
          className="searchBar"
          onSubmit={(e) => {
            e.preventDefault();
            nav("/results?search_query=" + searchQuery);
            setSearchState(false);
          }}>
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
              <CrossSVG />
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
        </form>
        <div className="menuSection">
          <MicSVG />
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
          <DotsSVG />
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
                  localStorage.setItem("themeMode", "lightTheme");
                  setThemeBoxState(false);
                }}>
                {theme == "lightTheme" ? (
                  <TickSVG />
                ) : (
                  <svg height="24" width="24" viewBox="0 0 24 24"></svg>
                )}
                Light Theme
              </div>
              <div
                className="themeBoxMode"
                onClick={() => {
                  setTheme("darkTheme");
                  localStorage.setItem("themeMode", "darkTheme");
                  setThemeBoxState(false);
                }}>
                {theme == "darkTheme" ? (
                  <TickSVG />
                ) : (
                  <svg height="24" width="24"></svg>
                )}
                Dark Theme
              </div>
            </div>
          </div>
        )}
        <div className="userSection">
          <UserSVG />
          <span>Sign In</span>
        </div>
      </div>
      <div className="themeSwitch">
        {theme == "lightTheme" ? (
          <img
            src={darkBtn}
            className="themeSwitchBtns"
            onClick={() => {
              setTheme("darkTheme");
              localStorage.setItem("themeMode", "darkTheme");
            }}
          />
        ) : (
          <img
            src={lightBtn}
            className="themeSwitchBtns"
            onClick={() => {
              setTheme("lightTheme");
              localStorage.setItem("themeMode", "lightTheme");
            }}
            fill="#ffffff"
          />
        )}
      </div>
    </div>
  );
};
export default Header;
