const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieEventSchema = new Schema
(
    {
        movie :
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
        startTime :
        {
            type     : Number,
            required : true
        },
        endTime :
        {
            type     : Number,
            required : true
        },
        screeningRoom :
        {
            type     : Number,
            required : true
        },
        // noOfSeats :
        // {
        //     type     : Number,
        //     required : true
        // },
        occuSeats:   //no of seat available
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