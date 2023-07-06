import VideoCards from "./VideoCards";
import { Link } from "react-router-dom";
import HomePageShimmer from "./HomePageShimmer";

const HomePage = ({ videoData }) => {
  return (
    <>
      <div className="videoCardContainer">
        <div className="videoCardInnerContainer">
          {videoData ? (
            videoData?.map((data, idx) => {
              return (
                <Link
                  to={
                    data.id.videoId
                      ? "/watch?v=" + data?.id?.videoId
                      : "/watch?v=" + data?.id
                  }
                  key={idx}
                  className="textNone">
                  <VideoCards info={data} />
                </Link>
              );
            })
          ) : (
            <HomePageShimmer />
          )}
        </div>
      </div>
    </>
  );
};
export default HomePage;
