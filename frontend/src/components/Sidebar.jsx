// src/components/Sidebar.jsx
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

const Sidebar = () => {
    const { user } = useContext(AuthContext);

    let menuItems = [];

    if (user.role === 'admin') {
        menuItems = [
            { name: 'Add User', path: '/dashboard/add-user' },
            { name: 'Change Password', path: '/dashboard/change-password' },
            { name: 'Review Entries', path: '/dashboard/review-entries' },
            { name: 'View Logs', path: '/dashboard/view-logs' },
            { name: 'Existing Users', path: '/dashboard/existing-users' },
        ];
    } else if (user.admin) {
        menuItems = [
            { name: 'Add User', path: '/dashboard/add-user' },
            { name: 'Change Password', path: '/dashboard/change-password' },
            { name: 'Review Entries', path: '/dashboard/review-entries' },
            { name: 'Existing Users', path: '/dashboard/existing-users' },
        ];
    } else {
        menuItems = [
            { name: 'Entry', path: '/dashboard/entry' },
            { name: 'Saved', path: '/dashboard/saved' },
            { name: 'Submit', path: '/dashboard/submit' },
        ];
    }

    return (
        <div className="bg-gray-200 w-64 h-full p-4">
            <ul className="space-y-4">
                {menuItems.map((item) => (
                    <li key={item.name}>
                        <NavLink
                            to={item.path}
                            className={({ isActive }) =>
                                isActive ? 'text-blue-600' : 'text-gray-800 hover:text-blue-600'
                            }
                        >
                            {item.name}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
