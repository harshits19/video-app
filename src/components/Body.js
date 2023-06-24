import { useEffect, useState } from "react";
import HomePage from "./HomePage";
import { useSelector, useDispatch } from "react-redux";
import { openNav } from "../utilities/navSlice";
import useFetch from "../utilities/useFetch";

const FilterBtns = (data) => {
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
        onClick={() => {}}>
        {data?.snippet?.title}
      </label>
    </>
  );
};

const Body = () => {
  const [filterBtnData, setFilterBtnData] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    useFetch(`videoCategories?hl=en&regionCode=IN`).then((data) => {
      setFilterBtnData(data?.items);
    });
    dispatch(openNav());
  }, []);

  const isNavOpen = useSelector((store) => store.navState.isOpen);
  useEffect(() => {
    const mainBody = document.getElementById("mainBody");
    mainBody.style.marginLeft = isNavOpen ? "240px" : "0px";
    const abc = document.querySelectorAll(".videoCard");
    abc.forEach((element) => {
      element.style.width = isNavOpen ? "360px" : "337px";
    });
  });

  return (
    <>
      <div id="mainBody">
        <div className="filtersContainer">
          {filterBtnData?.map((data) => {
            return <FilterBtns {...data} key={data.id} />;
          })}
        </div>
        <HomePage />
      </div>
    </>
  );
};
export default Body;
