const express =require('express')
const {check, validationResult} = require('express-validator');
const Assignment =require('../middleware/authenticate');
const authenticate = require('../middleware/authenticate');
const router =express.Router();

//creating assignment

router.post(
    '/',
    authenticate('Teacher'),
    [
        check('title').not().isEmpty().withMessage('title is required'),
        check('detail').not().isEmpty().withMessage('details required'),
        check('duedate').not().isEmpty().withMessage('duedate mandatory'),
        
    ],
    async(req,res)=>{
        const errors= validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array});
        }
        try{
            const{title,detail,duedate}=req.body;
            let assignment =new Assignment({title,detail,duedate});
            await assignment.save();
            res.status(201).json(assignment);
        }
        catch(err){
            console.error(err.message);
            res.status(500).json({message: 'server error'});
        }
    }
);
module.exports =router