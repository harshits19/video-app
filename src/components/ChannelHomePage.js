import { useState, useEffect, useContext } from "react";
import { ChannelContext } from "../utilities/contexts";
import useFetch from "../utilities/useFetch";
import { Link } from "react-router-dom";
import Spinner from "../utilities/Spinner";
import ChannelPageShimmer from "./ChannelPageShimmer";
import ChannelVideoCard from "./ChannelVideoCard";

const ChannelHomePage = () => {
  const dataSet = useContext(ChannelContext);
  const playlistId = dataSet?.playlistId;
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
            return (
              <Link
                to={"/watch?v=" + item?.snippet?.resourceId?.videoId}
                key={item?.id}
                className="textNone">
                <ChannelVideoCard data={item} />
              </Link>
            );
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
export default ChannelHomePage;
