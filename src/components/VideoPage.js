import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addBackdrop, closeNav, openNav } from "../utilities/navSlice";
import { addVideo, removeVideo } from "../utilities/librarySlice";
import { calcTime, calcViews } from "../utilities/useMath";
import RecVideoSection from "./RecVideoSection";
import CommentSection from "./CommentSection";
import useTitle from "../utilities/useTitle";
import {
  DislikeSVG,
  SaveSVG,
  LikeSVG,
  MenuSVG,
  ShareSVG,
} from "../utilities/SVG";

const ReadMore = ({ children, isReadMore, setIsReadMore }) => {
  const text = children;
  return (
    <p onClick={() => setIsReadMore(false)}>
      {isReadMore ? text?.slice(0, 200) : text}
      <span onClick={() => setIsReadMore(false)} className="readHideBtn">
        {isReadMore ? "...more" : ""}
      </span>
    </p>
  );
};

const VideoPage = () => {
  const apiKey = process.env.REACT_APP_API_KEY;
  const [videoURL] = useSearchParams();
  const videoID = videoURL.get("v");

  const [videoData, setVideoData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [isReadMore, setIsReadMore] = useState(true);

  const smScreen = window.matchMedia("(max-width: 899px)");
  const navState = useSelector((store) => store.sidebar.navState);
  const watchLater = useSelector((store) => store.library.watchLater);
  const dispatch = useDispatch();

  useEffect(() => {
    if (navState) dispatch(closeNav());
    dispatch(addBackdrop());
    const sidebar = document.querySelector(".compactSidebar");
    sidebar.classList.add("csSidebarClose");
    if (smScreen.matches) {
      document.getElementsByClassName("header")[0].style.position = "relative";
      document.getElementById("bottomMenu").style.display = "none";
    }
    return () => {
      dispatch(openNav());
      document
        .querySelector(".compactSidebar")
        .classList.remove("csSidebarClose");
    };
  }, []);

  useEffect(() => {
    fetchVideoData();
  }, [videoURL]);

  const fetchVideoData = async () => {
    const dataVideo = await fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2Cstatistics&id=${videoID}&key=${apiKey}`
    );
    const videoData = await dataVideo.json();
    setVideoData(videoData?.items[0]);
    const channelId = videoData?.items[0]?.snippet?.channelId;
    const dataChannel = await fetch(
      `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2Cstatistics&id=${channelId}&key=${apiKey}`
    );
    const channelData = await dataChannel.json();
    setChannelData(channelData?.items[0]);
  };

  useTitle(videoData?.snippet?.title);

  return (
    <div className="videoPageContainer">
      <div className="videoInnerContainer">
        <iframe
          id="ytplayer"
          type="text/html"
          className="videoFrame"
          src={`https://www.youtube.com/embed/${videoID}?rel=0&modestbranding=1&showinfo=0&autoplay=1`}
          frameBorder="0"
          allowFullScreen
          allow="autoplay"></iframe>
        <div className="videoDescTitle">{videoData?.snippet?.title}</div>
        <div className="videoDescSection">
          <div className="videoInnerDesc">
            <Link
              className="textNone"
              to={"/channel/" + videoData?.snippet?.channelId}>
              <div style={{ display: "flex" }}>
                <div className="channelDefIcon">
                  <img src={channelData?.snippet?.thumbnails?.default?.url} />
                </div>
                <div>
                  <div className="videoChannelTitle">
                    {videoData?.snippet?.channelTitle}
                  </div>
                  <div className="videoChannelSubs">
                    {calcViews(channelData?.statistics?.subscriberCount)}
                    {" subscribers"}
                  </div>
                </div>
              </div>
            </Link>
            <div className="btn subs">Subscribe</div>
          </div>
          <div className="videoDescBtns">
            <div className="videoBtn btn">
              <LikeSVG />
              <span
                style={{
                  paddingRight: "10px",
                  borderRight: "1px solid rgba(0,0,0,0.1)",
                }}>
                {calcViews(videoData?.statistics?.likeCount)}
              </span>
              <DislikeSVG />
            </div>
            <div className="videoBtn btn" id="shareBtn">
              <ShareSVG />
              Share
            </div>
            <div
              className="videoBtn btn"
              id="saveBtn"
              onClick={() => {
                watchLater?.includes(videoData?.id)
                  ? dispatch(removeVideo(videoData?.id))
                  : dispatch(addVideo(videoData?.id));
              }}>
              <SaveSVG />
              {watchLater?.includes(videoData?.id) ? "Unsave" : "Save"}
            </div>
            <div className="videoBtn btn" id="menuBtn">
              <MenuSVG />
            </div>
          </div>
        </div>
        <div className="videoDescriptionBox">
          <div className="infoLine">
            <div>{calcViews(videoData?.statistics?.viewCount)} views</div>
            <div>{calcTime(videoData?.snippet?.publishedAt)}</div>
            <div className="videoTags"></div>
          </div>
          <div>
            <pre className="videoFullDesc">
              <ReadMore
                isReadMore={isReadMore}
                setIsReadMore={setIsReadMore}
                children={videoData?.snippet?.description}
              />
            </pre>
            {!isReadMore && (
              <div
                onClick={() => setIsReadMore(true)}
                className="readHideBtn"
                style={{ paddingTop: "10px" }}>
                Show Less
              </div>
            )}
          </div>
        </div>
        <CommentSection
          videoTitle={videoData?.snippet?.channelTitle}
          videoID={videoID}
          comments={videoData?.statistics?.commentCount}
        />
      </div>
      <RecVideoSection videoID={videoID} title={videoData?.snippet?.title} />
    </div>
  );
};
export default VideoPage;
