import React from 'react';
import { Outlet, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"

function PrivateRoute() {
    const isAuthenticated = useSelector(state => state.userReducer.isAuthenticated);
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}

export { PrivateRoute };