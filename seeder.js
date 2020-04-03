const fs = require("fs");
const mongoose = require("mongoose");

require('dotenv').config();

// Load models
const PostCodesNew = require("./models/postcodesNew");

// Connect to DB
mongoose.connect(process.env.MongoURi,{useNewUrlParser: true, useUnifiedTopology: true});

// Read JSON files
const codes = JSON.parse(fs.readFileSync(`${__dirname}/_data/postcodesNew.json`, 'utf-8'));

// Import into DB
// node seeder -i
const importData = async() => {
    try {
        await PostCodesNew.create(codes);

        console.log("Data Imported...");
        process.exit();
    } catch (err) {
        console.error(err);
    }
}

// Delete Data
// $ node seeder -d
const deleteData = async() => {
    try {
        await PostCodesNew.deleteMany();

        console.log("Data Destroyed...");
        process.exit();
    } catch (err) {
        console.error(err);
    }
}

// Checking which function to call (argv will be from calling function)
if(process.argv[2] === '-i') {
    importData();
}

else if(process.argv[2] === '-d') {
    deleteData();
}