const express = require('express');
const router = express.Router();x
const bcrypt = require('bcrypt');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

// Middleware to protect routes
router.use(authMiddleware);

// Middleware to check if admin
const adminMiddleware = (req, res, next) => {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });
    next();
};

router.use(adminMiddleware);

// Create User
router.post('/create-user', async (req, res) => {
    const { email, password, role, admin } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            password: hashedPassword,
            role,
            admin,
        });

        await newUser.save();
        res.json({ message: 'User created' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Other admin routes...

module.exports = router;
