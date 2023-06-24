import { calcViews, calcTime } from "../utilities/useMath";
import { LikeSVG, DislikeSVG } from "../utilities/SVG";
const CommentCard = (data) => {
  // console.log(data);
  return (
    <>
      <div className="commentBox">
        <div className="channelDefIcon">
          <img
            src={data?.snippet?.topLevelComment?.snippet?.authorProfileImageUrl}
          />
        </div>
        <div>
          <div style={{ display: "flex" }}>
            <span className="commentTitle">
              {"@" + data?.snippet?.topLevelComment?.snippet?.authorDisplayName}
            </span>
            <span className="commentTime">
              {calcTime(data?.snippet?.topLevelComment?.snippet?.publishedAt)}
            </span>
          </div>
          <div>{data?.snippet?.topLevelComment?.snippet?.textDisplay}</div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className="commentLikes">
              <LikeSVG />
              {calcViews(data?.snippet?.topLevelComment?.snippet?.likeCount)}
              <DislikeSVG />
            </div>
            <div className="replyBtn">Reply</div>
          </div>
          {data?.snippet?.totalReplyCount > 0 && (
            <div className="repliesBtn">
              <svg height="24" width="24" viewBox="0 0 24 24" fill="#065fd4">
                <path d="M18,9l-6,6L6,9H18z"></path>
              </svg>
              {data?.snippet?.totalReplyCount} replies
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default CommentCard;
