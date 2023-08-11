import { useState, useEffect } from "react";
import useFetch from "../utilities/useFetch";
import { Link } from "react-router-dom";
import { SearchSVG } from "../utilities/SVG";

const resSearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [searchState, setSearchState] = useState(false);

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
      <div className="mobileSearchInput">
        <Link to="/" className="textNone">
          <svg height="24" width="24" viewBox="0 0 24 24" className="backBtn">
            <path d="M21,11v1H5.64l6.72,6.72l-0.71,0.71L3.72,11.5l7.92-7.92l0.71,0.71L5.64,11H21z"></path>
          </svg>
        </Link>
        <input
          type="text"
          placeholder="Search"
          className="mobileSearchBox"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          onFocus={() => setSearchState(true)}
        />
      </div>
      <div className="resSearchContainer">
        {searchState && (
          <div className="mobileSearchResultContainer">
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
        )}
      </div>
    </>
  );
};
export default resSearchPage;
