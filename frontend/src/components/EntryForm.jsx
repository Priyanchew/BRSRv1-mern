// src/components/EntryForm.jsx
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../contexts/AuthContext';

const EntryForm = () => {
    const { user } = useContext(AuthContext);
    const [principles] = useState([
        'Principle 1',
        'Principle 2',
        'Principle 3',
        'Principle 4',
        'Principle 5',
        'Principle 6',
        'Principle 7',
        'Principle 8',
        'Principle 9',
    ]);
    const [selectedPrinciple, setSelectedPrinciple] = useState('Principle 1');
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const res = await axios.get(
                    `/api/user/questions/${user.role}/${selectedPrinciple}`,
                    { headers: { Authorization: `Bearer ${user.token}` } }
                );
                setQuestions(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchQuestions();
    }, [user, selectedPrinciple]);

    const handleAnswerChange = (questionId, value) => {
        setAnswers({ ...answers, [questionId]: value });
    };

    const handleSave = async () => {
        try {
            await axios.post(
                '/api/user/save-answers',
                { answers },
                { headers: { Authorization: `Bearer ${user.token}` } }
            );
            alert('Answers saved successfully.');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold">Entry Form</h2>
            <select
                value={selectedPrinciple}
                onChange={(e) => setSelectedPrinciple(e.target.value)}
                className="border p-2 w-full mb-4"
            >
                {principles.map((principle) => (
                    <option key={principle} value={principle}>
                        {principle}
                    </option>
                ))}
            </select>

            {questions.map((q) => (
                <div key={q._id} className="mb-4">
                    <p className="font-semibold">{q.questionText}</p>
                    <input
                        type="text"
                        value={answers[q._id] || ''}
                        onChange={(e) => handleAnswerChange(q._id, e.target.value)}
                        className="border p-2 w-full"
                    />
                </div>
            ))}

            <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded">
                Save Answers
            </button>
        </div>
    );
};

export default EntryForm;
