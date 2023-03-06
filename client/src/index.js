import React from 'react';
import ReactDOM from 'react-dom/client';
import { Navigation } from './components/nav/Navigation';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { Login } from './components/login/Login';
import { Registration } from './components/registration/Registration';
import { Home } from './components/home/Home';
import { UserProfile } from './components/user/UserProfile';
import { ResetPassword } from './components/reset-password/ResetPass';
import { ToastContainer } from 'react-toastify';
import { EmailForm } from './components/reset-password/EmailForm';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './styles.css';


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
        path: 'admin/register',
        element: <Registration/>
      },
      {
        path: 'reset-password/:id/:emailToken',
        element: <ResetPassword/>
      },
      {
        path: 'user',
        element: <UserProfile />
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
