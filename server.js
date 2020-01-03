const express = require('express');
const app = express();

// Middleware utilities
const bodyParser = require("body-parser");
const morgan = require('morgan');
const cors = require("cors");
const colors = require("colors");

// Mongoose 
const mongoose = require('mongoose');

// Config variables
require('dotenv').config();


//Connecting to the database
mongoose.promise = global.Promise;
mongoose.connect(process.env.MongoURI,{useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true}, (err,db)=> {
    if(err)
    console.log(err);

    else
    console.log('Database Connected...'.blue.bold);
});


// Getting data in json format
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())

app.use(morgan('dev'));
app.use(cors());

/*
app.get("/", (req, res) => {
    res.send("App running")
})
*/


// Starting the server
app.listen(process.env.PORT || 5000, ()=>{
    console.log(`Server started on port ${process.env.PORT || 5000}`.blue.bold);
});
