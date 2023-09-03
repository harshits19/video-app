import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addBackdrop, closeNav, removeBackdrop } from "../utilities/navSlice";
import useFetch from "../utilities/useFetch";
import { YT_FILTER_DATA } from "../utilities/config";
import HomePage from "./HomePage";
import Spinner from "../utilities/Spinner";

const FilterBtns = ({
  data,
  setVideoData,
  setIsFilterActive,
  setPageToken,
  setCurrentFilter,
}) => {
  return (
    <>
      <input type="radio" id={data?.title} name="select" value={data?.id} />
      <label
        htmlFor={data?.title}
        className="btnLabel"
        onClick={() => {
          setVideoData();
          setCurrentFilter(data?.title);
          useFetch(
            `search?part=snippet&type=video&maxResults=15&q=${data?.title}&videoDuration=medium&regionCode=IN`
          ).then((data) => {
            setVideoData(data?.items);
            setPageToken(data?.nextPageToken);
            // console.log(data?.items);
          });
          setIsFilterActive(true);
        }}>
        {data?.title}
      </label>
    </>
  );
};

const Body = () => {
  const [filterBtnData, setFilterBtnData] = useState(null);
  const [videoData, setVideoData] = useState(null);
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [isPostsLoading, setisPostsLoading] = useState(false);
  const [pageToken, setPageToken] = useState("");
  const [currentFilter, setCurrentFilter] = useState("");

  const fullScreen = window.matchMedia("(min-width: 1200px)");
  const medScreen = window.matchMedia(
    "(min-width: 900px) and (max-width: 1199px)"
  );
  const smScreen = window.matchMedia("(max-width: 899px)");

  const navState = useSelector((store) => store.sidebar.navState);
  const backdropState = useSelector((store) => store.sidebar.backdropState);
  const dispatch = useDispatch();
  if (fullScreen.matches && backdropState) dispatch(removeBackdrop());

  useEffect(() => {
    if (fullScreen.matches)
      document.getElementById("mainBody").style.marginLeft = navState
        ? "240px"
        : "80px";
    if (medScreen.matches) {
      dispatch(closeNav());
      dispatch(addBackdrop());
      document.getElementById("mainBody").style.marginLeft = "80px";
    }
    if (smScreen.matches) {
      document.getElementsByClassName("header")[0].style.position = "sticky";
      document.getElementById("bottomMenu").style.display = "flex";
    }
  });

  useEffect(() => {
    const sidebar = document.querySelector(".compactSidebar");
    if (sidebar.classList.contains("csSidebarClose"))
      sidebar.classList.remove("csSidebarClose");

    setFilterBtnData(YT_FILTER_DATA);
    useFetch(
      `videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=15&regionCode=IN`
    ).then((data) => {
      setVideoData(data?.items);
      setPageToken(data?.nextPageToken);
    });
  }, []);

  const fetchPopularVideos = () => {
    useFetch(
      `videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=15&regionCode=IN&pageToken=${pageToken}`
    ).then((data) => {
      setVideoData((prev) => [...prev, ...data?.items]);
      setPageToken(data?.nextPageToken);
      setisPostsLoading(false);
    });
  };
  const fetchFilteredVideos = () => {
    useFetch(
      `search?part=snippet&type=video&maxResults=15&q=${currentFilter}&pageToken=${pageToken}&videoDuration=medium`
    ).then((data) => {
      setVideoData((prev) => [...prev, ...data?.items]);
      setPageToken(data?.nextPageToken);
      setisPostsLoading(false);
    });
  };

  return (
    <div id="mainBody">
      <div className="filtersContainer">
        <input type="radio" id="all" name="select" value="all" defaultChecked />
        <label
          htmlFor="all"
          className="btnLabel"
          onClick={() => {
            useFetch(
              `videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=15&regionCode=IN`
            ).then((data) => {
              setVideoData(data?.items);
            });
            setIsFilterActive(false);
          }}>
          All
        </label>
        {filterBtnData?.map((data) => {
          return (
            <FilterBtns
              data={data}
              key={data.id}
              setVideoData={setVideoData}
              setIsFilterActive={setIsFilterActive}
              setPageToken={setPageToken}
              setCurrentFilter={setCurrentFilter}
            />
          );
        })}
      </div>
      <div className="videoCardContainer">
        <HomePage videoData={videoData} />
        {!isPostsLoading && pageToken && (
          <div className="loadBtnContainer">
            <div
              onClick={() => {
                setisPostsLoading(true);
                isFilterActive ? fetchFilteredVideos() : fetchPopularVideos();
              }}
              className="loadMoreBtn">
              Load more videos
            </div>
          </div>
        )}
        {isPostsLoading && <Spinner />}
      </div>
    </div>
  );
};
export default Body;
