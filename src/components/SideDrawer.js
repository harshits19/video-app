import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SideDrawer = () => {
  const isNavOpen = useSelector((store) => store.navState.isOpen);
  let drawerClasses = "side-drawer";
  if (isNavOpen) {
    drawerClasses = "side-drawer open";
  }
  return (
    <>
      <div className={drawerClasses}>
        <div className="sideNavbar">
          <div className="categorySection">
            <div className="navItems">
              <span className="navItemIcon">
                <svg height="24" width="24" viewBox="0 0 24 24">
                  <path d="M12,4.33l7,6.12V20H15V14H9v6H5V10.45l7-6.12M12,3,4,10V21h6V15h4v6h6V10L12,3Z"></path>
                </svg>
              </span>
              <Link to="/" className="textNone">
                <span className="navItemName">Home</span>
              </Link>
            </div>
            <div className="navItems">
              <span className="navItemIcon">
                <svg height="24" width="24" viewBox="0 0 24 24">
                  <path d="M10 14.65v-5.3L15 12l-5 2.65zm7.77-4.33-1.2-.5L18 9.06c1.84-.96 2.53-3.23 1.56-5.06s-3.24-2.53-5.07-1.56L6 6.94c-1.29.68-2.07 2.04-2 3.49.07 1.42.93 2.67 2.22 3.25.03.01 1.2.5 1.2.5L6 14.93c-1.83.97-2.53 3.24-1.56 5.07.97 1.83 3.24 2.53 5.07 1.56l8.5-4.5c1.29-.68 2.06-2.04 1.99-3.49-.07-1.42-.94-2.68-2.23-3.25zm-.23 5.86-8.5 4.5c-1.34.71-3.01.2-3.72-1.14-.71-1.34-.2-3.01 1.14-3.72l2.04-1.08v-1.21l-.69-.28-1.11-.46c-.99-.41-1.65-1.35-1.7-2.41-.05-1.06.52-2.06 1.46-2.56l8.5-4.5c1.34-.71 3.01-.2 3.72 1.14.71 1.34.2 3.01-1.14 3.72L15.5 9.26v1.21l1.8.74c.99.41 1.65 1.35 1.7 2.41.05 1.06-.52 2.06-1.46 2.56z"></path>
                </svg>
              </span>
              <span className="navItemName">Shorts</span>
            </div>
            <div className="navItems">
              <span className="navItemIcon">
                <svg height="24" width="24" viewBox="0 0 24 24">
                  <path d="M10 18v-6l5 3-5 3zm7-15H7v1h10V3zm3 3H4v1h16V6zm2 3H2v12h20V9zM3 10h18v10H3V10z"></path>
                </svg>
              </span>
              <span className="navItemName">Subscriptions</span>
            </div>
            <div className="navItems">
              <span className="navItemIcon">
                <svg height="24" width="24" viewBox="0 0 24 24">
                  <path d="M10,9.35,15,12l-5,2.65ZM12,6a54.36,54.36,0,0,0-7.56.38A1.53,1.53,0,0,0,3.38,7.44,24.63,24.63,0,0,0,3,12a24.63,24.63,0,0,0,.38,4.56,1.53,1.53,0,0,0,1.06,1.06A54.36,54.36,0,0,0,12,18a54.36,54.36,0,0,0,7.56-.38,1.53,1.53,0,0,0,1.06-1.06A24.63,24.63,0,0,0,21,12a24.63,24.63,0,0,0-.38-4.56,1.53,1.53,0,0,0-1.06-1.06A54.36,54.36,0,0,0,12,6h0m0-1s6.25,0,7.81.42a2.51,2.51,0,0,1,1.77,1.77A25.87,25.87,0,0,1,22,12a25.87,25.87,0,0,1-.42,4.81,2.51,2.51,0,0,1-1.77,1.77C18.25,19,12,19,12,19s-6.25,0-7.81-.42a2.51,2.51,0,0,1-1.77-1.77A25.87,25.87,0,0,1,2,12a25.87,25.87,0,0,1,.42-4.81A2.51,2.51,0,0,1,4.19,5.42C5.75,5,12,5,12,5Z"></path>
                </svg>
              </span>
              <span className="navItemName">Originals</span>
            </div>
            <div className="navItems">
              <span className="navItemIcon">
                <svg height="24" width="24" viewBox="0 0 24 24">
                  <path d="M10 9.35L15 12l-5 2.65zM12 7a5 5 0 105 5 5 5 0 00-5-5m0-1a6 6 0 11-6 6 6 6 0 016-6zm0-3a9 9 0 109 9 9 9 0 00-9-9m0-1A10 10 0 112 12 10 10 0 0112 2z"></path>
                </svg>
              </span>
              <span className="navItemName">Youtube Music</span>
            </div>
          </div>
          <div className="categorySection">
            <div className="navItems">
              <span className="navItemIcon">
                <svg height="24" width="24" viewBox="0 0 24 24">
                  <path d="m11 7 6 3.5-6 3.5V7zm7 13H4V6H3v15h15v-1zm3-2H6V3h15v15zM7 17h13V4H7v13z"></path>
                </svg>
              </span>
              <span className="navItemName">Library</span>
            </div>
            <div className="navItems">
              <span className="navItemIcon">
                <svg height="24" width="24" viewBox="0 0 24 24">
                  <path d="M14.97 16.95 10 13.87V7h2v5.76l4.03 2.49-1.06 1.7zM22 12c0 5.51-4.49 10-10 10S2 17.51 2 12h1c0 4.96 4.04 9 9 9s9-4.04 9-9-4.04-9-9-9C8.81 3 5.92 4.64 4.28 7.38c-.11.18-.22.37-.31.56L3.94 8H8v1H1.96V3h1v4.74c.04-.09.07-.17.11-.25.11-.22.23-.42.35-.63C5.22 3.86 8.51 2 12 2c5.51 0 10 4.49 10 10z"></path>
                </svg>
              </span>
              <span className="navItemName">History</span>
            </div>
            <div className="navItems">
              <span className="navItemIcon">
                <svg height="24" width="24" viewBox="0 0 24 24">
                  <path d="M10,8l6,4l-6,4V8L10,8z M21,3v18H3V3H21z M20,4H4v16h16V4z"></path>
                </svg>
              </span>
              <span className="navItemName">Your Videos</span>
            </div>
            <div className="navItems">
              <span className="navItemIcon">
                <svg height="24" width="24" viewBox="0 0 24 24">
                  <path d="M14.97,16.95L10,13.87V7h2v5.76l4.03,2.49L14.97,16.95z M12,3c-4.96,0-9,4.04-9,9s4.04,9,9,9s9-4.04,9-9S16.96,3,12,3 M12,2c5.52,0,10,4.48,10,10s-4.48,10-10,10S2,17.52,2,12S6.48,2,12,2L12,2z"></path>
                </svg>
              </span>
              <span className="navItemName">Watch Later</span>
            </div>
            <div className="navItems">
              <span className="navItemIcon">
                <svg height="24" width="24" viewBox="0 0 24 24">
                  <path d="M17 18V19H6V18H17ZM16.5 11.4L15.8 10.7L12 14.4V4H11V14.4L7.2 10.6L6.5 11.3L11.5 16.3L16.5 11.4Z"></path>
                </svg>
              </span>
              <span className="navItemName">Downloads</span>
            </div>
            <div className="navItems">
              <span className="navItemIcon">
                <svg height="24" width="24" viewBox="0 0 24 24">
                  <path d="M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11H3v10h4h1h9.43 c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z M7,20H4v-8h3V20z M19.98,13.17l-1.34,6 C18.54,19.65,18.03,20,17.43,20H8v-8.61l5.6-6.06C13.79,5.12,14.08,5,14.38,5c0.26,0,0.5,0.11,0.63,0.3 c0.07,0.1,0.15,0.26,0.09,0.47l-1.52,4.94L13.18,12h1.35h4.23c0.41,0,0.8,0.17,1.03,0.46C19.92,12.61,20.05,12.86,19.98,13.17z"></path>
                </svg>
              </span>
              <span className="navItemName">Liked Videos</span>
            </div>
          </div>
          <div className="categorySection">
            <div className="categoryHeading">Explore</div>
            <div className="navItems">
              <span className="navItemIcon">
                <svg height="24" width="24" viewBox="0 0 24 24">
                  <path d="M19 3.87v9.77C19 17.7 15.86 21 12 21s-7-3.3-7-7.37v-.13c0-1.06.22-2.13.62-3.09.5-1.19 1.29-2.21 2.27-2.97.85-.66 1.83-1.14 2.87-1.65.39-.19.77-.38 1.15-.58.36-.19.72-.38 1.08-.56v3.22l1.55-1.04L19 3.87M20 2l-6 4V3c-.85.44-1.7.88-2.55 1.33-1.41.74-2.9 1.34-4.17 2.32-1.13.87-2.02 2.05-2.58 3.37-.46 1.09-.7 2.29-.7 3.48v.14C4 18.26 7.58 22 12 22s8-3.74 8-8.36V2zM9.45 12.89 14 10v5.7c0 1.82-1.34 3.3-3 3.3s-3-1.47-3-3.3c0-1.19.58-2.23 1.45-2.81z"></path>
                </svg>
              </span>
              <span className="navItemName">Trending</span>
            </div>
            <div className="navItems">
              <span className="navItemIcon">
                <svg height="24" width="24" viewBox="0 0 24 24">
                  <path d="M7 8c0 2.76 2.24 5 5 5s5-2.24 5-5h-1c0 2.21-1.79 4-4 4s-4-1.79-4-4H7zm9.9-2c-.46-2.28-2.48-4-4.9-4S7.56 3.72 7.1 6H4v14c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V6h-3.1zM12 3c1.86 0 3.43 1.27 3.87 3H8.13c.44-1.73 2.01-3 3.87-3zm7 17c0 .55-.45 1-1 1H6c-.55 0-1-.45-1-1V7h14v13z"></path>
                </svg>
              </span>
              <span className="navItemName">Shopping</span>
            </div>
            <div className="navItems">
              <span className="navItemIcon">
                <svg height="24" width="24" viewBox="0 0 24 24">
                  <path d="M12 4v9.38c-.73-.84-1.8-1.38-3-1.38-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V8h6V4h-7zM9 19c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm9-12h-5V5h5v2z"></path>
                </svg>
              </span>
              <span className="navItemName">Music</span>
            </div>
            <div className="navItems">
              <span className="navItemIcon">
                <svg height="24" width="24" viewBox="0 0 24 24">
                  <path d="M22.01,4.91l-0.5-2.96L1.64,5.19L2,8v13h20V8H3.06L22.01,4.91z M5,9l1,3h3L8,9h2l1,3h3l-1-3h2l1,3h3l-1-3h3v11H3V9H5z"></path>
                </svg>
              </span>
              <span className="navItemName">Movies</span>
            </div>
            <div className="navItems">
              <span className="navItemIcon">
                <svg height="24" width="24" viewBox="0 0 24 24">
                  <path d="M14,12c0,1.1-0.9,2-2,2s-2-0.9-2-2s0.9-2,2-2S14,10.9,14,12z M8.48,8.45L7.77,7.75C6.68,8.83,6,10.34,6,12 s0.68,3.17,1.77,4.25l0.71-0.71C7.57,14.64,7,13.39,7,12S7.57,9.36,8.48,8.45z M16.23,7.75l-0.71,0.71C16.43,9.36,17,10.61,17,12 s-0.57,2.64-1.48,3.55l0.71,0.71C17.32,15.17,18,13.66,18,12S17.32,8.83,16.23,7.75z M5.65,5.63L4.95,4.92C3.13,6.73,2,9.24,2,12 s1.13,5.27,2.95,7.08l0.71-0.71C4.02,16.74,3,14.49,3,12S4.02,7.26,5.65,5.63z M19.05,4.92l-0.71,0.71C19.98,7.26,21,9.51,21,12 s-1.02,4.74-2.65,6.37l0.71,0.71C20.87,17.27,22,14.76,22,12S20.87,6.73,19.05,4.92z"></path>
                </svg>
              </span>
              <span className="navItemName">Live</span>
            </div>
            <div className="navItems">
              <span className="navItemIcon">
                <svg height="24" width="24" viewBox="0 0 24 24">
                  <path d="M10,12H8v2H6v-2H4v-2h2V8h2v2h2V12z M17,12.5c0-0.83-0.67-1.5-1.5-1.5S14,11.67,14,12.5c0,0.83,0.67,1.5,1.5,1.5 S17,13.33,17,12.5z M20,9.5C20,8.67,19.33,8,18.5,8S17,8.67,17,9.5c0,0.83,0.67,1.5,1.5,1.5S20,10.33,20,9.5z M16.97,5.15l-4.5,2.53 l-0.49,0.27l-0.49-0.27l-4.5-2.53L3,7.39v6.43l8.98,5.04l8.98-5.04V7.39L16.97,5.15 M16.97,4l4.99,2.8v7.6L11.98,20L2,14.4V6.8 L6.99,4l4.99,2.8L16.97,4L16.97,4z"></path>
                </svg>
              </span>
              <span className="navItemName">Gaming</span>
            </div>
          </div>
        </div>
      </div>
      <div className="overlay"></div>
    </>
  );
};
export default SideDrawer;
