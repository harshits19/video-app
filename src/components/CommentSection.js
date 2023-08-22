import { useState, useEffect } from "react";
import CommentCard from "./CommentCard";
import { formatNumber } from "../utilities/useMath";
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
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    if (mediaQuery.matches) setCommentState(false);
  }, []);

  useEffect(() => {
    // setIsCommentLoading(true);
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
              <svg height="24" width="24" viewBox="0 2 22 22">
                <path d="M21,6H3V5h18V6z M15,11H3v1h12V11z M9,17H3v1h6V17z"></path>
              </svg>
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
                      // commentType == "time" ? setCommentData() : null;
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
                      // commentType == "relevance" ? setCommentData() : null;
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
            {commentData ? (
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
              <Spinner />
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
