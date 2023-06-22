import { useEffect, useState } from "react";
import HomePage from "./HomePage";
import { YT_CATEGORIES } from "../utilities/config";
import { useSelector } from "react-redux";

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
  useEffect(() => {
    fetchCategories();
  }, []);
  const fetchCategories = async () => {
    const data = await fetch(YT_CATEGORIES);
    const json = await data.json();
    setFilterBtnData(json.items);
  };
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
