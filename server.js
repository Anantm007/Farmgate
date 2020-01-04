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

// Dev Middleware
app.use(morgan('dev'));
app.use(cors());

// Test route
app.get("/api", (req, res) => {
    res.json({
        message: "API running"
    });
})

// Mounting the routes
app.use('/api/shop/auth', require('./routes/shopAuth'));
app.use('/api/shops', require('./routes/shop'));
app.use('/api/user/auth', require('./routes/userAuth'));
app.use('/api/users', require('./routes/user'));

// Starting the server
app.listen(process.env.PORT || 5000, ()=>{
    console.log(`Server started on port ${process.env.PORT || 5000}`.blue.bold);
});
