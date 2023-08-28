import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../utilities/useFetch";
import ChannelPageShimmer from "./ChannelPageShimmer";
import Spinner from "../utilities/Spinner";
import ChannelVideoCard from "./ChannelVideoCard";

const VideoPlaylist = () => {
  const { playlistId } = useParams();
  const [data, setData] = useState();
  const [nextPageToken, setNextPageToken] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    useFetch(
      `playlistItems?part=snippet&maxResults=15&playlistId=${playlistId}`
    ).then((data) => {
      // console.log(data?.items);
      setData(data?.items);
      setNextPageToken(data?.nextPageToken);
    });
  }, [playlistId]);

  const fetchNextVideos = () => {
    useFetch(
      `playlistItems?part=snippet&maxResults=15&playlistId=${playlistId}&pageToken=${nextPageToken}`
    ).then((data) => {
      setNextPageToken(data?.nextPageToken);
      setData((prev) => [...prev, ...data?.items]);
      setIsLoading(false);
    });
  };

  return (
    <div>
      <div className="chHomeContainer">
        {data ? (
          data?.map((item) => {
            return <ChannelVideoCard data={item} key={item?.id} />;
          })
        ) : (
          <ChannelPageShimmer />
        )}
      </div>
      {!isLoading && nextPageToken && (
        <div className="loadBtnContainer">
          <div
            onClick={() => {
              setIsLoading(true);
              fetchNextVideos();
            }}
            className="loadMoreBtn">
            Load more videos
          </div>
        </div>
      )}
      {isLoading && <Spinner />}
    </div>
  );
};
export default VideoPlaylist;
