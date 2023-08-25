import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SideBarCards from "./SideBarCards";
import useFetch from "../utilities/useFetch";
import ReccSectionShimmer from "./ReccSectionShimmer";
/* 
      `search?part=snippet&type=video&maxResults=25&relatedToVideoId=${videoID}`
      `search?part=snippet&type=video&maxResults=10&q=${data}`
*/

const RecVideoSection = ({ videoID, title }) => {
  const [reccVideoData, setReccVideoData] = useState(null);
  useEffect(() => {
    if (title)
      useFetch(
        `search?part=snippet&type=video&maxResults=10&videoDuration=medium&q=${title.slice(
          0,
          40
        )}`
      ).then((dataSet) => {
        setReccVideoData(dataSet?.items);
      });
  }, [title]);

  return (
    <div className="recommendedSection">
      {reccVideoData ? (
        reccVideoData?.map((reccVideoData) => {
          return (
            <Link
              to={"?v=" + reccVideoData?.id?.videoId}
              key={reccVideoData?.id?.videoId}
              className="textNone">
              <SideBarCards {...reccVideoData} />
            </Link>
          );
        })
      ) : (
        <ReccSectionShimmer />
      )}
    </div>
  );
};
export default RecVideoSection;
