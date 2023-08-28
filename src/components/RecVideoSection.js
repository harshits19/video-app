import { useState, useEffect } from "react";
import useFetch from "../utilities/useFetch";
import SideBarCards from "./SideBarCards";
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
            <SideBarCards {...reccVideoData} key={reccVideoData?.id?.videoId} />
          );
        })
      ) : (
        <ReccSectionShimmer />
      )}
    </div>
  );
};
export default RecVideoSection;
