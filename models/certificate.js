const mongoose = require('mongoose');

const CertificateSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Please add a name'],
        trim: true
    },

    url: {
        type: String,
        required: [true, 'Please add a valid email'],
        trim: true,
    },
   
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shop',
        required: [true, 'Please add a shop'],
    }    

}, {timestamps: true}

);

module.exports = mongoose.model('Certificate', CertificateSchema);