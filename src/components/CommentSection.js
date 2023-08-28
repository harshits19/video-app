import { useState, useEffect } from "react";
import { formatNumber } from "../utilities/useMath";
import { SortSVG } from "../utilities/SVG";
import CommentCard from "./CommentCard";
import useFetch from "../utilities/useFetch";
import Spinner from "../utilities/Spinner";

const CommentSection = ({ videoTitle, videoID, comments }) => {
  const [commentData, setCommentData] = useState([]);
  const [nextPageToken, setNextPageToken] = useState("");
  const [commentState, setCommentState] = useState(true);
  const [isCommentLoading, setIsCommentLoading] = useState(false);
  const [commentType, setCommentType] = useState("relevance");
  const [commentBox, setCommentBox] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 899px)");
    if (mediaQuery.matches) setCommentState(false);
  }, []);

  useEffect(() => {
    useFetch(
      `commentThreads?part=snippet%2Creplies&maxResults=25&order=${commentType}&textFormat=plainText&videoId=${videoID}`
    ).then((data) => {
      setCommentData(data?.items);
      setNextPageToken(data?.nextPageToken);
      // setIsCommentLoading(false);
    });
  }, [videoID, commentType]);

  const loadMoreComments = () => {
    useFetch(
      `commentThreads?part=snippet%2Creplies&maxResults=25&order=${commentType}&textFormat=plainText&videoId=${videoID}&pageToken=${nextPageToken}`
    ).then((data) => {
      setCommentData((prev) => [...prev, ...data?.items]);
      setNextPageToken(data?.nextPageToken);
      setIsCommentLoading(false);
    });
  };

  return (
    <>
      <div
        className="commentToggle"
        onClick={() => setCommentState(!commentState)}>
        comments
        <span>
          <svg height="24" width="24" viewBox="0 0 24 24" className="sortBtn">
            {commentState ? (
              <path d="M18.4 14.6 12 8.3l-6.4 6.3.8.8L12 9.7l5.6 5.7z"></path>
            ) : (
              <path d="m18 9.28-6.35 6.35-6.37-6.35.72-.71 5.64 5.65 5.65-5.65z"></path>
            )}
          </svg>
        </span>
      </div>
      {commentState && (
        <div className="videoCmntSection">
          <div className="commentDetails">
            {formatNumber(comments)}
            <span
              className="sortBtn"
              onClick={() => setCommentBox(!commentBox)}>
              <SortSVG />
              {" Sort by"}
              {commentBox && (
                <div className="commentSortBox">
                  <div
                    className={
                      commentType == "relevance"
                        ? "activeCommentItem commentSortBoxItems"
                        : "commentSortBoxItems"
                    }
                    onClick={() => {
                      setCommentType("relevance");
                      setCommentBox(false);
                    }}>
                    Top comments
                  </div>
                  <div
                    className={
                      commentType == "time"
                        ? "activeCommentItem commentSortBoxItems"
                        : "commentSortBoxItems"
                    }
                    onClick={() => {
                      setCommentType("time");
                      setCommentBox(false);
                    }}>
                    Newest first
                  </div>
                </div>
              )}
            </span>
          </div>
          <div className="commentsContainer">
            {commentData.length > 0 ? (
              commentData?.map((commentData) => {
                return (
                  <CommentCard
                    videoTitle={videoTitle}
                    data={commentData}
                    key={commentData?.id}
                  />
                );
              })
            ) : (
              <div className="centerDiv">No comment on this video</div>
            )}
            {commentData && nextPageToken && !isCommentLoading ? (
              <div className="loadBtnContainer">
                <div
                  onClick={() => {
                    setIsCommentLoading(true);
                    loadMoreComments();
                  }}
                  className="loadMoreBtn">
                  Load more comments
                </div>
              </div>
            ) : (
              <></>
            )}
            {isCommentLoading && <Spinner />}
          </div>
        </div>
      )}
    </>
  );
};
export default CommentSection;
