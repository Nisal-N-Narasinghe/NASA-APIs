import { createBrowserRouter, Navigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
import Profile from "../pages/Profile";
import checkLoginStatus from "../utils/helpers/checkLogingStatus";
import propTypes from "prop-types";

const PrivateRoute = ({ element, path }) => {
  PrivateRoute.propTypes = {
    element: propTypes.element.isRequired,
    path: propTypes.string.isRequired,
  };
  const isLoggedIn = checkLoginStatus();
  return isLoggedIn ? element : <Navigate to='/login' replace />;
};

const PublicRoute = ({ element, path }) => {
  PublicRoute.propTypes = {
    element: propTypes.element.isRequired,
    path: propTypes.string.isRequired,
  };
  const isLoggedIn = checkLoginStatus();
  return isLoggedIn ? <Navigate to='/' replace /> : element;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [{}],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
  {
    path: "/login",
    element: <PublicRoute element={<Login />} path='/login' />,
  },
  {
    path: "/signup",
    element: <PublicRoute element={<Signup />} path='/signup' />,
  },
  {
    path: "/profile",
    element: <PrivateRoute element={<Profile />} path='/profile' />,
  },
]);

export default router;
