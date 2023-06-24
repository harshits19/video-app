import { useState, useEffect } from "react";
import VideoCards from "./VideoCards";
import useFetch from "../utilities/useFetch";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [videoData, setVideoData] = useState(null);
  useEffect(() => {
    useFetch(
      `videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=30&regionCode=IN`
    ).then((data) => {
      setVideoData(data?.items);
    });
  }, []);
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
