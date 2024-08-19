import React, { ComponentType } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import ApiService from './ApiService';

interface ProtectedRouteProps {
    element: ComponentType<any>; // Sử dụng ComponentType để định nghĩa kiểu của component
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element: Element }) => {
    const location = useLocation();

    return ApiService.isAuthenticated() ? <Element /> : <Navigate to={'/login'} replace state={{ from: location }} />;
};

export const AdminRoute: React.FC<ProtectedRouteProps> = ({ element: Element }) => {
    const location = useLocation();

    return ApiService.isAdmin() ? <Element /> : <Navigate to={'/login'} replace state={{ from: location }} />;
};
