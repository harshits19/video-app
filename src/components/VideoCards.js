import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { calcTime, calcViews, convertDuration } from "../utilities/useMath";
import useFetch from "../utilities/useFetch";
const VideoCards = ({ info }) => {
  // console.log(info);
  const [channelIcon, setChannelIcon] = useState();
  const [vdoViews, setVdoViews] = useState();
  const [vdoDuration, setVdoDuration] = useState();
  useEffect(() => {
    useFetch(`channels?part=snippet&id=${info?.snippet?.channelId}`).then(
      (data) => {
        setChannelIcon(data?.items[0]?.snippet?.thumbnails?.default?.url);
      }
    );
    if (!info?.statistics)
      useFetch(
        `videos?part=statistics%2CcontentDetails&id=${info?.id?.videoId}`
      ).then((data) => {
        setVdoViews(data?.items[0]?.statistics?.viewCount);
        setVdoDuration(data?.items[0]?.contentDetails?.duration);
      });
  }, [info]);
  return (
    <>
      <div className="videoCard">
        <Link className="textNone" to={"watch?v=" + info?.id}>
          <div className="videoBanner">
            <div className="videoBannerImg">
              <img
                src={info?.snippet?.thumbnails?.medium?.url}
                className="videoBannerImg"
              />
            </div>
            <span className="videoCardDuration">
              {(vdoDuration && convertDuration(vdoDuration)) ||
                (info?.contentDetails?.duration &&
                  convertDuration(info?.contentDetails?.duration))}
            </span>
          </div>
        </Link>
        <div className="videoDesc">
          <Link className="textNone" to={"channel/" + info?.snippet?.channelId}>
            <div className="channelIcon">
              <img src={channelIcon} className="channelIconImg" alt="" />
            </div>
          </Link>
          <div>
            <Link className="textNone" to={"watch?v=" + info?.id}>
              <div className="videoTitle">{info?.snippet?.title}</div>
            </Link>
            <Link
              className="textNone"
              to={"channel/" + info?.snippet?.channelId}>
              <div className="channelName">{info?.snippet?.channelTitle}</div>
            </Link>
            <Link className="textNone" to={"watch?v=" + info?.id}>
              <div className="videoViews">
                {calcViews(info?.statistics?.viewCount || vdoViews) +
                  " views  •  "}
                {info?.snippet?.publishedAt &&
                  calcTime(info?.snippet?.publishedAt)}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default VideoCards;
