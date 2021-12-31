const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema
(
    {
        title :
        {
            type     : String,
            required : true
        },
        date :
        {
            type     : Date, 
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
        poster:
        {
            type     : Buffer,
            required : true
        },
        noOfSeats :
        {
            type     : Number,
            required : true
        },
        noOfSeatsAva:   //no of seat available
        {
            type     : Number,
            required : true
        }
       
    } , { timestamps : true}
);


const Movie = mongoose.model("Movie", movieSchema);
//Here, "Movie" is the collection (table) name. However, mongoose pluralise the name so it
//will search form "Movies" instead in the collections.

//Export the model to use it everywhere in the project
module.exports = Movie;