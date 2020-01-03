const express = require('express');
const app = express();

const mongoose = require('mongoose');
/*const config = require('config');
// MongoDB url
const url = config.get('mongoURI');


//Connecting to the database
mongoose.promise = global.Promise;
mongoose.connect('mongodb+srv://dev:dev@dev1@prakriti-jxoz5.mongodb.net/enva?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true}, (err,db)=> {
    if(err)
    console.log(err);

    else
    console.log('Database Connected');
});
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
*/

/*
// routes
app.use(require('./routes/index.js'));
*/


// Starting the server
app.listen(process.env.PORT || 5000, ()=>{
    console.log(`Server started on port ${process.env.PORT || 5000}`);
});
