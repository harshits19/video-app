import { useState, useEffect } from "react";
import SideBarCards from "./SideBarCards";
import { Link } from "react-router-dom";
import useFetch from "../utilities/useFetch";

const RecVideoSection = () => {
  const [reccVideoData, setReccVideoData] = useState(null);

  useEffect(() => {
    useFetch(
      `videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=30&regionCode=IN`
    ).then((data) => {
      setReccVideoData(data?.items);
    });
  }, []);

  return (
    <div className="recommendedSection">
      {reccVideoData?.map((reccVideoData) => {
        return (
          <Link
            to={"?v=" + reccVideoData?.id}
            key={reccVideoData?.id}
            className="textNone">
            <SideBarCards {...reccVideoData} />
          </Link>
        );
      })}
    </div>
  );
};
export default RecVideoSection;
