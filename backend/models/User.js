const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' },
    access: { type: Boolean, default: true },
    admin: { type: Boolean, default: false },
});

module.exports = mongoose.model('UsersCred', UserSchema);
