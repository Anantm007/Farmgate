const express = require('express');
const app = express();

// Middleware utilities
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const bodyParser = require("body-parser");
const morgan = require('morgan');
const cors = require("cors");
const colors = require("colors");

const path = require('path'); 

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
app.use(bodyParser.json())

// API SECURITY
app.use(mongoSanitize());   // Sanitize Data
app.use(helmet());          // Set security headers
app.use(xss())              // Prevent XSS(cross site scripting) attacks
app.use(hpp());             // Prevent hpp param pollution
app.use(cors());    // Enable CORS

// Rate Limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 100 // 100 requests per 10 minutes per IP address
})
app.use(limiter);


// Dev Middleware
//app.use(morgan('dev'));

// Test route
app.get("/api", (req, res) => {
    res.json({
        message: "API running"
    });
})

// Mounting the routes
app.use('/api/shop/auth', require('./routes/shopAuth'));
app.use('/api/user/auth', require('./routes/userAuth'));
app.use('/api/shops', require('./routes/shop'));
app.use('/api/users', require('./routes/user'));
app.use('/api/items', require('./routes/item'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/order', require('./routes/order'));
// app.use('/api', require('./routes/braintree'));
app.use('/api/eway', require('./routes/eway'));

// Serve Static Assets in production
if(process.env.NODE_ENV === 'production')
{
    // Set static folder
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, "client", "build", "index.html"));
    })
}


// Starting the server
app.listen(process.env.PORT || 5000, ()=>{
    console.log(`Server started on port ${process.env.PORT || 5000}`.blue.bold);
});
