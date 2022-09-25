const mongoose=require("mongoose");

const employeeSchema=new mongoose.Schema({
    empid:Number,
    name:String,
    department:String,
    salary:Number
})

module.exports=mongoose.model('employee',employeeSchema);



