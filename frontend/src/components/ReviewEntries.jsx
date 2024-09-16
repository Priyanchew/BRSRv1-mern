// src/components/ReviewEntries.jsx
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../contexts/AuthContext';

const ReviewEntries = () => {
    const { user } = useContext(AuthContext);
    const [usersToReview, setUsersToReview] = useState([]);
    const [selectedUserEmail, setSelectedUserEmail] = useState('');
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        const fetchUsersToReview = async () => {
            try {
                const res = await axios.get('/api/admin/users-to-review', {
                    headers: { Authorization: `Bearer ${user.token}` },
                });
                setUsersToReview(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchUsersToReview();
    }, [user]);

    const handleUserSelection = async (email) => {
        setSelectedUserEmail(email);

        try {
            const res = await axios.get(`/api/admin/user-entries/${email}`, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            setEntries(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold">Review Entries</h2>
            <select
                value={selectedUserEmail}
                onChange={(e) => handleUserSelection(e.target.value)}
                className="border p-2 w-full mb-4"
            >
                <option value="">Select User</option>
                {usersToReview.map((u) => (
                    <option key={u.email} value={u.email}>
                        {u.email} ({u.role})
                    </option>
                ))}
            </select>

            {entries.length > 0 ? (
                entries.map((entry) => (
                    <div key={entry._id} className="border p-4 mb-2">
                        <p>
                            <strong>Question:</strong> {entry.questionText}
                        </p>
                        <p>
                            <strong>Answer:</strong> {JSON.stringify(entry.answerData)}
                        </p>
                    </div>
                ))
            ) : (
                <p>No entries to display.</p>
            )}
        </div>
    );
};

export default ReviewEntries;
