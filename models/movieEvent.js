const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieEventSchema = new Schema
(
    {
        M_id : //M_id
        {
            type        : mongoose.Types.ObjectId,
            required    : true,
            ref         : "Movie"
        },
        date :
        {
            type     : String, 
            required : true
        },
        S_time : //S_time
        {
            type     : String,
            required : true
        },
        E_time : //E_time
        {
            type     : String,
            required : true
        },
        gridType : //gridType
        {
            type     : Number,
            required : true
        },
        // noOfSeats :
        // {
        //     type     : Number,
        //     required : true
        // },
        occupied:   //no of seat available //occupied
        [
            {
            type     : Number,
            required : true
            }
        ]
        
    }
);

const MoiveEvent = mongoose.model("MovieEvent", movieEventSchema);
//Here, "MoiveEvent" is the collection (table) name. However, mongoose pluralise the name so it
//will search form "MoiveEvents" instead in the collections.

//Export the model to use it everywhere in the project
module.exports = MoiveEvent;