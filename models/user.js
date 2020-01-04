const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Please add a name'],
        trim: true
    },

    email: {
        type: String,
        required: [true, 'Please add a valid email'],
        trim: true,
        unique: true
    },

    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6
    },

    address: {
        type: String,
        unique: true,
        required: [true, 'Please add an address'],
    },

    zipCode: {
        type: Number,
        required: [true, 'Please add a zip code'],
    },

    phoneNumber: {
        type: Number,
        unique: true,
        required: [true, 'Please add a phone number'],
    },

    history: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }]
    

}, {timestamps: true}

);

module.exports = mongoose.model('User', UserSchema);