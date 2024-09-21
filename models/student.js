const mongoose = require('mongoose');

const student= new mongoose.Schema({
    name: {type : String, required: true},
    rollno: {type: String, required: true},
    class: {type: String, requires: true},
    section: {type: String, requires:true}
});  // it create the class for the student which include student related info

const Student =  mongoose.model('Student', student);
module.exports =Student;
