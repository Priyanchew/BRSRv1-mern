// src/components/DisplayUsersAdmin.jsx
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../contexts/AuthContext';

const DisplayUsersAdmin = () => {
    const { user } = useContext(AuthContext);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get('/api/admin/users', {
                    headers: { Authorization: `Bearer ${user.token}` },
                });
                setUsers(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchUsers();
    }, [user]);

    return (
        <div>
            <h2 className="text-2xl font-bold">Existing Users</h2>
            {users.length > 0 ? (
                <table className="w-full border-collapse">
                    <thead>
                    <tr>
                        <th className="border p-2">Email</th>
                        <th className="border p-2">Role</th>
                        <th className="border p-2">Access</th>
                        <th className="border p-2">Admin</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((u) => (
                        <tr key={u.email}>
                            <td className="border p-2">{u.email}</td>
                            <td className="border p-2">{u.role}</td>
                            <td className="border p-2">{u.access ? 'Yes' : 'No'}</td>
                            <td className="border p-2">{u.admin ? 'Yes' : 'No'}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>No users found.</p>
            )}
        </div>
    );
};

export default DisplayUsersAdmin;
