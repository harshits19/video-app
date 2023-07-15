import { useState, useEffect } from "react";
import useFetch from "../utilities/useFetch";
import { Link } from "react-router-dom";
import backBtn from "../assets/back-btn.png";
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
          <img src={backBtn} className="backBtn" />
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
