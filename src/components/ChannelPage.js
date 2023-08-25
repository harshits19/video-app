import { useParams, NavLink, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useFetch from "../utilities/useFetch";
import { useDispatch } from "react-redux";
import { openPageState, closeNav } from "../utilities/navSlice";
import { calcViews } from "../utilities/useMath";
import { ChannelContext } from "../utilities/contexts";
import useTitle from "../utilities/useTitle";

const ChannelPage = () => {
  const { channelId } = useParams();
  const [channelData, setChannelData] = useState([]);
  const [dataSet, setDataSet] = useState();
  const mediaQuery = window.matchMedia("(min-width: 900px)");
  const mediaQueryTwo = window.matchMedia("(min-width: 1200px)");
  const mediaQueryThree = window.matchMedia("(max-width: 899px)");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(closeNav());
    useFetch(
      `channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}`
    ).then((data) => {
      // console.log(data);
      setChannelData(data?.items[0]);
      setDataSet({
        playlistId: data?.items[0]?.contentDetails?.relatedPlaylists?.uploads,
        channelId: data?.items[0]?.id,
        chDescription: data?.items[0]?.snippet?.description,
        chViews: data?.items[0]?.statistics?.viewCount,
        chDate: data?.items[0]?.snippet?.publishedAt,
      });
    });
  }, []);
  useEffect(() => {
    if (mediaQuery.matches)
      document.getElementById("channelBody").style.marginLeft = "80px";
    if (mediaQueryTwo.matches) dispatch(openPageState());
    if (mediaQueryThree.matches)
      document.getElementById("bottomMenu").style.display = "none";
  });
  useTitle(channelData?.snippet?.title);
  return (
    <div id="channelBody">
      <div className="chPageContainer">
        <div className="channelDescSection">
          <div className="channelThumbIcon">
            {channelData?.snippet?.thumbnails?.medium?.url && (
              <img
                className="channelThumbIcon"
                src={channelData?.snippet?.thumbnails?.medium?.url}
              />
            )}
          </div>
          <div className="channelInfoContainer">
            <div className="channelDescTitle">
              {channelData?.snippet?.title}
            </div>
            <div className="channelDescInfo">
              <span>{channelData?.snippet?.customUrl}</span>
              <span>
                {calcViews(channelData?.statistics?.subscriberCount) +
                  " subscribers"}
              </span>
              <span>
                {calcViews(channelData?.statistics?.videoCount) + " videos"}
              </span>
            </div>
            <div className="channelDescription">
              {channelData?.snippet?.description.slice(0, 100) + "..."}
              <NavLink to={"about"} className="textNone">
                <svg viewBox="0 0 24 24" className="navToAbout">
                  <path d="m9.4 18.4-.7-.7 5.6-5.6-5.7-5.7.7-.7 6.4 6.4-6.3 6.3z"></path>
                </svg>
              </NavLink>
            </div>
          </div>
          <div className="channelSubsSection">
            <div className="btn subs">Subscribe</div>
          </div>
        </div>
        <div className="channelSections">
          <NavLink
            to=""
            className={({ isActive }) =>
              isActive ? "active channelSectionItems" : "channelSectionItems"
            }
            end>
            Home
          </NavLink>
          <NavLink
            to="playlists"
            className={({ isActive }) =>
              isActive ? "active channelSectionItems" : "channelSectionItems"
            }>
            Playlists
          </NavLink>
          <NavLink
            to="about"
            className={({ isActive }) =>
              isActive ? "active channelSectionItems" : "channelSectionItems"
            }>
            About
          </NavLink>
        </div>
        <div className="channelContentSection">
          <ChannelContext.Provider value={dataSet}>
            <Outlet />
          </ChannelContext.Provider>
        </div>
      </div>
    </div>
  );
};
export default ChannelPage;
