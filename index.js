const express = require("express");
const { findById } = require("./models/employee");
const app = express();

require("dotenv").config(); //To declare own port

const port = process.env.PORT;
app.listen(port, (err) => {
  if (!err) {
    console.log(`Server running on port ${port}`);
  } else {
    console.log("Failed to run server");
  }
});
//install nodemon and in package.json inside scripts give "start":"nodemon index.js"

require("./db/dbConnection");
const Employees = require("./models/employee");
app.use(express.json()); //Middleware to parse json

//-------------------------------------------------------------------------------------------------------------------------------------------------------------

app.get("/", (req, res) => {
  res.send("Everthings working fine...");
});

//APIs-------------------------------------------------------------------------------------------------------------------------------------------------------

//POST
app.post("/create", async (req, res) => {
  let data = new Employees(req.body);
  let result = await data
    .save()
    .then(() => {
      console.log("data posted succefully" + data);
    })
    .catch(() => {
      console.log("failed to post data");
    });
  res.status(200).send(result);
});
//-------------------------------------------------------------------------------------------------------------------------------------------------------------

//GET
app.get("/info", async (req, res) => {
  let data = await Employees.find();
  res.send(data);
});

//-------------------------------------------------------------------------------------------------------------------------------------------------------------

//DELETE
//Delete using id
// app.delete("/info/:_id", async (req, res) => {
//   console.log(req.params);
  // let data = await Employees.deleteOne(req.params);
  // res.send(data);
// });

//Delete using name

app.delete("/info/:name",async(req,res)=>{
  console.log(req.params.name)
  
  let data=await Employees.deleteOne({name:req.params.name})
  res.status(200).send(data)
})

//-------------------------------------------------------------------------------------------------------------------------------------------------------------

// PUT
// put to update using id

app.put("/info/:_id", async (req, res) => {
  console.log(req.params._id);
  const data = await Employees.updateOne(
    {_id:req.params._id}, //condition
    {
      $set: req.body, //set value
    }
  );

  res.send(data);
});

//put to update using name
app.put("/info/:name", async (req, res) => {
  console.log(req.params.name);
  const data = await Employees.updateOne(
    { name: req.params.name }, //condition
    {
      $set: req.body, //set value
    }
  );

  res.status(200).send(data);
});


//-------------------------------------------------------------------------------------------------------------------------------------------------------------
