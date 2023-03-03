import React from "react";
import ReactDOM from "react-dom/client";
import Navigation from "./components/nav/Navigation";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Login from './components/login/Login';
import Registration from './components/registration/Registration';
import { Home } from "./components/home/Home";



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
        element: <Home/>
      },
      {
        path: "login",
        element: <Login/>,
      },
      {
        path: "register",
        element: <Registration/>,
      },
      {
        path: "admin/register",
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
