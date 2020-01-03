const express = require('express');
const app = express();

const colors = require("colors");
const mongoose = require('mongoose');
require('dotenv').config();


//Connecting to the database
mongoose.promise = global.Promise;
mongoose.connect(process.env.MongoURI,{useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true}, (err,db)=> {
    if(err)
    console.log(err);

    else
    console.log('Database Connected...'.blue.bold);
});


/*
// routes
app.use(require('./routes/index.js'));
*/


// Starting the server
app.listen(process.env.PORT || 5000, ()=>{
    console.log(`Server started on port ${process.env.PORT || 5000}`.blue.bold);
});
