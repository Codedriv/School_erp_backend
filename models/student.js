const mongoose = require('mongoose');

const student= new mongoose.Schema({
    name: {type : String, required: true},
    roolno: {type: String, required: true},
    class: {type: String, requires: true},
    section: {type: String, requires:true}
});  // it create the class for the student which include student related info

module.export =mongoose.model('Student', student)
