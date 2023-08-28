import VideoCards from "./VideoCards";
import HomePageShimmer from "./HomePageShimmer";

const HomePage = ({ videoData }) => {
  // console.log(videoData);
  return (
    <div className="videoCardInnerContainer">
      {videoData ? (
        videoData?.map((data) => {
          return (
            <VideoCards
              info={data}
              key={data?.id?.videoId ? data?.id?.videoId : data?.id}
            />
          );
        })
      ) : (
        <HomePageShimmer />
      )}
    </div>
  );
};
export default HomePage;
