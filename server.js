//Require Express package
const express = require("express");

//Require JSON Web Token
const jwt = require("jsonwebtoken");

jwt.verify
const CryptoJS = require("crypto-js");

//Require mogoose for mongoDB
const mongoose = require("mongoose");

//Require User model 
const User  = require("./models/users");
const Movie = require("./models/movies");
const MovieEvent = require("./models/movieEvent");
const Reservation = require("./models/reservations");

const secretStr = "C++ Fo2";

//Create a server from Express
const app = express();

//Port number to listen to
const port = process.env.PORT || 5000;


//To recognize incoming input as json object
app.use(express.json());

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









// app.get("/searchRes", async (req,res)=>
// {
//     let username = req.body.username;
//     let movieId = req.body.id;

//     res.send(await seachResrv(username, movieId));
// });

//====================================="MovieEvent" Collection==============================

app.get("/addMovieEvent", async (req,res)=>
{
    let movieId         = req.body.id;
    let date            = req.body.date;
    let startTime       = req.body.startTime;
    let endTime         = req.body.endTime;
    let screeningRoom   = req.body.screeningRoom;
    let seatsAva        = req.body.seatsAva;

    
    let done            = await addMovieEvent(movieId,date, startTime, endTime, screeningRoom, seatsAva);

    if (done == 0)
    {
        res.send("Movie event added");
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
});

app.get("/movieEvents/:movieID", async (req,res)=>
{
    let movieID = req.params.movieID;

    //Get all MovieEvent for the id
    res.send(await searchMovieEventByMovieID(movieID) );
});

app.post("/movieEvents/:movieEventID", async(req,res)=>
{
    //Reserve MovieEvent

    //================TODO==============TO BE TESTED
    let movieEventID    = req.params.movieEventID;
    let seats           = req.body.seats;

    //get token
    let token = req.headers["x-access-token"];
    let {err,Token} = await jwt.verify(token, secretStr);
    
    if(err)
    {
        console.log(err);
        res.send("Error in token");
    }
    else
    {
        res.send(Token);
    }

});

const searchMovieEvent = async(movieId, date, sTime, eTime, screeningRoom) =>
{
    try
    {
        let result = await MovieEvent.findOne
        ({
            movie           : movieId, 
            date            : date,  
            startTime       : sTime, 
            endTime         : eTime,
            screeningRoom   : screeningRoom
        });
        return result;
    }
    catch (err)
    {
        console.log(err);
        return null;
    }
};

const addMovieEvent = async(movieId, date, sTime, eTime, screenRoom, occuSeats) =>
{
    //get _id for the movie
    let objID           = await searchMovieID(movieId);///========================================================
    if (objID == null)
    {
        return -3;  //movie does not exists
    }

    //If event exists, return false
    let result = await searchMovieEvent(objID._id,date,sTime,eTime,screenRoom,occuSeats);
    if (result != null)
    {
        return -2;  //event exists
    }

    

    const movieEvent = new MovieEvent
    ({
        movie           : objID._id,
        date            : date,
        startTime       : sTime,
        endTime         : eTime,
        screeningRoom   : screenRoom,
        occuSeats        : occuSeats
    });

    

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
        return await MovieEvent.find({movie : movieID});
    }
    catch(err)
    {
        console.log(err);
        return null;
    }
};

//=====================================================================================



//====================================="User"==================================================
app.post("/signin", async (req,res)=>
{
    let userName = req.body.username;
    let password = req.body.password;

    try
    {
        let result = await User.findOne({ username : userName, password : password});
        if (result != null)
        {
            //Create token and send it
            let tok =  await createToken(userName);
            //console.log(tok);

            //Send token
            res.send(tok);
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
        res.send("User added");
    }
});

app.get("/searchUser", async (req,res)=>
{
    res.sendFile("./form.html", {root : __dirname});
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


    }
    catch(err)
    {

    }
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
    let title       = req.body.title;
    let category    = req.body.category;

    //retruns null if movie not found
    res.send( await searchMovieAll(title,category));
});

app.get("/searchMovieCat", async (req,res)=>
{
    let category = req.body.category;

    res.send(await searchMovieCat(category));
});

app.get("/addMovie", async (req,res)=>
{
    let title       = req.body.title;
    let poster      = req.body.poster;
    let category    = req.body.category; 

    let done = await addMovie(title,poster,category);

    if (done)
    {
        res.send("Movie added");
    }
    else
    {
        res.send("Movie was NOT added");
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

const searchMovieAll = async(title, category) =>
{
    try
    {
        return await Movie.findOne({title : title, category : category});
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

const addMovie = async(title, poster, category ) =>
{
    if ( await searchMovieAll(title, category) != null)
    {
        return false;
    }

    const movie = new Movie
    ({
        title       : title,
        poster      : poster,
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

//==========================================================================



const createToken = async (username)=>
{
    var header = 
    {
        "alg": "HS256",
        "typ": "JWT"
    };

    var stringifiedHeader = CryptoJS.enc.Utf8.parse(JSON.stringify(header));

    var payload = 
    {
        "username" : username,
        //"exp"       : /////////========================================
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