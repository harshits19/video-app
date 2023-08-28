import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { closeNav, removeBackdrop } from "../utilities/navSlice";
import { addVideo, removeVideo, clearData } from "../utilities/librarySlice";
import { calcViews, convertDuration, calcTime } from "../utilities/useMath";
import useFetch from "../utilities/useFetch";
import { ShareSVG, ClockSVG, DotsSVG } from "../utilities/SVG";

const VideoBox = ({ info, watchLater, dispatch }) => {
  const [btnState, setBtnState] = useState(false);
  return (
    <div className="videoBox">
      <Link to={"/watch?v=" + info?.id} className="textNone">
        <div className="videoThumb">
          <img
            src={info?.snippet?.thumbnails?.medium?.url}
            className="videoThumbImg"
          />
          <span className="videoCardDuration">
            {info?.contentDetails?.duration &&
              convertDuration(info?.contentDetails?.duration)}
          </span>
        </div>
      </Link>
      <div className="videoBoxDescCont">
        <Link to={"/watch?v=" + info?.id} className="textNone">
          <div className="videoBoxTitle">{info?.snippet?.title}</div>
        </Link>
        <div className="mobSearchVideoBoxDesc">
          <Link to={"/watch?v=" + info?.id} className="textNone">
            <div className="videoBoxTime">
              {calcViews(info?.statistics?.viewCount) +
                " views • " +
                calcTime(info?.snippet?.publishedAt)}
            </div>
          </Link>
          <Link
            to={"/channel/" + info?.snippet?.channelId}
            className="textNone">
            <div className="videoBoxTime boldText">
              {info?.snippet?.channelTitle}
            </div>
          </Link>
        </div>
      </div>
      <div className="wlOptionBtn" onClick={() => setBtnState(!btnState)}>
        <DotsSVG />
      </div>
      {btnState && (
        <div className="homeMenuBox">
          <div
            className="themeBoxMode"
            onClick={() => {
              watchLater?.includes(info?.id)
                ? dispatch(removeVideo(info?.id))
                : dispatch(addVideo(info?.id));
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
  );
};

const WatchLaterPage = () => {
  const [info, setInfo] = useState();

  const fullScreen = window.matchMedia("(min-width: 1200px)");
  const medScreen = window.matchMedia(
    "(min-width: 900px)and (max-width: 1199px)"
  );
  const smScreen = window.matchMedia("(max-width: 899px)");

  const navState = useSelector((store) => store.sidebar.navState);
  const backdropState = useSelector((store) => store.sidebar.backdropState);
  const watchLater = useSelector((store) => store.library.watchLater);
  const dispatch = useDispatch();
  if (fullScreen.matches && backdropState) dispatch(removeBackdrop());

  useEffect(() => {
    if (fullScreen.matches)
      document.getElementById("watchBody").style.marginLeft = navState
        ? "240px"
        : "80px";
  });
  useEffect(() => {
    if (medScreen.matches) {
      dispatch(closeNav());
      document.getElementById("watchBody").style.marginLeft = "80px";
    }
    if (smScreen.matches) {
      document.getElementsByClassName("header")[0].style.position = "sticky";
      document.getElementById("bottomMenu").style.display = "none";
    }
  }, []);
  useEffect(() => {
    const datas = JSON.parse(localStorage.getItem("wlData"));
    let vdoIds = "";
    if (datas) {
      datas.forEach((vdoId) => (vdoIds = vdoIds + vdoId + "%2C"));
      useFetch(
        `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${vdoIds}`
      ).then((data) => {
        // console.log(data?.items);
        setInfo(data?.items);
      });
    }
  }, [watchLater]);

  return (
    <div id="watchBody">
      <div className="searchContainer">
        <div className="wlHeading">
          <span className="wlHeadTitle">Watch later</span>
          {watchLater?.length > 0 && (
            <span
              className="wlHeadClear"
              onClick={() => {
                dispatch(clearData());
              }}>
              Clear all
            </span>
          )}
        </div>
        <div className="wlContainer">
          {watchLater?.length > 0 ? (
            info?.map((data) => {
              return (
                <VideoBox
                  info={data}
                  watchLater={watchLater}
                  dispatch={dispatch}
                  key={data?.id}
                />
              );
            })
          ) : (
            <div className="centerDiv">No videos in Watch later</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WatchLaterPage;
