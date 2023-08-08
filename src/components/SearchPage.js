import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import useFetch from "../utilities/useFetch";
import { useState } from "react";
import { useSelector } from "react-redux";
import { calcTime } from "../utilities/useMath";

const ChannelBox = ({ info }) => {
  //   console.log(info);
  return (
    <div className="channelBox">
      <div className="channelImg">
        <img src={info?.thumbnails?.medium?.url} className="channelThumb" />
      </div>
      <div>
        <div className="videoBoxTitle">{info?.title}</div>
        <div className="videoBoxDesc">{info?.description}</div>
      </div>
    </div>
  );
};
const VideoBox = ({ info }) => {
  //   console.log(info);
  return (
    <div className="videoBox">
      <div>
        <img src={info?.thumbnails?.medium?.url} className="videoThumb" />
      </div>
      <div>
        <div className="videoBoxTitle">{info?.title}</div>
        <div className="videoBoxTime">{calcTime(info?.publishedAt)}</div>
        <div className="videoBoxTime">{info?.channelTitle}</div>
        <div className="videoBoxDesc">{info?.description}</div>
      </div>
    </div>
  );
};

const SearchPage = () => {
  const [text] = useSearchParams();
  const [searchData, setSearchData] = useState(null);
  const keyword = text.get("search_query");
  useEffect(() => {
    useFetch(
      `search?part=snippet&type=video&type=channel&maxResults=25&q=${keyword}`
    ).then((data) => {
      //   console.log(data?.items);
      setSearchData(data?.items);
    });
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
              <ChannelBox info={data?.snippet} />
            </Link>
          ) : (
            <Link
              to={"/watch?v=" + data?.id?.videoId}
              className="textNone"
              key={data?.id?.videoId}>
              <VideoBox info={data?.snippet} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default SearchPage;
