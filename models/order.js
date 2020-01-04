const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },


    shop: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shop'
    }],

    address: {
        type: String,
        required: [true, 'Please add a delivery address']
    },

    items: [{
        item: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Item'
            },

        quantity: {
            type: Number,
            required: [true, 'Please add quantity']
        }
    }],

    amount: {
        tax_shipping: {
            type: Number,
            default: 0
        },

        totalAmount: {
            type: Number
        }
    }
    

}, {timestamps: true}

);

module.exports = mongoose.model('Order', OrderSchema);