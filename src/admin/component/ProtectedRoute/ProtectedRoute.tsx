import React, { JSX } from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const adminInfo = localStorage.getItem("admin");

  if (!adminInfo) {
    return <Navigate to="/LoginAdmin" replace />;
  }

  return children;
};

export default ProtectedRoute;
