import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useFetch from "../utilities/useFetch";
import { calcTime } from "../utilities/useMath";
import ChannelPageShimmer from "./ChannelPageShimmer";
import Spinner from "../utilities/Spinner";

const ChVideoCard = ({ data }) => {
  //   console.log(data);
  return (
    <div className="chVideoCard">
      <div className="chVideoCardThumb">
        <img
          src={data?.snippet?.thumbnails?.medium?.url}
          className="chVideoCardThumbImg"
        />
      </div>
      <div className="chVideoCardDesc">
        <div className="chVideoCardTitle">{data?.snippet?.title}</div>
        <div className="chVideoCardInfo">
          {calcTime(data?.snippet?.publishedAt)}
        </div>
      </div>
    </div>
  );
};

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
            return (
              <Link
                to={"/watch?v=" + item?.snippet?.resourceId?.videoId}
                key={item?.id}
                className="textNone">
                <ChVideoCard data={item} />
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
export default VideoPlaylist;
