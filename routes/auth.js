const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Sample user data (replace with your actual user fetching logic)
const users = [
    { username: 'your_username', password: 'your_password', role: 'Teacher' }
];

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    // Find user (you can replace this with your DB logic)
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create token
    const token = jwt.sign({ id: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});

module.exports = router;
