const express= require('express');
const {check ,validationresult}= require('express-validator');
const student=require('../models/student')
const authenticity= require('../middleware/authenticate');
const router =express.router(); //new router is created

//creating a new student
router.post(
    '/',auth('Teacher'),//only teacher can accesss
    [
       check('name').not().isEmpty().withMessage('Name is mandatory'),
       check('rollno').not().isEmpty().withMessage('Rollno is mandatory'),
       check('class').not().isEmpty().withMessage("CLASS IS REQUIRED"),
       check('section').not().isEmpty().withMessage("section is reuired")
    ],
    async (req,res) =>{
        const errors=validationresult(req); //for checking validation errors
        if (!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }

        try{

            const {name,rollno,class:student, section}= req.body;
            let student =new student({name,rollno,class:student,section});
            await student.save(); //save students info in db
            res.status(201).json(student);

        }
        catch(err)
        {
            res.status(500).json({message:'server errror'}); 
        }
    }
);
