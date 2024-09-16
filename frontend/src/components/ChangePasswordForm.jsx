// src/components/ChangePasswordForm.jsx
import React, { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../contexts/AuthContext';

const ChangePasswordForm = () => {
    const { user } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleChangePassword = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        try {
            await axios.post(
                '/api/admin/change-password',
                { email, newPassword },
                { headers: { Authorization: `Bearer ${user.token}` } }
            );
            alert('Password changed successfully.');
        } catch (err) {
            console.error(err);
            alert('Error changing password.');
        }
    };

    return (
        <form onSubmit={handleChangePassword} className="space-y-4">
            <h2 className="text-2xl font-bold">Change User Password</h2>
            <input
                type="email"
                placeholder="User Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border p-2 w-full"
                required
            />
            <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="border p-2 w-full"
                required
            />
            <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border p-2 w-full"
                required
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Change Password
            </button>
        </form>
    );
};

export default ChangePasswordForm;
