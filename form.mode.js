const mongoose = require("mongoose");


const formDataSchema =  {studentId:Number, studentName:String, class:Number, rollNo:Number} 

const studentFormData = mongoose.model("formData",formDataSchema);

module.exports.formmodelDB   = studentFormData;