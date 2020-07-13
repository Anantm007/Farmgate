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

    description: {
        type: String,
        required: true
    },

    image: {
        data: Buffer,
        contentType: String
    },

    ABN: {
        type: String,
        required: true
    },
    
    facebook: {
        type: String
    },

    instagram: {
        type: String,
    },

    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    }],

    invoiceChargePercentage: {
        type: Number,
        default: 22.5
    },

    resetPasswordToken: {
        type: String
    },

    resetPasswordExpire: {
        type: String
    }    

}, {timestamps: true}

);

module.exports = mongoose.model('Shop', ShopSchema);