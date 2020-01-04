const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Please add a name'],
        trim: true,
        maxlength: [50, 'Name cannot be more than 50 characters']
    },

    image: {
        data: Buffer,
        contentType: String
    },

    price: {
        type: Number,
        variant: String, // per kg or bunch or dozen
        required: [true, 'Please add a price'],    
    },

    quality: {
        type: String,
        required: [true, 'Please add a quality'],    
    },

    
    inStock: {
        type: Boolean,
        required: [true, 'Please add item stock status'],
    },

    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shop'
    }
    

}, {timestamps: true}

);

module.exports = mongoose.model('Item', ItemSchema);