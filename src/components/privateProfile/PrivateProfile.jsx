import React from "react";
import authStore from "../store/authStore";
import { Navigate, Outlet } from "react-router-dom";

const PrivateProfile = () => {
  const { isAuth } = authStore();

  if (!isAuth) return <Navigate to="login" />;
  return <Outlet />;
};

export default PrivateProfile;
