import { useEffect, useState } from "react";
import HomePage from "./HomePage";
import { useSelector, useDispatch } from "react-redux";
import { openNav, closePageState } from "../utilities/navSlice";
import useFetch from "../utilities/useFetch";

const FilterBtns = ({ data, setVideoData }) => {
  return (
    <>
      <input
        type="radio"
        id={data?.snippet?.title}
        name="select"
        value={data?.id}
      />
      <label
        htmlFor={data?.snippet?.title}
        className="btnLabel"
        onClick={() => {
          useFetch(
            `search?part=snippet&type=video&maxResults=15&q=${data?.snippet?.title}`
          ).then((data) => {
            setVideoData(data?.items);
          });
        }}>
        {data?.snippet?.title}
      </label>
    </>
  );
};

const Body = () => {
  const [filterBtnData, setFilterBtnData] = useState(null);
  const [videoData, setVideoData] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(openNav());
    dispatch(closePageState());

    useFetch(`videoCategories?hl=en&regionCode=IN`).then((data) => {
      setFilterBtnData(data?.items);
    });

    useFetch(
      `videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=15&regionCode=IN`
    ).then((data) => {
      setVideoData(data?.items);
    });
  }, []);

  const isNavOpen = useSelector((store) => store.navState.isOpen);
  const mediaQuery = window.matchMedia("(min-width: 1200px)");
  const mediaQueryTwo = window.matchMedia("(min-width: 900px)");
  const mediaQueryThree = window.matchMedia("(max-width: 899px)");

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
            }}>
            All
          </label>
          {filterBtnData?.map((data) => {
            return (
              <FilterBtns
                data={data}
                setVideoData={setVideoData}
                key={data.id}
              />
            );
          })}
        </div>
        <HomePage videoData={videoData} />
      </div>
    </>
  );
};
export default Body;
