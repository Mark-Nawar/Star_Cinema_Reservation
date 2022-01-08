const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema
(
    {
        name : //name
        {
            type     : String,
            required : true
        },
        
        movieImage: //movieImage
        {
            type     : String,
            required : true
        },
        category :
        {
            type     : String,
            required : true
        }
       
    } , { timestamps : true}
);


const Movie = mongoose.model("Movie", movieSchema);
//Here, "Movie" is the collection (table) name. However, mongoose pluralise the name so it
//will search form "Movies" instead in the collections.

//Export the model to use it everywhere in the project
module.exports = Movie;