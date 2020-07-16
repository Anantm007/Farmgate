const mongoose = require('mongoose');

const SuburbAndPostcodeSchema = new mongoose.Schema({

    postcode: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },

    suburb: {
        type: String,
        required: true,
        trim: true,
    }    

}, {timestamps: true}

);

module.exports = mongoose.model('SuburbAndPostcode', SuburbAndPostcodeSchema);