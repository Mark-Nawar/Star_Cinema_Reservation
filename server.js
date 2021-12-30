//Require Express package
const express = require("express");

//Require mogoose for mongoDB
const mongoose = require("mongoose");


//Create a server from Express
const app = express();


//Port number to listen to
const port = process.env.PORT || 5000;


//Connect to mongoDB
const dbURI = 'mongodb+srv://cinema:star123@cluster0.l3vsk.mongodb.net/cinema?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(  (result) => 
{
    //If connected successfully, listen to the port
    console.log("Connected to DB");
    app.listen(port, (req,res)=>
    {
        console.log(`Listening to port ${port}`);
    })
})
.catch( (err)    => console.log("ERROR ", err)      );


