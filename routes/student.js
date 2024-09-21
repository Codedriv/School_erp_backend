const express = require('express');
const { check, validationResult } = require('express-validator');
const Student = require('../models/student');
const authenticity = require('../middleware/authenticate');
const router = express.Router();

// Creating a new student
router.post(
    '/',
    authenticity('Teacher'),
    [
        check('name').not().isEmpty().withMessage('Name is mandatory'),
        check('rollno').not().isEmpty().withMessage('Rollno is mandatory'),
        check('class').not().isEmpty().withMessage("Class is required"),
        check('section').not().isEmpty().withMessage("Section is required")
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { name, rollno, class: studentClass, section } = req.body;
            let student = new Student({ name, rollno, class: studentClass, section });
            await student.save(); // Corrected this line
            res.status(201).json(student);
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ message: 'Server error' });
        }
    }
);


// Get all students
router.get('/', authenticity('Teacher'), async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get a student by ID
router.get('/:id', authenticity('Teacher'), async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.json(student);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
});
// Update student detail
router.put(
    '/:id',
    authenticity('Teacher'),
    [
        check('name').optional().not().isEmpty().withMessage("Name required"),
        check('rollno').optional().not().isEmpty().withMessage('Rollno is mandatory'),
        check('class').optional().not().isEmpty().withMessage("Class is required"),
        check('section').optional().not().isEmpty().withMessage("Section is required")
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!student) {
                return res.status(404).json({ message: "Student not found" });
            }
            res.json(student);
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ message: 'Server error' });
        }
    }
);

// Delete routes
router.delete('/:id', authenticity('Teacher'), async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json({ message: 'student deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
