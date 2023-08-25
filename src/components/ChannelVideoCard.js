import { useState, useEffect } from "react";
import { calcTime, calcViews, convertDuration } from "../utilities/useMath";
import useFetch from "../utilities/useFetch";
const ChannelVideoCard = ({ data }) => {
  const [vdoData, setVdoData] = useState(null);
  //   console.log(data);
  useEffect(() => {
    useFetch(
      `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${data?.snippet?.resourceId?.videoId}`
    ).then((data) => {
      setVdoData(data?.items[0]);
      console.log(data);
    });
  }, []);

  return (
    <div className="chVideoCard">
      <div className="chVideoCardThumb">
        <img
          src={data?.snippet?.thumbnails?.medium?.url}
          className="chVideoCardThumbImg"
        />
        <span className="videoCardDuration">
          {vdoData?.contentDetails?.duration &&
            convertDuration(vdoData?.contentDetails?.duration)}
        </span>
      </div>
      <div className="chVideoCardDesc">
        <div className="chVideoCardTitle">{data?.snippet?.title}</div>
        <div className="sidebarChannel">{data?.snippet?.channelTitle}</div>
        <div className="chVideoCardInfo">
          {vdoData?.statistics?.viewCount &&
            calcViews(vdoData?.statistics?.viewCount) + " views  •  "}
          {data?.snippet?.publishedAt && calcTime(data?.snippet?.publishedAt)}
        </div>
      </div>
    </div>
  );
};

export default ChannelVideoCard;
