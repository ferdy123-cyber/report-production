import { Navigate } from "react-router-dom";
import React from "react";

const user_credent = JSON.parse(localStorage.getItem("user_credent"));
// const member_credent = JSON.parse(localStorage.getItem("member_credent"));

export const NotLoginAdminRoute = ({ children }) => {
  if (user_credent) {
    if (user_credent) {
      return <Navigate to="/" replace />;
    }
  }
  return children;
};

export const AdminRoute = ({ children }) => {
  if (!user_credent) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
