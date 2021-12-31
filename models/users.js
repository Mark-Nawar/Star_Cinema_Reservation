const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema
(
    {
        username :
        {
            type     : String,
            required : true
        },
        password :
        {
            type     : String,
            required : true
        },
        email :
        {
            type     : String,
            required : true
        },
        firstName:
        {
            type     : String,
            required : true
        },
        lastName:
        {
            type     : String,
            required : true
        },
        role:
        {
            type     : Number,
            required : true
        }
    }     , { timestamps : true}
);


const User = mongoose.model("User", userSchema);
//Here, "User" is the collection (table) name. However, mongoose pluralise the name so it
//will search form "Users" instead.

//Export the model to use it everywhere in the project
module.exports = User;