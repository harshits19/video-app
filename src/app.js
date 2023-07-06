import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
import SideDrawer from "./components/SideDrawer";
import { Provider } from "react-redux";
import store from "./utilities/store";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import VideoPage from "./components/VideoPage";
import { Outlet } from "react-router-dom";
import SearchPage from "./components/SearchPage";

const AppLayout = () => {
  return (
    <>
      <Provider store={store}>
        <Header />
        <SideDrawer />
        <Outlet />
      </Provider>
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
        
    -right side section
      ~recommended topics filter btns
      ~recommended videos

footer
  -seperator line
  -logo
*/
