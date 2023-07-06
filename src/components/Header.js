import logo from "../assets/youtubeLogo.png";
import userIcon from "../assets/userLight.png";
import { useDispatch } from "react-redux";
import { toggleNavState } from "../utilities/navSlice";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../utilities/useFetch";
import { SearchSVG } from "../utilities/SVG";

const Header = () => {
  const dispatch = useDispatch(); //for sideNav state change
  const toggleNavHandler = () => {
    dispatch(toggleNavState());
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [searchState, setSearchState] = useState(false);

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
      `http://suggestqueries.google.com/complete`
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
              <img src={logo} className="logo" />
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
        <div className="userSection">
          <div className="userLogin">
            <img src={userIcon} className="userLight" />
            <span>Sign In</span>
          </div>
        </div>
      </div>
    </>
  );
};
export default Header;
