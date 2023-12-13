import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import Explore from "../pages/explore";
import MyPredictions from "../pages/mypredictions";
import Profile from "../pages/profile";
import Events from "../pages/events";
import MainLayout from "../layouts/main";
import PostCreation from "../pages/postcreation";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/explore",
        element: <Explore />,
      },
      {
        path: "mypredictions",
        element: <MyPredictions />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "events",
        element: <Events />,
      },
      {
        path: "postcreate",
        element: <PostCreation />,
      },
    ],
  },
]);

export default routes;
