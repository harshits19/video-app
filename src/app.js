import React from "react";
import ReactDOM from "react-dom/client";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
import SideDrawer from "./components/SideDrawer";
import { Provider } from "react-redux";
import store from "./utilities/store";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import VideoPage from "./components/VideoPage";
import SearchPage from "./components/SearchPage";
import GoToTop from "./utilities/gotoTop";
import ResSearchPage from "./components/ResSearchPage";
import ChannelPage from "./components/ChannelPage";
import ChannelPlaylist from "./components/ChannelPlaylist";
import ChannelAbout from "./components/ChannelAbout";
import ChannelHomePage from "./components/ChannelHomePage";
import VideoPlaylist from "./components/VideoPlaylist";

const AppLayout = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("themeMode") || "lightTheme"
  );
  useEffect(() => {
    document.body.className = localStorage.getItem("themeMode") || "lightTheme";
  }, [theme]);
  return (
    <>
      <Provider store={store}>
        <Header theme={theme} setTheme={setTheme} />
        <SideDrawer theme={theme} />
        <Outlet />
      </Provider>
      <GoToTop />
      <Footer />
    </>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/watch",
        element: <VideoPage />,
      },
      {
        path: "/results",
        element: <SearchPage />,
      },
      {
        path: "/resSearch",
        element: <ResSearchPage />,
      },
      {
        path: "/channel/:channelId",
        element: <ChannelPage />,
        children: [
          {
            path: "/channel/:channelId/",
            element: <ChannelHomePage />,
          },
          {
            path: "/channel/:channelId/playlists",
            element: <ChannelPlaylist />,
          },
          {
            path: "/channel/:channelId/playlists/:playlistId",
            element: <VideoPlaylist />,
          },
          { path: "/channel/:channelId/about", element: <ChannelAbout /> },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);

/* APPLAYOUT  LLD
header
  -top nav
    ~hamburger icon
    ~logo
    ~search bar
    ~profile icon

body
  -side drawer
    ~main section
      :home,shorts,subs,originals
    ~personal section
      :library,history,watchlater,downloads
    ~subscription section
    ~explore section
      :trending,music,movie,live
    ~settings,help,report

  -homepage
    ~filter btns
    ~videocard container
      :thumbnail
      :time
      :title
      :channel title
      :views
      :upload time

  -video page
    -video container (default hidden side drawer)
      ~video frame
      ~video details section
        :title
        :channel title
        :likes
        :share
        :subscribe
        :video description
          >views
          >time uploaded
          >actual description
      -comments section
        :total comments
        :sortby btn
        :add comment functionality
        :show comments
        :replies
        
    -right side section
      ~recommended topics filter btns
      ~recommended videos

footer
  -seperator line
  -logo
*/
