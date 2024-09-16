import React, { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../contexts/AuthContext';

const CreateUserForm = () => {
    const { user } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: '',
        admin: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                '/api/admin/create-user',
                formData,
                { headers: { Authorization: `Bearer ${user.token}` } }
            );
            alert('User created');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="email"
                name="email"
                placeholder="Email"
                className="border p-2 w-full"
                onChange={handleChange}
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                className="border p-2 w-full"
                onChange={handleChange}
            />
            <select
                name="role"
                className="border p-2 w-full"
                onChange={handleChange}
            >
                <option value="">Select Role</option>
                <option value="HR">HR</option>
                {/* Other roles */}
            </select>
            <label className="flex items-center">
                <input
                    type="checkbox"
                    name="admin"
                    onChange={handleChange}
                />
                <span className="ml-2">Admin</span>
            </label>
            <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded"
            >
                Create User
            </button>
        </form>
    );
};

export default CreateUserForm;
