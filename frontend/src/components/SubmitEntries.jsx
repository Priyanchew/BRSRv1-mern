// src/components/SubmitEntries.jsx
import React, { useContext } from 'react';
import axios from 'axios';
import AuthContext from '../contexts/AuthContext';

const SubmitEntries = () => {
    const { user, logout } = useContext(AuthContext);

    const handleSubmitEntries = async () => {
        const confirmSubmit = window.confirm(
            'Are you sure you want to submit all entries? Your access will be removed after submission.'
        );

        if (!confirmSubmit) return;

        try {
            await axios.post(
                '/api/user/submit-entries',
                {},
                { headers: { Authorization: `Bearer ${user.token}` } }
            );
            alert('Entries submitted successfully. You will be logged out.');
            logout();
        } catch (err) {
            console.error(err);
            alert('Error submitting entries.');
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold">Submit Entries</h2>
            <p className="mb-4">
                Please make sure you have entered all the answers before submitting. Your access will be removed after
                submission.
            </p>
            <button onClick={handleSubmitEntries} className="bg-red-500 text-white px-4 py-2 rounded">
                Submit Entries
            </button>
        </div>
    );
};

export default SubmitEntries;
