import { useState, useEffect } from "react";
import CommentCard from "./CommentCard";
import { formatNumber } from "../utilities/useMath";
import useFetch from "../utilities/useFetch";

const CommentSection = ({ videoID, comments }) => {
  const [commentData, setCommentData] = useState([]);
  const [nextPageToken, setNextPageToken] = useState("");
  const [commentState, setCommentState] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    if (mediaQuery.matches) setCommentState(false);
  }, []);

  useEffect(() => {
    useFetch(
      `commentThreads?part=snippet%2Creplies&maxResults=50&order=relevance&textFormat=plainText&videoId=${videoID}`
    ).then((data) => {
      setCommentData(data?.items);
      setNextPageToken(data?.nextPageToken);
    });
  }, [videoID]);

  const loadMoreComments = () => {
    useFetch(
      `commentThreads?part=snippet%2Creplies&maxResults=50&order=relevance&textFormat=plainText&videoId=${videoID}&pageToken=${nextPageToken}`
    ).then((data) => {
      setCommentData((prev) => [...prev, ...data?.items]);
      setNextPageToken(data?.nextPageToken);
    });
  };
  return (
    <>
      <div
        className="commentToggle"
        onClick={() => setCommentState(!commentState)}>
        comments
        <span>
          <svg height="24" width="24" viewBox="0 0 24 24" fill="#000000">
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
            <span className="sortBtn">
              <svg height="24" width="24" viewBox="0 2 22 22">
                <path d="M21,6H3V5h18V6z M15,11H3v1h12V11z M9,17H3v1h6V17z"></path>
              </svg>
              {" Sort by"}
            </span>
          </div>
          <div className="commentsContainer">
            {commentData?.map((commentData) => {
              return <CommentCard {...commentData} key={commentData?.id} />;
            })}
            {nextPageToken ? (
              <div onClick={() => loadMoreComments()} className="loadMoreBtn">
                Load more comments
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default CommentSection;
