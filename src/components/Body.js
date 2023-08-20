import { useEffect, useState } from "react";
import HomePage from "./HomePage";
import { useSelector, useDispatch } from "react-redux";
import { openNav, closePageState } from "../utilities/navSlice";
import useFetch from "../utilities/useFetch";
import { YT_FILTER_DATA } from "../utilities/config";
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
            `search?part=snippet&type=video&maxResults=15&q=${data?.title}`
          ).then((data) => {
            setVideoData(data?.items);
            setPageToken(data?.nextPageToken);
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

  const isNavOpen = useSelector((store) => store.navState.isOpen);
  const mediaQuery = window.matchMedia("(min-width: 1200px)");
  const mediaQueryTwo = window.matchMedia("(min-width: 900px)");
  const mediaQueryThree = window.matchMedia("(max-width: 899px)");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(closePageState());
    if (mediaQuery.matches) dispatch(openNav());
    setFilterBtnData(YT_FILTER_DATA);
    useFetch(
      `videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=15&regionCode=IN`
    ).then((data) => {
      setVideoData(data?.items);
      setPageToken(data?.nextPageToken);
    });
  }, []);

  useEffect(() => {
    if (mediaQueryThree.matches) {
      document.getElementById("bottomMenu").style.display = "flex";
      document.getElementsByClassName("header")[0].style.position = "sticky";
    }
    if (mediaQueryTwo.matches)
      document.getElementById("mainBody").style.marginLeft = "80px";
    if (mediaQuery.matches) {
      document.getElementById("mainBody").style.marginLeft = isNavOpen
        ? "240px"
        : "80px";
      document.querySelectorAll(".videoBannerImg").forEach((element) => {
        element.style.width = isNavOpen ? "400px" : "337px";
        element.style.height = isNavOpen ? "225px" : "200px";
      });
      document.querySelectorAll(".videoCard").forEach((element) => {
        element.style.width = isNavOpen ? "400px" : "337px";
        element.style.height = isNavOpen ? "330px" : "300px";
      });
    }
    const sidebar = document.querySelector(".compactSidebar");
    if (sidebar.classList.contains("csSidebarClose"))
      sidebar.classList.remove("csSidebarClose");
  });

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
      `search?part=snippet&type=video&maxResults=15&q=${currentFilter}&pageToken=${pageToken}`
    ).then((data) => {
      setVideoData((prev) => [...prev, ...data?.items]);
      setPageToken(data?.nextPageToken);
      setisPostsLoading(false);
    });
  };

  return (
    <>
      <div id="mainBody">
        <div className="filtersContainer">
          <input
            type="radio"
            id="all"
            name="select"
            value="all"
            defaultChecked
          />
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
                Load more
              </div>
            </div>
          )}
          {isPostsLoading && <Spinner />}
        </div>
      </div>
    </>
  );
};
export default Body;
