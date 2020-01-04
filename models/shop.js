const mongoose = require('mongoose');

const ShopSchema = new mongoose.Schema({

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

    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    }]
    

}, {timestamps: true}

);

module.exports = mongoose.model('Shop', ShopSchema);