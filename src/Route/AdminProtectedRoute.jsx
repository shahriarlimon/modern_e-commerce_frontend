
import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AdminProtectedRoute = ({ children }) => {
    const { loading, user } = useSelector((state) => state.user);
    if (loading === false) {
        if (user?.role !== "admin") {
            return <Navigate to="/login" replace />
        }
        return children;
    }
}

export default AdminProtectedRoute