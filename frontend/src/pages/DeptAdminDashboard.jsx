// src/pages/DeptAdminDashboard.jsx
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import CreateUserForm from '../components/CreateUserForm';
import ChangePasswordForm from '../components/ChangePasswordForm';
import ReviewEntries from '../components/ReviewEntries';
import DisplayUsersAdmin from '../components/DisplayUsersAdmin';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const DeptAdminDashboard = () => {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />
                <div className="p-6 flex-1 overflow-y-auto">
                    <Routes>
                        <Route path="add-user" element={<CreateUserForm />} />
                        <Route path="change-password" element={<ChangePasswordForm />} />
                        <Route path="review-entries" element={<ReviewEntries />} />
                        <Route path="existing-users" element={<DisplayUsersAdmin />} />
                        {/* Add other routes as needed */}
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default DeptAdminDashboard;
