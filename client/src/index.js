import React from 'react';
import ReactDOM from 'react-dom/client';
import Navigation from './components/nav/Navigation';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Login from './components/login/Login';
import Registration from './components/registration/Registration';
import { Home } from './components/home/Home';
import ResetPass from './components/reset-password/ResetPass';
import EmailForm from './components/reset-password/EmailForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        path: '/',
        element: <Home/>
      },
      {
        path: 'login',
        element: <Login/>
      },
      {
        path: 'register',
        element: <Registration/>
      },
      {
        path: 'forgotten-password',
        element: <EmailForm/>
      },
      {
        path: 'reset-password',
        element: <ResetPass/>
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"/>
  </React.StrictMode>
);
