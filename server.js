//Require Express package
const express = require("express");

//Require JSON Web Token
const jwt = require("jsonwebtoken");

//jwt.verify
const CryptoJS = require("crypto-js");

//Require mogoose for mongoDB
const mongoose = require("mongoose");

const cors = require("cors");

//Require User model 
const User  = require("./models/users");
const Movie = require("./models/movies");
const MovieEvent = require("./models/movieEvent");
const Reservation = require("./models/reservations");
const { find } = require("./models/users");

const secretStr = "C++ Fo2";

//Create a server from Express
const app = express();

//Port number to listen to
const port = process.env.PORT || 5000;


//To recognize incoming input as json object
app.use(express.json());

app.use(cors());

//To be able to read from req.body
app.use(express.urlencoded({ extended: true }));


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









//====================================="User"==================================================
app.post("/signin", async (req,res)=>
{
    let jtoken      = req.headers["x-access-token"];

    let userName;
    let password;

    if(jtoken != null)
    {
        try
        {
            let decodedToken = await jwt.verify(jtoken, secretStr);

            let username1   = decodedToken.username;
            let userID      = await searchUserUsername(username1);
            if (userID == null)
            {
                res.send("Wrong token");
                return;
            }


            userName = userID.username;
            password = userID.password;

            res.send("User already signed in");

        }
        catch(err)
        {
            res.send("Unverified token");
            console.log(err);
        }
    }
    else
    {
        userName = req.body.username;
        password = req.body.password;
    }

   

    try
    {
        let result = await User.findOne({ username : userName, password : password});
        if (result != null)
        {
            //Create token and send it
            let tok =  await createToken(userName, result.role);
            //console.log(tok);

            //Send token

            res.json({token:tok,role:result.role});
        }
        else
        {
            res.send("Invalid username or password");
        }
    }
    catch(err)
    {
        console.log(err);
    };
});

app.post("/signup", async (req,res)=>
{
    let userName    = req.body.username;
    let password    = req.body.password;
    let email       = req.body.email;
    let fName       = req.body.firstName;
    let lName       = req.body.lastName;
    let role        = req.body.role;
   
    let found = await searchUser(email, userName);
    if ( found )
    {
        //Cannot add user
        res.send("CANNOT add user");
        return;
    }
    else
    {
        //Add user
        await addUser(userName, email, password, fName, lName, role);

        let tok =  await createToken(userName, role);
        //console.log(tok);

        //Send token
        res.send(tok);
    }
});

app.post("/addUser", async(req,res)=>
{
    let jtoken  = req.headers["x-access-token"];

    if (jtoken != null)
    {
        try
        {
            let decodedToken = await jwt.verify(jtoken, secretStr);

            let role = decodedToken.role;
            if(role != 2)
            {
                //Manager role = 2
                res.send("Not manager");
            }

            let userName    = req.body.username;
            let password    = req.body.password;
            let email       = req.body.email;
            let fName       = req.body.firstName;
            let lName       = req.body.lastName;
            let roleNew     = req.body.role;

            let found = await searchUser(email, userName);
            if ( found )
            {
                //Cannot add user
                res.send("CANNOT add user");
                return;
            }
            else
            {
                //Add user
                await addUser(userName, email, password, fName, lName, roleNew);

                res.send("User added");
            }

        }
        catch(err)
        {
            res.send("Unverified token");
            console.log(err);
        }
    }
    else
    {
        res.send("No token");
    }

});




const addUser = async ( userName, email, password, fName, lName, role) =>
{
    const user = new User
    (
        {
            username    : userName,
            password    : password,
            email       : email,
            firstName   : fName,
            lastName    : lName,
            role        : role

        }
    );
    
    //add user to the collection
    try 
    {    
        await user.save();
        //console.log("User with email ",user.email, " was added");
    }
    catch(err)
    {
        console.log(err);
    };
};

