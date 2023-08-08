import { calcTime, calcViews, convertDuration } from "../utilities/useMath";
import useFetch from "../utilities/useFetch";
import { useState, useEffect } from "react";
const VideoCards = ({ info }) => {
  const [channelIcon, setChannelIcon] = useState("");
  const [vdoViews, setVdoViews] = useState("");
  useEffect(() => {
    useFetch(`channels?part=snippet&id=${info?.snippet?.channelId}`).then(
      (data) => {
        setChannelIcon(data?.items[0]?.snippet?.thumbnails?.default?.url);
      }
    );
    if (!info?.statistics)
      useFetch(`videos?part=statistics&id=${info?.id?.videoId}`).then(
        (data) => {
          setVdoViews(data?.items[0]?.statistics?.viewCount);
        }
      );
  }, [info]);

  return (
    <>
      <div className="videoCard">
        <div className="videoBanner">
          <img
            src={info?.snippet?.thumbnails?.medium?.url}
            className="videoBannerImg"
          />
          <span className="videoCardDuration">
            {info?.contentDetails?.duration &&
              convertDuration(info?.contentDetails?.duration)}
          </span>
        </div>
        <div className="videoDesc">
          <div className="channelIcon">
            <img src={channelIcon} />
          </div>
          <div>
            <div className="videoTitle">{info?.snippet?.title}</div>
            <div className="channelName">{info?.snippet?.channelTitle}</div>
            <div className="videoViews">
              {calcViews(info?.statistics?.viewCount || vdoViews) +
                " views  •  "}
              {info?.snippet?.publishedAt &&
                calcTime(info?.snippet?.publishedAt)}
            </div>
            <div className="videoTime"></div>
          </div>
        </div>
      </div>
    </>
  );
};
export default VideoCards;
