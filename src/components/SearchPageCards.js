import { useState, useEffect } from "react";
import { calcTime, calcViews, convertDuration } from "../utilities/useMath";
import useFetch from "../utilities/useFetch";
const SearchPageCards = ({ vdoId }) => {
  //   console.log(info);
  const [info, setInfo] = useState(null);
  useEffect(() => {
    useFetch(
      `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${vdoId}`
    ).then((data) => {
      //   console.log(data?.items[0]);
      setInfo(data?.items[0]);
    });
  }, [vdoId]);
  return (
    <div className="videoBox">
      <div style={{ position: "relative" }}>
        <img
          src={info?.snippet?.thumbnails?.medium?.url}
          className="videoThumb"
        />
        <span className="videoCardDuration">
          {info?.contentDetails?.duration &&
            convertDuration(info?.contentDetails?.duration)}
        </span>
      </div>
      <div>
        <div className="videoBoxTitle">{info?.snippet?.title}</div>
        <div className="videoBoxTime">
          {calcViews(info?.statistics?.viewCount) +
            " views • " +
            calcTime(info?.snippet?.publishedAt)}
        </div>
        <div className="videoBoxTime boldText">
          {info?.snippet?.channelTitle}
        </div>
        <div className="videoBoxDesc">{info?.snippet?.description}</div>
      </div>
    </div>
  );
};
export default SearchPageCards;
