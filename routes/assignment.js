const express = require('express');
const { check, validationResult } = require('express-validator');
const Assignment = require('../models/assignment'); // Updated this line
const authenticate = require('../middleware/authenticate');
const router = express.Router();

// Creating assignment
router.post(
    '/',
    authenticate('Teacher'),
    [
        check('title').not().isEmpty().withMessage('Title is required'),
        check('details').not().isEmpty().withMessage('Details required'),
        check('duedate').not().isEmpty().withMessage('Due date mandatory'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const { title, details, duedate } = req.body; // Fixed detail to details
            let assignment = new Assignment({ title, details, duedate });
            await assignment.save();
            res.status(201).json(assignment);
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ message: 'Server error' });
        }
    }
);
module.exports = router;
