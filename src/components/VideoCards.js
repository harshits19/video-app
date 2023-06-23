import chIcon from "../assets/channelIcon.jpg";
import { calcTime, calcViews, convertDuration } from "../utilities/useMath";
const VideoCards = ({ info }) => {
  return (
    <>
      <div className="videoCard">
        <div className="videoBanner">
          <img src={info?.snippet?.thumbnails?.medium?.url} />
          <span className="videoCardDuration">
            {convertDuration(info?.contentDetails?.duration)}
          </span>
        </div>
        <div className="videoDesc">
          <div className="channelIcon">
            <img src={chIcon} />
          </div>
          <div>
            <div className="videoTitle">{info?.snippet?.title}</div>
            <div className="channelName">{info?.snippet?.channelTitle}</div>
            <div className="videoViews">
              {calcViews(info?.statistics?.viewCount) +
                " views  •  " +
                calcTime(info?.snippet?.publishedAt)}
            </div>
            <div className="videoTime"></div>
          </div>
        </div>
      </div>
    </>
  );
};
export default VideoCards;
