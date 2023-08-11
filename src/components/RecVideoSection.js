import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SideBarCards from "./SideBarCards";
import useFetch from "../utilities/useFetch";
/* 
      `search?part=snippet&type=video&maxResults=25&relatedToVideoId=${videoID}`
*/
const RecVideoSection = ({ videoID, data }) => {
  const [reccVideoData, setReccVideoData] = useState(null);
  useEffect(() => {
    useFetch(
      `search?part=snippet&type=video&maxResults=25&q=${data?.snippet?.title}`
    ).then((data) => {
      setReccVideoData(data?.items);
      // console.log(data);
    });
  }, [data]);

  return (
    <div className="recommendedSection">
      {reccVideoData?.map((reccVideoData) => {
        return (
          <Link
            to={"?v=" + reccVideoData?.id?.videoId}
            key={reccVideoData?.id?.videoId}
            className="textNone">
            <SideBarCards {...reccVideoData} />
          </Link>
        );
      })}
    </div>
  );
};
export default RecVideoSection;
