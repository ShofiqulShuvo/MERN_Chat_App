import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { isLogedIn } = useSelector((state) => state.user);

  if (isLogedIn) {
    return <Outlet />;
  } else if (isLogedIn === false) {
    return <Navigate to={"/"} />;
  }
};

export default ProtectedRoute;
