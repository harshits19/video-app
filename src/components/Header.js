import searchIcon from "../assets/searchIcon.png";
import logo from "../assets/youtubeLogo.png";
import userIcon from "../assets/userLight.png";
import { useDispatch } from "react-redux";
import { toggleNavState } from "../utilities/navSlice";
import { Link } from "react-router-dom";
const Header = () => {
  const dispatch = useDispatch(); //for sideNav state change
  const toggleNavHandler = () => {
    dispatch(toggleNavState());
  };
  return (
    <>
      <div className="header">
        <div className="menuLogoSection">
          <div className="menuSection">
            <svg
              height="24"
              width="24"
              viewBox="0 0 24 24"
              className="hamIcon"
              onClick={() => toggleNavHandler()}>
              <path d="M21,6H3V5h18V6z M21,11H3v1h18V11z M21,17H3v1h18V17z"></path>
            </svg>
          </div>
          <div className="logoSection">
            <Link to="/" className="textNone">
              <img src={logo} className="logo" />
            </Link>
          </div>
        </div>
        <div className="searchSection">
          <div className="searchBar">
            <input type="text" className="searchInput" placeholder="Search" />
            <div className="searchBtn">
              <img src={searchIcon} className="searchIcon" />
            </div>
          </div>
        </div>
        <div className="userSection">
          <div className="userLogin">
            <img src={userIcon} className="userLight" />
            <span>Sign In</span>
          </div>
        </div>
      </div>
    </>
  );
};
export default Header;
