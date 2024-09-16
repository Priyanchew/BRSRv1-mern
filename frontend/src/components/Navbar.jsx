// src/components/Navbar.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="bg-gray-800 text-white px-4 py-2 flex justify-between items-center">
            <div>
                <Link to="/dashboard" className="text-xl font-bold">
                    Carbon Crunch
                </Link>
            </div>
            <div>
                {user && (
                    <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">
                        Logout
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
