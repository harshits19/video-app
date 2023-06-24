import { useState, useEffect } from "react";
import VideoCards from "./VideoCards";
import { YT_HOMEPAGE } from "../utilities/config";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [videoData, setVideoData] = useState(null);
  useEffect(() => {
    fetchVideos();
  }, []);
  const fetchVideos = async () => {
    const data = await fetch(YT_HOMEPAGE);
    const json = await data.json();
    setVideoData(json.items);
    // console.log(json);
  };
  return (
    <>
      <div className="videoCardContainer">
        <div className="videoCardInnerContainer">
          {videoData?.map((data) => {
            return (
              <Link
                to={"/watch?v=" + data?.id}
                key={data?.id}
                className="textNone">
                <VideoCards info={data} />
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default HomePage;
