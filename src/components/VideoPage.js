import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeNav, openPageState } from "../utilities/navSlice";
import { useSearchParams } from "react-router-dom";
import { calcTime, calcViews } from "../utilities/useMath";
import RecVideoSection from "./RecVideoSection";
import CommentSection from "./CommentSection";
import {
  DislikeSVG,
  DownloadSVG,
  LikeSVG,
  MenuSVG,
  ShareSVG,
} from "../utilities/SVG";

const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p>
      {isReadMore ? text?.slice(0, 200) : text}
      <span onClick={toggleReadMore} className="readHideBtn">
        {isReadMore ? "...more" : " Show less"}
      </span>
    </p>
  );
};

const VideoPage = () => {
  const [videoData, setVideoData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const apiKey = process.env.REACT_APP_API_KEY;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(closeNav());
    dispatch(openPageState());

    const sidebar = document.querySelector(".compactSidebar");
    sidebar.classList.add("csSidebarClose");

    const mediaQuery = window.matchMedia("(max-width: 769px)");
    if (mediaQuery.matches) {
      document.getElementById("bottomMenu").style.display = "none";
      document.getElementsByClassName("header")[0].style.position = "relative";
    }
  }, []);

  const [videoURL] = useSearchParams();
  const videoID = videoURL.get("v");

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

  return (
    <>
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
              <div className="videoBtn btn">
                <ShareSVG />
                Share
              </div>
              <div className="videoBtn btn" id="downBtn">
                <DownloadSVG />
                Download
              </div>
              <div
                className="videoBtn btn"
                style={{ padding: "0px 6px" }}
                id="menuBtn">
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
                <ReadMore>{videoData?.snippet?.description}</ReadMore>
              </pre>
            </div>
          </div>
          <CommentSection
            videoID={videoID}
            comments={videoData?.statistics?.commentCount}
          />
        </div>
        <RecVideoSection videoID={videoID} />
      </div>
    </>
  );
};
export default VideoPage;
