import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addVideo, removeVideo } from "../utilities/librarySlice";
import { calcTime, calcViews, convertDuration } from "../utilities/useMath";
import useFetch from "../utilities/useFetch";
import { ShareSVG, DotsSVG, ClockSVG } from "../utilities/SVG";

const VideoCards = ({ info }) => {
  const watchLater = useSelector((store) => store.library.watchLater);
  const dispatch = useDispatch();

  const [channelIcon, setChannelIcon] = useState();
  const [vdoViews, setVdoViews] = useState();
  const [vdoDuration, setVdoDuration] = useState();
  const [btnState, setBtnState] = useState(false);

  useEffect(() => {
    useFetch(`channels?part=snippet&id=${info?.snippet?.channelId}`).then(
      (data) =>
        setChannelIcon(data?.items[0]?.snippet?.thumbnails?.default?.url)
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
    <div className="videoCard">
      <Link
        className="textNone"
        to={
          info.id.videoId
            ? "/watch?v=" + info?.id?.videoId
            : "/watch?v=" + info?.id
        }>
        <div className="videoBanner">
          <img
            src={info?.snippet?.thumbnails?.medium?.url}
            className="videoBannerImg"
          />
          <span className="videoCardDuration">
            {(vdoDuration && convertDuration(vdoDuration)) ||
              (info?.contentDetails?.duration &&
                convertDuration(info?.contentDetails?.duration))}
          </span>
        </div>
      </Link>
      <div className="videoDesc">
        <Link className="textNone" to={"/channel/" + info?.snippet?.channelId}>
          <div className="channelIcon">
            <img src={channelIcon} className="channelIconImg" alt="" />
          </div>
        </Link>
        <div style={{ position: "relative", width: "95%" }}>
          <Link
            className="textNone"
            to={
              info.id.videoId
                ? "/watch?v=" + info?.id?.videoId
                : "/watch?v=" + info?.id
            }>
            <div className="videoTitle">{info?.snippet?.title}</div>
          </Link>
          <Link
            className="textNone"
            to={"/channel/" + info?.snippet?.channelId}>
            <div className="channelName">
              {info?.snippet?.channelTitle}
              <div className="titleTimeSeperator">{" • "}</div>
            </div>
          </Link>
          <Link
            className="textNone"
            to={
              info.id.videoId
                ? "/watch?v=" + info?.id?.videoId
                : "/watch?v=" + info?.id
            }>
            <div className="videoViews">
              {calcViews(info?.statistics?.viewCount || vdoViews) +
                " views  •  "}
              {info?.snippet?.publishedAt &&
                calcTime(info?.snippet?.publishedAt)}
            </div>
          </Link>
        </div>
        <div className="vdOptionBtn" onClick={() => setBtnState(!btnState)}>
          <DotsSVG />
        </div>
        {btnState && (
          <div className="homeMenuBox">
            <div
              className="themeBoxMode"
              onClick={() => {
                watchLater?.includes(
                  info?.id?.videoId ? info?.id?.videoId : info?.id
                )
                  ? dispatch(
                      removeVideo(
                        info?.id?.videoId ? info?.id?.videoId : info?.id
                      )
                    )
                  : dispatch(
                      addVideo(info?.id?.videoId ? info?.id?.videoId : info?.id)
                    );
                setBtnState(false);
              }}>
              <ClockSVG />
              {!watchLater?.includes(
                info?.id?.videoId ? info?.id?.videoId : info?.id
              )
                ? "Save to Watch later"
                : "Remove from Watch later"}
            </div>
            <div className="themeBoxMode">
              <ShareSVG />
              Share
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default VideoCards;
