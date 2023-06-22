import chIcon from "../assets/channelIcon.jpg";
const VideoCards = ({ info }) => {
  // console.log(info);
  const a = info?.statistics?.viewCount;
  const totalViews =
    a > 1000000
      ? Math.round(a / 1000000) + "M"
      : a > 1000
      ? Math.round(a / 1000) + "K"
      : a;
  return (
    <>
      <div className="videoCard">
        <div className="videoBanner">
          <img src={info?.snippet?.thumbnails?.medium?.url} />
        </div>
        <div className="videoDesc">
          <div className="channelIcon">
            <img src={chIcon} />
          </div>
          <div>
            <div className="videoTitle">{info?.snippet?.title}</div>
            <div className="channelName">{info?.snippet?.channelTitle}</div>
            <div className="videoViews">{totalViews} views</div>
            <div className="videoTime"></div>
          </div>
        </div>
      </div>
    </>
  );
};
export default VideoCards;
