// src/components/SavedEntries.jsx
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../contexts/AuthContext';

const SavedEntries = () => {
    const { user } = useContext(AuthContext);
    const [savedAnswers, setSavedAnswers] = useState([]);

    useEffect(() => {
        const fetchSavedAnswers = async () => {
            try {
                const res = await axios.get('/api/user/saved-answers', {
                    headers: { Authorization: `Bearer ${user.token}` },
                });
                setSavedAnswers(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchSavedAnswers();
    }, [user]);

    return (
        <div>
            <h2 className="text-2xl font-bold">Saved Entries</h2>
            {savedAnswers.length > 0 ? (
                savedAnswers.map((answer) => (
                    <div key={answer._id} className="border p-4 mb-2">
                        <p>
                            <strong>Question:</strong> {answer.questionText}
                        </p>
                        <p>
                            <strong>Your Answer:</strong> {JSON.stringify(answer.answerData)}
                        </p>
                    </div>
                ))
            ) : (
                <p>No saved entries.</p>
            )}
        </div>
    );
};

export default SavedEntries;
