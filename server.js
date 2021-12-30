//Require Express package
const express = require("express");


//Create a server from Express
const app = express();

//Port number to listen to
const port = process.env.PORT || 5000;

app.listen(port, (req,res)=>
{
    console.log(`Listening to port ${port}`);
})