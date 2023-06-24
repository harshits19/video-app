import { useState, useEffect } from "react";
import CommentCard from "./CommentCard";
import { formatNumber } from "../utilities/useMath";
import useFetch from "../utilities/useFetch";

const CommentSection = ({ videoID, views }) => {
  const [commentData, setCommentData] = useState(null);

  useEffect(() => {
    useFetch(
      `commentThreads?part=snippet&maxResults=50&order=relevance&textFormat=html&videoId=${videoID}`
    ).then((data) => {
      setCommentData(data?.items);
    });
  }, [videoID]);

  return (
    <div className="videoCmntSection">
      <div className="commentDetails">
        {formatNumber(views)}
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
      </div>
    </div>
  );
};
export default CommentSection;
