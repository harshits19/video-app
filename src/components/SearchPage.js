import { Link, useSearchParams } from "react-router-dom";
import useFetch from "../utilities/useFetch";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import SearchPageCards from "./SearchPageCards";
import { calcViews } from "../utilities/useMath";

const ChannelBox = ({ chId }) => {
  const [info, setInfo] = useState();
  useEffect(() => {
    useFetch(`channels?part=snippet%2Cstatistics&id=${chId}`).then((data) => {
      // console.log(data);
      setInfo(data?.items[0]);
    });
  }, [chId]);
  return (
    <div className="channelBox">
      <div className="channelImg">
        <img
          src={info?.snippet?.thumbnails?.medium?.url}
          className="channelThumb"
        />
      </div>
      <div>
        <div className="chBoxTitle">{info?.snippet?.title}</div>
        <div className="channelSubs">
          {info?.snippet?.customUrl +
            " • " +
            calcViews(info?.statistics?.subscriberCount) +
            " subscribers"}
        </div>
        <div className="videoBoxDesc">{info?.snippet?.description}</div>
      </div>
    </div>
  );
};

const SearchPage = () => {
  const [text] = useSearchParams();
  const [searchData, setSearchData] = useState(null);
  const keyword = text.get("search_query");
  useEffect(() => {
    useFetch(`search?type=video&type=channel&maxResults=15&q=${keyword}`).then(
      (data) => {
        // console.log(data?.items);
        setSearchData(data?.items);
      }
    );
  }, [text]);
  const isNavOpen = useSelector((store) => store.navState.isOpen);
  const mediaQuery = window.matchMedia("(min-width: 1200px)");
  const mediaQueryTwo = window.matchMedia("(min-width: 769px)");
  useEffect(() => {
    if (mediaQueryTwo.matches) {
      const abc = document.getElementById("searchBody");
      abc.style.marginLeft = "80px";
    }
    if (mediaQuery.matches) {
      const abc = document.getElementById("searchBody");
      abc.style.marginLeft = isNavOpen ? "240px" : "80px";
    }
  });
  return (
    <div id="searchBody">
      <div className="searchContainer">
        {searchData?.map((data) => {
          return data?.id?.kind == "youtube#channel" ? (
            <Link className="textNone" key={data?.id?.channelId}>
              <ChannelBox chId={data?.id?.channelId} />
            </Link>
          ) : (
            <Link
              to={"/watch?v=" + data?.id?.videoId}
              className="textNone"
              key={data?.id?.videoId}>
              <SearchPageCards vdoId={data?.id?.videoId} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default SearchPage;
/*   */
