import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Registration from "./pages/Registration/Registration";
import IdeasPage from "./pages/IdeasPage/IdeasPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ProjectDetailed from "./pages/ProjectDetailed/ProjectDetailed";
import { ConfirmReg } from "./components/confirmRegistr/confirmRegistr";
import OtherUsersPage from "./pages/ProfilePage/OtherUsersPage";

const Routing = () => {
  const PUBLIC_ROUTES = [
    {
      link: "/",
      element: <HomePage />,
      id: 1,
    },
    {
      link: "/registration",
      element: <Registration />,
      id: 2,
    },
    {
      link: "/ideas",
      element: <IdeasPage />,
      id: 2,
    },
    {
      link: "/profile/:id",
      element: <ProfilePage />,
      id: 3,
    },
    {
      link: "/project/:id",
      element: <ProjectDetailed />,
      id: 4,
    },
    {
      link: "/confirm",
      element: <ConfirmReg />,
      id: 5,
    },
    {
      link: "/user/:id",
      element: <OtherUsersPage />,
      id: 6,
    },
  ];
  return (
    <Routes>
      {PUBLIC_ROUTES.map((item) => (
        <Route path={item.link} element={item.element} key={item.id} />
      ))}
    </Routes>
  );
};

export default Routing;
