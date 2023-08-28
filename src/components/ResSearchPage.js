import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addQuery } from "../utilities/searchSlice";
import useFetch from "../utilities/useFetch";
import { BackSVG, SearchSVG } from "../utilities/SVG";

const resSearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [searchState, setSearchState] = useState(false);
  const dispatch = useDispatch();
  const suggestionsCache = useSelector((store) => store.suggestionsCache);
  const nav = useNavigate();

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
  const fetchResults = () => {
    useFetch(
      `search?client=chrome&ds=yt&q=${searchQuery}`,
      `https://corsproxy.io/?http://suggestqueries.google.com/complete`
    ).then((data) => {
      dispatch(addQuery({ [searchQuery]: data[1] }));
      setSuggestions(data[1]);
    });
  };

  return (
    <>
      <form
        className="mobileSearchInput"
        onSubmit={(e) => {
          e.preventDefault();
          nav("/results?search_query=" + searchQuery);
          setSearchState(false);
        }}>
        <span onClick={() => nav(-1)} className="textNone">
          <BackSVG />
        </span>
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
        {searchQuery && (
          <div
            className="resClearBtn"
            onClick={() => {
              setSearchQuery("");
              setSearchState(false);
            }}>
            <svg viewBox="0 0 24 24" className="resClearSvg">
              <path d="m12.71 12 8.15 8.15-.71.71L12 12.71l-8.15 8.15-.71-.71L11.29 12 3.15 3.85l.71-.71L12 11.29l8.15-8.15.71.71L12.71 12z"></path>
            </svg>
          </div>
        )}
      </form>
      <div className="resSearchContainer">
        {suggestions.length > 0 && searchState && (
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
