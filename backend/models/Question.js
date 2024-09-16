const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    headingNo: Number,
    subheadNo: Number,
    Qno: Number,
    questionText: String,
    isTable: Boolean,
    hasSubquestions: Boolean,
    // Other fields as needed
});

module.exports = mongoose.model('BRSRquestions', QuestionSchema);
