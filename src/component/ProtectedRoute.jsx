import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
const ProtectedRoute = () => {
  const { userInfo } = useSelector((state) => state.root);
  return userInfo && userInfo._id ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
