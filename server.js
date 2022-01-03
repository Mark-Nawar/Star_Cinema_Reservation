//Require Express package
const express = require("express");

const jwt = require("jsonwebtoken");

jwt.verify
const CryptoJS = require("crypto-js");

//Require mogoose for mongoDB
const mongoose = require("mongoose");

//Require User model 
const User  = require("./models/users");
const Movie = require("./models/movies");
const MovieEvent = require("./models/movieEvent");

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
            console.log(tok);

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

app.get("/movie", async (req,res)=>
{
    let id = req.body.id;

    let temp = await searchMovieCustomID(id);
    console.log(  temp  );

    
});

app.get("/addMovie", async (req,res)=>
{
    let id          = req.body.id;
    let title       = req.body.title;
    let poster      = req.body.poster;
    let category    = req.body.category; 

    let done = await addMovie(id,title,poster,category);

    if (done)
    {
        res.send("Movie added");
    }
    else
    {
        res.send("Movie was NOT added");
    }
});

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
        "username" : username
    }
    var stringifiedPayload = CryptoJS.enc.Utf8.parse(JSON.stringify(payload));

    var token =  base64url(stringifiedHeader) + "." + base64url(stringifiedPayload);
    
    var sign = CryptoJS.HmacSHA256(token, secretStr);
    var signCo = base64url(sign);
    var sToken = token + "." + signCo;

    return sToken;

};

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
        console.log("User with email ",user.email, " was added");
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

const base64url =  (source) => 
{
    encodedSource = CryptoJS.enc.Base64.stringify(source);
  
    encodedSource = encodedSource.replace(/=+$/, '');
    encodedSource = encodedSource.replace(/\+/g, '-');
    encodedSource = encodedSource.replace(/\//g, '_');
  
    return encodedSource;
};

const searchMovie = async(id,title) =>
{
    let resultId;
    let resultTitle;

    try
    {
        resultId        = await Movie.findOne({id       : id});
        resultTitle     = await Movie.findOne({title    : title});

        if ( resultId != null || resultTitle != null)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    catch (err)
    {
        console.log(err);
    }
};

const searchMovieCustomID = async(id) =>
{
    let resultId;

    try
    {
        resultId        = await Movie.findOne({id       : id});
        return resultId;
        
    }
    catch (err)
    {
        console.log(err);
    }
};

const addMovie = async(id, title, poster, category ) =>
{
    if ( await searchMovie(id,title))
    {
        return false;
    }

    const movie = new Movie
    ({
        id          : id,
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

const addMovieEvent = async(movieId, date, sTime, eTime, screenRoom, seatAvailable) =>
{
    //get _id for the movie
    let objID           = await searchMovieCustomID(movieId);
    if (objID == null)
    {
        return -3;  //movie does not exists
    }

    //If event exists, return false
    let result = await searchMovieEvent(objID,date,sTime,eTime,screenRoom,seatAvailable);
    if (result != null)
    {
        return -2;  //event exists
    }

    

    const movieEvent = new MovieEvent
    ({
        movie           : objID,
        date            : date,
        startTime       : sTime,
        endTime         : eTime,
        screeningRoom   : screenRoom,
        seatsAva        : seatAvailable
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