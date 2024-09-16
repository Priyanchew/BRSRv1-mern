const express = require('express');
const router = express.Router();
const Answer = require('../models/Answer');
const Question = require('../models/Question');
const authMiddleware = require('../middleware/auth');

// Middleware to protect routes
router.use(authMiddleware);

// Get Questions for a Role
router.get('/questions/:role', async (req, res) => {
    const role = req.params.role;
    // Fetch questions based on role
    try {
        const questions = await Question.find({ roles: role });
        res.json(questions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Save or Update Answer
router.post('/answer', async (req, res) => {
    const { questionId, answerData } = req.body;
    try {
        let answer = await Answer.findOne({ user: req.user.id, question: questionId });
        if (answer) {
            answer.answerData = answerData;
        } else {
            answer = new Answer({
                user: req.user.id,
                question: questionId,
                answerData,
            });
        }
        await answer.save();
        res.json({ message: 'Answer saved' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
