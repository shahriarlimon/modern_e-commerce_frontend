import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = ({
    isAuthenticated,
    children,
    adminRoute,
    isAdmin
}) => {
    const location = useLocation()
    if (isAuthenticated === false) {
        return <Navigate to={"/login"} state={{ from: location }} replace />;
    }

    if (adminRoute && !isAdmin) {
        return <Navigate to={"/"} state={{ from: location }} replace />;
    }

    return children ? children : <Outlet />;
};

export default ProtectedRoute;