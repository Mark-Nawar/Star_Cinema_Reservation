const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reservationSchema = new Schema
(
    {
        user :
        {
            type        : mongoose.Types.ObjectId,
            required    : true,
            ref         : "User"
        },
        movie :
        {
            type        : mongoose.Types.ObjectId,
            required    : true,
            ref         : "MoiveEvent"
        },
        occupiedSeats : 
        [
            {

                type        : Number,
                required    : false
            }
        ],
        
    }
);

const Reservation = mongoose.model("Reservation", reservationSchema);
//Here, "Reservation" is the collection (table) name. However, mongoose pluralise the name so it
//will search form "Reservations" instead in the collections.

//Export the model to use it everywhere in the project
module.exports = Reservation;