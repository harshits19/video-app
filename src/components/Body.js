import { useEffect, useState } from "react";
import HomePage from "./HomePage";
import { useSelector, useDispatch } from "react-redux";
import { openNav } from "../utilities/navSlice";
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
            `search?part=snippet&type=video&maxResults=30&q=${data?.snippet?.title}`
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
    useFetch(`videoCategories?hl=en&regionCode=IN`).then((data) => {
      setFilterBtnData(data?.items);
    });
    dispatch(openNav());
    useFetch(
      `videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=30&regionCode=IN`
    ).then((data) => {
      setVideoData(data?.items);
    });
  }, []);

  const isNavOpen = useSelector((store) => store.navState.isOpen);
  const mediaQuery = window.matchMedia("(min-width: 768px)");
  useEffect(() => {
    if (mediaQuery.matches) {
      const mainBody = document.getElementById("mainBody");
      mainBody.style.marginLeft = isNavOpen ? "240px" : "0px";
      const abc = document.querySelectorAll(".videoCard");
      abc.forEach((element) => {
        element.style.width = isNavOpen ? "360px" : "337px";
      });
    }
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
                `videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=30&regionCode=IN`
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
