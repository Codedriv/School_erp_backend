const mongoose = require("mongoose")
const assignment = new mongoose.Schema({
    title: {type: String , required: true},
    details: {type: String,required:true},
    duedate:{ type:Date,required:true},
    status:{type:String, Enumerator:['pending','completed'],default :'pending'}
});

module.exports =mongoose.model('Assignment',assignment)