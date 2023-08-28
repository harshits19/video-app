import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addVideo, removeVideo } from "../utilities/librarySlice";
import useFetch from "../utilities/useFetch";
import { calcViews, calcTime, convertDuration } from "../utilities/useMath";
import { ShareSVG, DotsSVG, ClockSVG } from "../utilities/SVG";

const SideBarCards = (data) => {
  const watchLater = useSelector((store) => store.library.watchLater);
  const [btnState, setBtnState] = useState(false);
  const [vdoData, setVdoData] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    useFetch(
      `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${data?.id?.videoId}`
    ).then((data) => {
      setVdoData(data?.items[0]);
    });
  }, []);

  return (
    <div className="sideBarCards">
      <div className="sidebarThumb">
        <Link to={"/watch?v=" + data?.id?.videoId} className="textNone">
          <img
            src={data?.snippet?.thumbnails?.medium?.url}
            className="sidebarImg"
          />
          <span className="videoCardDuration">
            {vdoData?.contentDetails?.duration &&
              convertDuration(vdoData?.contentDetails?.duration)}
          </span>
        </Link>
      </div>
      <div className="sidebarDesc">
        <Link to={"/watch?v=" + data?.id?.videoId} className="textNone">
          <div className="sidebarTitle">{data?.snippet?.title}</div>
          <div className="sidebarChannel">{data?.snippet?.channelTitle}</div>
          <div className="sidebarInfo sidebarChannel">
            {vdoData?.statistics?.viewCount &&
              calcViews(vdoData?.statistics?.viewCount) + " views  •  "}
            {data?.snippet?.publishedAt && calcTime(data?.snippet?.publishedAt)}
          </div>
        </Link>
      </div>
      <div className="sbOptionBtn" onClick={() => setBtnState(!btnState)}>
        <DotsSVG />
      </div>
      {btnState && (
        <div className="homeMenuBox">
          <div
            className="themeBoxMode"
            onClick={() => {
              watchLater?.includes(data?.id?.videoId)
                ? dispatch(removeVideo(data?.id?.videoId))
                : dispatch(addVideo(data?.id?.videoId));
              setBtnState(false);
            }}>
            <ClockSVG />
            {!watchLater?.includes(data?.id?.videoId)
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
  );
};
export default SideBarCards;
