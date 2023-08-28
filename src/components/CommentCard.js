import { useState } from "react";
import { calcViews, calcTime } from "../utilities/useMath";
import { LikeSVG, DislikeSVG } from "../utilities/SVG";

const CommentCard = ({ videoTitle, data }) => {
  const [isHiddenReply, setIsHiddenReply] = useState(false);
  return (
    <div className="commentBox">
      <div className="channelDefIcon">
        {
          <img
            src={
              data?.snippet?.topLevelComment?.snippet?.authorProfileImageUrl ||
              data?.snippet?.authorProfileImageUrl
            }
            alt=""
          />
        }
      </div>
      <div>
        <div style={{ display: "flex" }}>
          <span
            className={
              videoTitle ==
              (data?.snippet?.topLevelComment?.snippet?.authorDisplayName ||
                data?.snippet?.authorDisplayName)
                ? "commentAuthor commentTitle"
                : "commentTitle"
            }>
            {"@"}
            {data?.snippet?.topLevelComment?.snippet?.authorDisplayName ||
              data?.snippet?.authorDisplayName}
          </span>
          <span className="commentTime">
            {calcTime(
              data?.snippet?.topLevelComment?.snippet?.publishedAt ||
                data?.snippet?.publishedAt
            )}
          </span>
        </div>
        <div>
          <pre className="videoFullDesc">
            {data?.snippet?.topLevelComment?.snippet?.textDisplay ||
              data?.snippet?.textDisplay}
          </pre>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className="commentLikes">
            <LikeSVG />
            {calcViews(
              data?.snippet?.topLevelComment?.snippet?.likeCount ||
                data?.snippet?.likeCount
            )}
            <DislikeSVG />
          </div>
          <div className="replyBtn">Reply</div>
        </div>
        {data?.snippet?.totalReplyCount > 0 && (
          <div
            className="repliesBtn"
            onClick={() => {
              setIsHiddenReply(!isHiddenReply);
            }}>
            <svg height="24" width="24" viewBox="0 0 24 24">
              {isHiddenReply ? (
                <path d="M18.4 14.6 12 8.3l-6.4 6.3.8.8L12 9.7l5.6 5.7z"></path>
              ) : (
                <path d="m18 9.28-6.35 6.35-6.37-6.35.72-.71 5.64 5.65 5.65-5.65z"></path>
              )}
            </svg>
            {data?.snippet?.totalReplyCount > 1
              ? data?.snippet?.totalReplyCount + " replies"
              : data?.snippet?.totalReplyCount + " reply"}
          </div>
        )}
        {data?.replies &&
          isHiddenReply &&
          data?.replies?.comments.map((commentdata) => {
            return (
              <CommentCard
                videoTitle={videoTitle}
                data={commentdata}
                key={commentdata?.id}
              />
            );
          })}
      </div>
    </div>
  );
};
export default CommentCard;
