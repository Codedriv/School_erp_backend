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

//update student detail
router.put(
    '/:id',
    authenticity('Teacher'),
    [
        check('name').optional().not().isEmpty().withMessage("name required"),
        check('rollno').optional().not().withMessage('Rollno is mandatory'),
        check('class').optional().not().withMessage("CLASS IS REQUIRED"),
        check('section').optional().not().withMessage("section is reuired")

    ],
    async (req,res) =>{
        const errors=validationresult(req); //for checking validation errors
        if (!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }

        try{

           
           
            const student= await student.findByIdAndUpdate(req.params.id,req.body,{new:true}); //save students info in db
            if(!student){
            res.status(404).json({message: "student not found"});

        }
        res.json(student)
    }
        catch(err)
        {
            res.status(500).json({message:'server errror'}); 
        }
    }

);



//for delet routes

router.delete('/:id', authenticity('Teacher'), async(req,res) =>
{
    try{
        const student =await student.findByIdAndUpdate(req.params.id);
        if(!student){
            return res.status(404).json({message: 'stduent not found'});

        }

        res.json({message: 'student deleted'});

    }
    catch(err){
        res.status(500).json({message:"server errror"});
    }
});

module.exports =router

