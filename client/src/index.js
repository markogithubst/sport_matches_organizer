import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Navigation from "./components/nav/Navigation";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Login from './components/login/Login';
import Registration from './components/registration/Registration';

const AppLayout = () => {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <h1>Something went wrong</h1>,
    children: [
      {
        path: "/",
        element: <h1>This is the home element</h1>,
      },

      {
        path: "login",
        element: <Login/>,
      },
      {
        path: "register",
        element: <Registration/>,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
