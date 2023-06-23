import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { closeNav } from "../utilities/navSlice";
import { Link, useSearchParams } from "react-router-dom";
import { calcTime, calcViews, formatNumber } from "../utilities/useMath";
import CommentCard from "./CommentCard";
import { YT_HOMEPAGE } from "../utilities/config";
import SideBarCards from "./SideBarCards";

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
        {isReadMore ? "...Show more" : " Show less"}
      </span>
    </p>
  );
};
const VideoPage = () => {
  const [videoData, setVideoData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [commentData, setCommentData] = useState(null);
  const [reccVideoData, setReccVideoData] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(closeNav());
  }, []);
  const [videoURL] = useSearchParams();
  const videoID = videoURL.get("v");
  useEffect(() => {
    fetchVideoData();
  }, [videoURL]);
  const apiKey = process.env.REACT_APP_API_KEY;

  const fetchVideoData = async () => {
    const dataVideo = await fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoID}&key=${apiKey}`
    );
    const videoData = await dataVideo.json();
    setVideoData(videoData?.items[0]);
    const channelId = videoData?.items[0].snippet.channelId;
    const dataChannel = await fetch(
      `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&key=${apiKey}`
    );
    const channelData = await dataChannel.json();
    setChannelData(channelData?.items[0]);
    const dataComment =
      await fetch(`https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&order=relevance&textFormat=html&videoId=${videoID}&key=${apiKey}
    `);
    const commentData = await dataComment.json();
    setCommentData(commentData?.items);

    const recommendVideo = await fetch(YT_HOMEPAGE);
    const reccVideoData = await recommendVideo.json();
    setReccVideoData(reccVideoData?.items);
    // console.log(reccVideoData?.items);
  };

  return (
    <>
      <div className="videoPageContainer">
        <div className="videoInnerContainer">
          <iframe
            id="ytplayer"
            type="text/html"
            width="885"
            height="498"
            src={`https://www.youtube.com/embed/${videoID}?rel=0&modestbranding=1&showinfo=0&autoplay=1`}
            frameBorder="0"
            allowFullScreen
            allow="autoplay"></iframe>
          <div className="videoDescTitle">{videoData?.snippet?.title}</div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ display: "flex", columnGap: "30px" }}>
              <div style={{ display: "flex" }}>
                <div className="channelDefIcon">
                  <img src={channelData?.snippet?.thumbnails?.default?.url} />
                </div>
                <div>
                  <div className="videoChannelTitle">
                    {videoData?.snippet?.channelTitle}
                  </div>
                  <div className="videoChannelSubs">
                    {calcViews(channelData?.statistics?.subscriberCount)}{" "}
                    subscribers
                  </div>
                </div>
              </div>
              <div className="btn subs">Subscribe</div>
            </div>
            <div style={{ display: "flex", columnGap: "10px" }}>
              <div className="videoBtn btn">
                <svg
                  height="24"
                  width="24"
                  viewBox="0 0 24 24"
                  style={{ marginRight: "10px" }}>
                  <path d="M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11H3v10h4h1h9.43 c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z M7,20H4v-8h3V20z M19.98,13.17l-1.34,6 C18.54,19.65,18.03,20,17.43,20H8v-8.61l5.6-6.06C13.79,5.12,14.08,5,14.38,5c0.26,0,0.5,0.11,0.63,0.3 c0.07,0.1,0.15,0.26,0.09,0.47l-1.52,4.94L13.18,12h1.35h4.23c0.41,0,0.8,0.17,1.03,0.46C19.92,12.61,20.05,12.86,19.98,13.17z"></path>
                </svg>
                <span
                  style={{
                    paddingRight: "10px",
                    borderRight: "1px solid rgba(0,0,0,0.1)",
                  }}>
                  {calcViews(videoData?.statistics?.likeCount)}
                </span>
                <svg
                  height="24"
                  width="24"
                  viewBox="0 0 24 24"
                  style={{ marginLeft: "10px" }}>
                  <path d="M17,4h-1H6.57C5.5,4,4.59,4.67,4.38,5.61l-1.34,6C2.77,12.85,3.82,14,5.23,14h4.23l-1.52,4.94C7.62,19.97,8.46,21,9.62,21 c0.58,0,1.14-0.24,1.52-0.65L17,14h4V4H17z M10.4,19.67C10.21,19.88,9.92,20,9.62,20c-0.26,0-0.5-0.11-0.63-0.3 c-0.07-0.1-0.15-0.26-0.09-0.47l1.52-4.94l0.4-1.29H9.46H5.23c-0.41,0-0.8-0.17-1.03-0.46c-0.12-0.15-0.25-0.4-0.18-0.72l1.34-6 C5.46,5.35,5.97,5,6.57,5H16v8.61L10.4,19.67z M20,13h-3V5h3V13z"></path>
                </svg>
              </div>
              <div className="videoBtn btn">
                <svg height="24" width="24" viewBox="0 0 24 24">
                  <path d="M15,5.63L20.66,12L15,18.37V15v-1h-1c-3.96,0-7.14,1-9.75,3.09c1.84-4.07,5.11-6.4,9.89-7.1L15,9.86V9V5.63 M14,3v6 C6.22,10.13,3.11,15.33,2,21c2.78-3.97,6.44-6,12-6v6l8-9L14,3L14,3z"></path>
                </svg>
                Share
              </div>
              <div className="videoBtn btn">
                <svg height="24" width="24" viewBox="0 0 24 24">
                  <path d="M17 18V19H6V18H17ZM16.5 11.4L15.8 10.7L12 14.4V4H11V14.4L7.2 10.6L6.5 11.3L11.5 16.3L16.5 11.4Z"></path>
                </svg>
                Download
              </div>
              <div className="videoBtn btn" style={{ padding: "0px 6px" }}>
                <svg height="24" width="24" viewBox="0 0 24 24">
                  <path d="M7.5,12c0,0.83-0.67,1.5-1.5,1.5S4.5,12.83,4.5,12s0.67-1.5,1.5-1.5S7.5,11.17,7.5,12z M12,10.5c-0.83,0-1.5,0.67-1.5,1.5 s0.67,1.5,1.5,1.5s1.5-0.67,1.5-1.5S12.83,10.5,12,10.5z M18,10.5c-0.83,0-1.5,0.67-1.5,1.5s0.67,1.5,1.5,1.5s1.5-0.67,1.5-1.5 S18.83,10.5,18,10.5z"></path>
                </svg>
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
          <div className="videoCmntSection">
            <div className="commentDetails">
              {formatNumber(videoData?.statistics?.commentCount)}
              <span className="sortBtn">
                <svg height="24" width="24" viewBox="0 2 22 22">
                  <path d="M21,6H3V5h18V6z M15,11H3v1h12V11z M9,17H3v1h6V17z"></path>
                </svg>{" "}
                Sort by
              </span>
            </div>
            <div className="commentsContainer">
              {commentData?.map((commentData) => {
                return <CommentCard {...commentData} key={commentData?.id} />;
              })}
            </div>
          </div>
        </div>
        <div className="recommendedSection">
          {reccVideoData?.map((reccVideoData) => {
            return (
              <Link
                to={"?v=" + reccVideoData?.id}
                key={reccVideoData?.id}
                className="textNone">
                <SideBarCards {...reccVideoData} />
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default VideoPage;
