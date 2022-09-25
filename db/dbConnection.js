const mongoose=require("mongoose");

//database name is user-data,collection name is user

const url=`mongodb://localhost:27017/employee-data`;
mongoose.connect(url,{useNewUrlParser:true})