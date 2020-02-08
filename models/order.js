const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },


    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shop'
    },

    instructions: {
        type: String,
        default: ''
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

    subtotal: {
        type: Number,
        required: true
    },

    tax_shipping: {
        type: Number,
        default: 4.95,
    },
    
    totalAmount: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        default: "Order Received",
        enum: ["Order Received", "Under Process", "Dispatched", "Delivered", "Cancelled"] // enum means string objects
      }

}, {timestamps: true}

);

module.exports = mongoose.model('Order', OrderSchema);