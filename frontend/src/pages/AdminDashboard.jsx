import React, { useState } from 'react';
import CreateUserForm from '../components/CreateUserForm';
import ChangePasswordForm from '../components/ChangePasswordForm';
// Import other components as needed

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('createUser');

    return (
        <div>
            <h1 className="text-2xl font-bold">Company Admin Dashboard</h1>
            <div className="flex space-x-4 my-4">
                <button onClick={() => setActiveTab('createUser')}>Add User</button>
                <button onClick={() => setActiveTab('changePassword')}>Change Password</button>
                {/* Other tabs */}
            </div>
            {activeTab === 'createUser' && <CreateUserForm />}
            {activeTab === 'changePassword' && <ChangePasswordForm />}
            {/* Render other components based on activeTab */}
        </div>
    );
};

export default AdminDashboard;
