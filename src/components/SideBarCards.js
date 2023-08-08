import { useEffect, useState } from "react";
import useFetch from "../utilities/useFetch";
import { calcViews, calcTime, convertDuration } from "../utilities/useMath";
const SideBarCards = (data) => {
  const [vdoData, setVdoData] = useState(null);
  useEffect(() => {
    useFetch(
      `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${data?.id?.videoId}`
    ).then((data) => {
      setVdoData(data?.items[0]);
    });
  }, []);
  return (
    <>
      <div className="sideBarCards">
        <div style={{ position: "relative" }}>
          <img
            src={data?.snippet?.thumbnails?.medium?.url}
            className="sidebarImg"
          />
          <span className="videoCardDuration" style={{ margin: "6px 12px" }}>
            {vdoData?.contentDetails?.duration &&
              convertDuration(vdoData?.contentDetails?.duration)}
          </span>
        </div>
        <div className="sidebarDesc">
          <div className="sidebarTitle">{data?.snippet?.title}</div>
          <div className="sidebarChannel">{data?.snippet?.channelTitle}</div>
          <div className="sidebarInfo sidebarChannel">
            {vdoData?.statistics?.viewCount &&
              calcViews(vdoData?.statistics?.viewCount) + " views  •  "}
            {data?.snippet?.publishedAt && calcTime(data?.snippet?.publishedAt)}
          </div>
        </div>
      </div>
    </>
  );
};
export default SideBarCards;
