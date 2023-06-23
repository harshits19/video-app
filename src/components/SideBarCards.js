import { calcViews, calcTime, convertDuration } from "../utilities/useMath";
const SideBarCards = (data) => {
  //   console.log(data);
  return (
    <>
      <div className="sideBarCards">
        <div style={{ position: "relative" }}>
          <img
            src={data?.snippet?.thumbnails?.medium?.url}
            className="sidebarImg"
          />
          <span className="videoCardDuration" style={{ margin: "6px 12px" }}>
            {convertDuration(data?.contentDetails?.duration)}
          </span>
        </div>
        <div className="sidebarDesc">
          <div className="sidebarTitle">{data?.snippet?.title}</div>
          <div className="sidebarChannel">{data?.snippet?.channelTitle}</div>
          <div className="sidebarInfo sidebarChannel">
            {calcViews(data?.statistics?.viewCount)} {" views  •  "}
            {calcTime(data?.snippet?.publishedAt)}
          </div>
        </div>
      </div>
    </>
  );
};
export default SideBarCards;
