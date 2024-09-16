const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
    answerData: mongoose.Schema.Types.Mixed, // Can be String, Array, Object, etc.
});

module.exports = mongoose.model('CC', AnswerSchema);