const searchUser = async (email, username) =>
{

    let resultusername;
    let resultemail;
    try 
    {
        resultemail     =   await User.findOne({email       : email});
        resultusername  =   await User.findOne({username    : username});

        if (resultemail != null || resultusername != null )
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    catch(err)
    {
        console.log(err);
    };
};

const searchUserUsername = async (username) =>
{
    try 
    {
        return await User.findOne({username : username});
    }
    catch (err)
    {
        console.log(err);
    }
};

const searchUserReser = async (username) =>
{
    try
    {
        let user = await searchUserUsername(username);
        if (username == null)
        {
            return null;
        }

        return await searchMovieEventByUserID(user._id);

    }
    catch(err)
    {
        console.log(err);
    }
};
//=====================================================================================





//====================================="MovieEvent" Collection==============================


app.post("/addMovieEvent", async (req,res)=>
{
    let movieId         = req.body.id;
    let date            = req.body.date;
    let S_time          = req.body.S_time;
    let E_time          = req.body.E_time;
    let gridType        = req.body.gridType;
    let occupied        = req.body.occupied;

    let jtoken          = req.headers["x-access-token"];
    if (jtoken != null)
    {
        try
        {
            let decodedToken = await jwt.verify(jtoken, secretStr);

            
            let role         = decodedToken.role;
            if (role != 2)
            {
                res.send("Not manager");
            }

            let done            = await addMovieEvent(movieId,date, S_time, E_time, gridType, occupied);

            if (done == 0)
            {
                res.send("Movie event added");
            }
            else if (done == -1)
            {
                res.send("Movie event Overlapping");
            }
            else if (done == -2)
            {
                res.send("Movie event exists");
            }
            else if (done == -3)
            {
                res.send("Movie does NOT exists");
            }
            else
            {
                res.send("Movie event was NOT added");
            }

        }
        catch(err)
        {
            res.send("Unverified token");
            console.log(err);
        }
    }
    else
    {
        res.send("No token");
    }

    
    
});

app.get("/movieEvents/:movieID", async (req,res)=>
{
    let movieID = req.params.movieID;

    //Get all MovieEvent for the id
    res.send(await searchMovieEventByMovieID(movieID) );
});

app.post("/movieEvents/", async (req,res)=>
{
    //Reserve MovieEvent

    //================TODO==============TO BE TESTED
    let movieEventID    = req.body.movieEventID;
    let seats           = req.body.seats;

    //get token
    let token = req.headers["x-access-token"];
    
    try
    {
        let decodedToken = jwt.verify(token, secretStr);

        
        let username1   = decodedToken.username;
        let userID      = await searchUserUsername(username1);
        if (userID == null)
        {
            res.send("CANNOT reserve");
            return;
        }

        let movieEvent  = await searchMovieEventByID(movieEventID);
        if (movieEvent == null)
        {
            res.send("CANNOT reserve");
            return;
        }


        let resv = new Reservation
        ({
            user            : userID._id,
            movieEvent      : movieEventID,
            occupied        : seats

        });

        
        await resv.save();

        //Add occupied seats to the movieEvent
        let newOccu = seats.concat(movieEvent.occupied)
        //newOccu += seats;
        
        await MovieEvent.findByIdAndUpdate(movieEventID, {occupied : newOccu});

        res.send("Reserved");
       
    }
    catch(err)
    {
        if (err)
        {
            res.redirect("/signin");
            return;
        }
    }
});

app.post("/deleteMovieEvent/:movieEventID",async (req,res) => 
{

    let jToken = req.headers["x-access-token"];
    let role = checkToken(jToken,secretStr);

    let movieEventId = req.params.movieEventID;

    if (role == -1)             //Unverified
    {
        res.send("Unverified");
        return;
    }
    else if (role != 2)         //Not a manager
    {
        res.send("Not Manager");
        return;
    }
    else                        //Manager
    {
        
    
        try
        {
           let deleted = await deleteMovieEvent(movieEventId);
           if (deleted == -1)
           {
               res.send("Could not delete Movie Event");
           }
           else
           {
               res.send("Deleted");
           }
        }
        
        catch (err)
        {
            console.log(err);
            return;
        }   
    }

});

app.post('/editMovieEvent',async(req,res)=>{
    let jToken = req.headers["x-access-token"];
    let role = checkToken(jToken,secretStr);

    let movieEventId = req.params.movieEventID;

    if (role == -1)             //Unverified
    {
        res.send("Unverified");
        return;
    }
    else if (role != 2)         //Not a manager
    {
        res.send("Not Manager");
        return;
    }
    else                        //Manager
    {
        
    
        try
        {
           let deleted = await deleteMovieEvent(movieEventId);
           if (deleted == -1)
           {
               res.send("Could not delete Movie Event");
           }
           else
           {
               res.send("Deleted");
           }
        }
        
        catch (err)
        {
            console.log(err);
            return;
        }   
    }
});

const searchMovieEvent = async(movieId, date, sTime, eTime, gridType) =>
{
    try
    {
        let result = await MovieEvent.findOne
        ({
            M_id           : movieId, 
            date            : date,  
            S_time       : sTime, 
            E_time         : eTime,
            gridType   : gridType
        });
        return result;
    }
    catch (err)
    {
        console.log(err);
        return null;
    }
};

const searchMovieEventByID = async(eventID) =>
{
    try
    {
        return await MovieEvent.findById(eventID);
    }
    catch (err)
    {
        console.log(err);
        return null;
    }
};


const addMovieEvent = async(movieId, date, sTime, eTime, screenRoom, occupied) =>
{
    //get _id for the movie
    let objID           = await searchMovieID(movieId);///========================================================
    if (objID == null)
    {
        return -3;  //movie does not exists
    }

    //If event exists, return false
    let result = await searchMovieEvent(objID._id,date,sTime,eTime,screenRoom,occupied);
    if (result != null)
    {
        return -2;  //event exists
    }

    

    const movieEvent = new MovieEvent
    ({
        M_id            : objID._id,
        date            : date,
        S_time          : sTime,
        E_time          : eTime,
        gridType        : screenRoom,
        occupied        : occupied
    });

    let checkAdd = await checkIfCanAddEvent(date, sTime, eTime, screenRoom);

    if( checkAdd == -1)
    {
        return -1;
    }

    try
    {
        await movieEvent.save();
        return 0;   //no error
    }
    catch (err)
    {
        console.log(err);
        return -1;  //error
    }
};

const searchMovieEventByMovieID = async (movieID) =>
{
    try
    {
        return await MovieEvent.find({M_id : movieID});
    }
    catch(err)
    {
        console.log(err);
        return null;
    }
};


const checkIfCanAddEvent = async (date,S_time,E_time,gridType)=>
{
    
    let movies = await MovieEvent.find( {date : date, gridType : gridType});

    let overlap = false;
    movies.forEach(element => 
    {
        // console.log("movie sTime : ", element.S_time, "MOvie eTime : ", element.E_time);
        // console.log("sTime : ", S_time, "eTime : ", E_time);
        if ( (between(S_time,element.S_time,E_time) 
            || between(S_time,element.E_time,E_time) ) 
            || (between(element.S_time,S_time,element.E_time) 
            || between(element.S_time,E_time,element.E_time)))
        {
            //Overlapping
            overlap = true;
        }
    });

    if (overlap)
    {
        return -1;
    }

    return 0;

};


const searchMovieEventByUserID = async (userID) =>
{
    //Returns an array of movie events that are associated with this userID
    try
    {
        return await Reservation.find({user : userID});
    }
    catch(err)
    {
        console.log(err);
        return null;
    }
};

const deleteMovieEvent = async (movieEventId) =>
{
    let delCountRes = await Reservation.deleteMany(
        {
            movieEvent : movieEventId
        }
    );   

    let deleted = await MovieEvent.findByIdAndDelete(movieEventId); 

    if (delCountRes.deletedCount == 0 && deleted == null)
    {
        return -1;
    }
    else
    {
        return 0;
    }
};


const editMovieEvent = async (editedMovieEvent) =>{
    
    
};

//=====================================================================================







//====================================="Movie" Collection==============================

app.get("/searchMovie", async (req,res)=>
{
    let movieId = req.body.id;

    //retruns null if movie not found
    res.send( await searchMovieID(movieId));
});

app.get("/searchMovieAll", async (req,res)=>
{
    let name       = req.body.name;
    let category    = req.body.category;

    //retruns null if movie not found
    res.send( await searchMovieAll(name,category));
});

app.get("/searchMovieCat", async (req,res)=>
{
    let category = req.body.category;

    res.send(await searchMovieCat(category));
});

app.post("/addMovie", async (req,res)=>
{
    let name       = req.body.name;
    let movieImage      = req.body.movieImage;
    let category    = req.body.category; 

    let jtoken          = req.headers["x-access-token"];
    if (jtoken != null)
    {
        try
        {
            let decodedToken = await jwt.verify(jtoken, secretStr);

            
            let role         = decodedToken.role;
            if (role != 2)
            {
                res.send("Not manager");
                return;
            }
            
            let done = await addMovie(name,movieImage,category);

            if (done)
            {
                res.send("Movie added");
            }
            else
            {
                res.send("Movie was NOT added");
            }
        }
        catch(err)
        {
            res.send("Unverified token");
            console.log(err);
        }
    }
    else
    {
        res.send("No token");
    }

    
});

app.get("/movies/:movieCat", async (req,res)=>
{
    let movieCat = req.params.movieCat;

    res.send(await searchMovieCat(movieCat));
});


app.post("/editMovie", async(req,res)=>
{
    //name, movieImage and category
    let movieID        = req.body.movieID;
    let name            = req.body.name;
    let newmovieImage   = req.body.movieImage;
    let newCategory    = req.body.category;

    try
    {
        await Movie.findByIdAndUpdate(movieID, 
        {
            name           : name,
            movieImage      : newmovieImage,
            category    : newCategory
        });
        res.send("Updated");
    }
    catch (err)
    {
        res.send("Error");
        console.log(err);
    }

});

app.post("/deleteMovie/:movieID", async(req,res)=>
{
    let jToken          = req.headers["x-access-token"];
    console.log(jToken);
    let role            = checkToken(jToken,secretStr);


    let movieID = req.params.movieID;


    console.log(role);

    if (role == -1)             //Unverified
    {
        res.send("Unverified");
        return;
    }
    else if (role != 2)         //Not a manager
    {
        res.send("Not Manager");
        return;
    }
    else                        //Manager
    {

        

        try
        {
            let docs = await Movie.findByIdAndRemove(movieID);
            if (docs == null)
            {
                res.send("Movie not found");
                return;
            }
            else
            {
                
                let movieEventsOfMovieId = await MovieEvent.find(
                    {
                        M_id : movieID //change schema name 1
                    }
                    );
                    
                    for (let i = 0; i < movieEventsOfMovieId.length; i++)
                    {
                        let MovieEventID = movieEventsOfMovieId[i]._id;
                        await deleteMovieEvent(MovieEventID);
                    }

                    res.send("Deleted");
                    
                    return;
            }
        }
        catch(err)
        {
            console.log(err);
            res.send("Error");
            return;
        }
    }
});

const searchMovieID = async(id) =>
{
    let resultId;

    try
    {
        resultId        = await Movie.findById(id);
        return resultId;
    }
    catch (err)
    {
        console.log(err);
        return null;
    }
};

const searchMovieAll = async(name, category) =>
{
    try
    {
        return await Movie.findOne({name : name, category : category});
    }
    catch (err)
    {
        console.log(err);
        return null;
    }
};

const seachResrveOfMovie = async(username, movieID) =>
{
    let userObjID = await searchUserUsername(username);

    if (userObjID == null)
    {
        return null;
    }

    return await Reservation.find({user : userObjID._id, movie : movieID});
    //console.log(userObjID._id.toString(), movieObjID._id.toString());
};

const searchMovieCat = async(category) =>
{
    try
    {
        return await Movie.find({category : category});
    }
    catch(err)
    {
        console.log(err);
    }
};

const addMovie = async(name, movieImage, category ) =>
{
    if ( await searchMovieAll(name, category) != null)
    {
        return false;
    }

    const movie = new Movie
    ({
        name       : name,
        movieImage      : movieImage,
        category    : category
    });

    try
    {
        await movie.save();
        return true;
    }
    catch (err)
    {
        console.log(err);
        return false;
    }
};

//===========================================================================================


//====================================="Reservation" Collection==============================

app.post("/deleteReservation", async (req,res) =>
{
    let jToken          = req.headers["x-access-token"];
    let role            = checkToken(jToken,secretStr);
    let movieEventID    = req.body.movieEventID;
    let user            = req.body.userID;
    let occupied       = req.body.occupied;

    if (role == -1)             //Unverified
    {
        res.send("Unverified");
        return;
    }
    // else if (role != 2)         //Not a manager
    // {
    //     res.send("Not Manager");
    //     return;
    // }
    else                        //Manager
    {
        let found = await deleteReservation(movieEventID,user,occupied);
        
        if (found == 0)         //Found
        {
            res.send("Reservation Deleted");
            return;
        }
        else                    //Not found
        {
            res.send("Reservation not found");
            return;
        }

    }

});

app.get("/viewReser", async (req,res) =>
{
    let jtoken = req.headers["x-access-token"];

    if(jtoken != null)
    {
        try
        {
            let decodedToken = await jwt.verify(jtoken, secretStr);

            let username1   = decodedToken.username;
            let userID      = await searchUserUsername(username1);
            if (userID == null)
            {
                res.send("Wrong token");
                return;
            }

            let resrv = await searchUserReser(username1);

            res.send(resrv);
           

        }
        catch(err)
        {
            res.send("Unverified token");
            console.log(err);
        }
    }
    else
    {
        res.redirect("/signin");
    }
});

app.post("/reserve/", async (req,res) =>
{
    let jtoken          = req.headers["x-access-token"];
    let movieEventID    = req.body.movieEventID;
    let occupied       = req.body.occupied;

    if(jtoken != null)
    {
        try
        {
            let decodedToken = await jwt.verify(jtoken, secretStr);

            let username1   = decodedToken.username;
            let userID      = await searchUserUsername(username1);
            if (userID == null)
            {
                res.send("Wrong token");
                return;
            }

            console.log(occupied, movieEventID);
            let resrv = await addReservation(movieEventID,userID._id,occupied );

            if (resrv == 0)
            {
                res.send("Reserved successfully");
            }
            else
            {
                res.send("CANNOT reserve");
            }
           

        }
        catch(err)
        {
            res.send("Unverified token");
            console.log(err);
        }
    }
    else
    {
        res.redirect("/signin");
    }    
});

const addReservation = async (movieEventID, userID, occupied) =>
{
    console.log("accupied",occupied);
    const newRes = new Reservation 
    ({
        user            : userID,
        movieEvent      : movieEventID,
        occupied        : occupied
    });

    let found = await Reservation.find(
    {
        movieEvent      : movieEventID
    });

    let clash = false;
    if (found != null)
    {
        found.forEach(reservation => 
        {
            reservation.occupied.forEach(occu => 
            {
                occupied.forEach(currentSeat =>
                    {
                        if (currentSeat == occu)
                            clash = true;
                    });
            });
        });

        if (clash)    
            return -1;
    }
    try
    {
        console.log(newRes);
        await newRes.save();
        
        let movieEventSeats = await MovieEvent.findById(movieEventID);
        console.log(movieEventSeats);
        let seats = movieEventSeats.occupied;

        console.log("Seats",seats);
        
        let updatedSeats = [...seats,...occupied];
        
        console.log(updatedSeats);
        
        await MovieEvent.findByIdAndUpdate(movieEventID,
        {
            occupied : updatedSeats //change schema name 2
        });

        return 0;
    }
    catch (err)
    {
        console.log(err);
        return -1;
    }
};

const searchReservation = async(movieEventID, userID) =>
{
    return await Reservation.find(
    {
        user            : userID,
        movieEvent      : movieEventID
    });

};

const deleteReservation = async (movieEventID, userID, occupied) =>
{
    try
    {
        let docs1 = await Reservation.findOne(
            {
                user            : userID,
                movieEvent      : movieEventID,
            });
            console.log(docs1);
        let docs = await Reservation.findOneAndDelete(
        {
            user            : userID,
            movieEvent      : movieEventID,
            occupied   : occupied
        });

        if (docs != null)
        {
            let oldEvent = await MovieEvent.findById(movieEventID);

            let oldSeats = oldEvent.occupied;
            let newSeats = oldSeats.filter(n => !docs.occupied.includes(n));
            // for(let i = 0; i< docs.occupied.length; i++){

            //     const index = oldSeats.indexOf(occupied[i]);
            //     if (index > -1) {
            //     array.splice(index, occupied[i]);
            // }
            // }
            console.log(occupied);
            await MovieEvent.findByIdAndUpdate(movieEventID, {occupied : newSeats}); //change schema name moivieevent 3


            return 0;
        }
        else
        {
            return -1;
        }
    }
    catch (err)
    {
        console.log(err);
    }
};


//===========================================================================================

//==========================================Administrator==================================
app.post('/approveAuthority', async(req,res)=>{
    
    let jToken          = req.headers["x-access-token"];
    console.log(jToken);
    let role            = checkToken(jToken,secretStr);


    let movieID = req.params.movieID;


    console.log(role);

    if (role == -1)             //Unverified
    {
        res.send("Unverified");
        return;
    }
    else if (role != 2)         //Not a manager
    {
        res.send("Not Manager");
        return;
    }
    else                        //Manager
    {

        

        try
        {
            
        }
        catch(err)
        {
            console.log(err);
            res.send("Error");
            return;
        }
    }




});

//===========================================================================================

//=====================================منوعات========================================

const createToken = async (username, role)=>
{
    var header = 
    {
        "alg": "HS256",
        "typ": "JWT"
    };

    var stringifiedHeader = CryptoJS.enc.Utf8.parse(JSON.stringify(header));

    var currentDate = Math.round(Date.now() / 1000) + 1800;
    //console.log(currentDate);
    var payload = 
    {
        "username" : username,
        //Exp is the no of seconds from 1-1-1970
        "exp"       : currentDate,
        "role"      : role
    }
    var stringifiedPayload = CryptoJS.enc.Utf8.parse(JSON.stringify(payload));

    var token =  base64url(stringifiedHeader) + "." + base64url(stringifiedPayload);
    
    var sign = CryptoJS.HmacSHA256(token, secretStr);
    var signCo = base64url(sign);
    var sToken = token + "." + signCo;

    return sToken;

};

const base64url =  (source) => 
{
    encodedSource = CryptoJS.enc.Base64.stringify(source);
  
    encodedSource = encodedSource.replace(/=+$/, '');
    encodedSource = encodedSource.replace(/\+/g, '-');
    encodedSource = encodedSource.replace(/\//g, '_');
  
    return encodedSource;
};



const between = (a, b, c) =>
{
	return ((a <= b) && (b < c)) || ((c < a) && (a <= b)) || ((b < c) && (c < a));
}

const checkToken = (jToken,secretStr) =>
{
    try
    {
        let decodedToken = jwt.verify(jToken,secretStr);
        return decodedToken.role;
    }
    catch (err)
    {
        console.log(err);
        return -1;
    }
};




//To add record (row) to the database
/*
    //The following lines should be inside a app.get()
    //Create a new instance of User
    const user = new User 
    (
        {
            id : 1,
            username : ahmed,
            password : test
        }
    );

    //Send the instance to the DB
    user.save()
    .then((result)=>
    {
        console.log("Instance added");
    })
    .catch((err)=>
    {
        console.log(err);
    });
*/

//To get a record (row) from the DB
/*
    //The following lines should be inside a app.get()
    User.find()         --> Return all the records (rows)
    .then((result)=>
    {
        console.log(result);
    })
    .catch((err)=>
    {
        console.log(err);
    });

    User.findById("id")     --> Return a record with __id = id.Note: this ID is auto generated by mongoDB. It is bot "id" in the schema)
    .then((result)=>
    {
        console.log(result);
    })
    .catch((err)=>
    {
        console.log(err);
    });
    

*/