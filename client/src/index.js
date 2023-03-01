import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Navigation from "./components/nav/Navigation";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigation />,
    errorElement: <h1>Something went wrong</h1>,
    children: [
      {
        path: "login",
        element: <h1>Log in</h1>,
      },
      {
        path: "register",
        element: <h1>Register</h1>,
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
