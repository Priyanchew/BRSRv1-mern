import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../contexts/AuthContext';

const UserDashboard = () => {
    const { user } = useContext(AuthContext);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const res = await axios.get(`/api/user/questions/${user.role}`, {
                    headers: { Authorization: `Bearer ${user.token}` },
                });
                setQuestions(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchQuestions();
    }, [user]);

    const handleChange = (questionId, value) => {
        setAnswers({ ...answers, [questionId]: value });
    };

    const handleSubmit = async () => {
        try {
            await Promise.all(
                Object.keys(answers).map((questionId) =>
                    axios.post(
                        '/api/user/answer',
                        { questionId, answerData: answers[questionId] },
                        { headers: { Authorization: `Bearer ${user.token}` } }
                    )
                )
            );
            alert('Answers submitted');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold">User Dashboard</h1>
            {questions.map((q) => (
                <div key={q._id} className="my-4">
                    <p className="font-semibold">{q.questionText}</p>
                    {/* Render input based on question type */}
                    <input
                        type="text"
                        className="border p-2 w-full"
                        onChange={(e) => handleChange(q._id, e.target.value)}
                    />
                </div>
            ))}
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleSubmit}
            >
                Submit Answers
            </button>
        </div>
    );
};

export default UserDashboard;
