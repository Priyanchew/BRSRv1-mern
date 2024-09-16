// src/components/DisplayLogs.jsx
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../contexts/AuthContext';

const DisplayLogs = () => {
    const { user } = useContext(AuthContext);
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const res = await axios.get('/api/admin/logs', {
                    headers: { Authorization: `Bearer ${user.token}` },
                });
                setLogs(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchLogs();
    }, [user]);

    return (
        <div>
            <h2 className="text-2xl font-bold">Activity Logs</h2>
            {logs.length > 0 ? (
                <table className="w-full border-collapse">
                    <thead>
                    <tr>
                        <th className="border p-2">Action</th>
                        <th className="border p-2">User Email</th>
                        <th className="border p-2">Details</th>
                        <th className="border p-2">Timestamp</th>
                    </tr>
                    </thead>
                    <tbody>
                    {logs.map((log) => (
                        <tr key={log._id}>
                            <td className="border p-2">{log.action}</td>
                            <td className="border p-2">{log.userEmail}</td>
                            <td className="border p-2">{log.details}</td>
                            <td className="border p-2">{new Date(log.timestamp).toLocaleString()}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>No logs found.</p>
            )}
        </div>
    );
};

export default DisplayLogs;
