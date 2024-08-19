import React from 'react';
import ApiService from '../../service/ApiService';
import { NavLink, useNavigate } from 'react-router-dom';

export const Navbar = () => {
    const isAuthenticated = ApiService.isAuthenticated();
    const isUser = ApiService.isUser();
    const isAdmin = ApiService.isAdmin();
    console.log(isAuthenticated);
    console.log(isAdmin);
    console.log(isUser);

    const navigate = useNavigate();

    const handleLogout = () => {
        const isLogout = window.confirm('Are you sure you really want to logout');
        if (isLogout) {
            ApiService.logout();
            navigate('/home');
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <NavLink to={'/home'}> 2N_HA Hotel</NavLink>
            </div>
            <ul className="navbar-ul">
                <li>
                    <NavLink to={'/home'} className={({ isActive }) => (isActive ? 'active' : '')}>
                        {' '}
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/rooms'} className={({ isActive }) => (isActive ? 'active' : '')}>
                        {' '}
                        Rooms
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/find-booking'} className={({ isActive }) => (isActive ? 'active' : '')}>
                        {' '}
                        Find my Booking
                    </NavLink>
                </li>

                {/*  */}
                {isUser && (
                    <li>
                        <NavLink to={'/profile'} className={({ isActive }) => (isActive ? 'active' : '')}>
                            {' '}
                            Profile
                        </NavLink>
                    </li>
                )}
                {isAdmin && (
                    <li>
                        <NavLink to={'/admin'} className={({ isActive }) => (isActive ? 'active' : '')}>
                            {' '}
                            Admin
                        </NavLink>
                    </li>
                )}
                {/*  */}

                {!isAuthenticated && (
                    <li>
                        <NavLink to={'/login'} className={({ isActive }) => (isActive ? 'active' : '')}>
                            {' '}
                            Login
                        </NavLink>
                    </li>
                )}
                {!isAuthenticated && (
                    <li>
                        <NavLink to={'/register'} className={({ isActive }) => (isActive ? 'active' : '')}>
                            {' '}
                            Register
                        </NavLink>
                    </li>
                )}
                {isAuthenticated ?? <li onClick={handleLogout}> Logout</li>}
            </ul>
        </nav>
    );
};
