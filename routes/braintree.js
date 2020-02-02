const express = require('express');
const router = express.Router();

// Middleware for protecting routes
const userAuth = require('../middleware/userAuth');

const braintree = require('braintree');

require('dotenv').config();

// Models
const User = '../models/user';

// Braintree gateway setup
const gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY
})


/*                                                              ROUTES                                                           */

// @route   GET /api/braintree/getToken/:id 
// @desc    Generate Braintree client token for payments
// @access  Private 
router.get('/braintree/getToken/:id', userAuth , async(req, res) => {
    gateway.clientToken.generate({}, async(err, response) => {
        if(err)
        {
            return res.json({
                success: false,
                message: err
            })
        }

        return res.json(response);
    })
})


// @route   POST /api/braintree/payment/:id 
// @desc    Process payments
// @access  Public
router.post('/braintree/payment/:id', userAuth, async(req, res) => {
    let nonceFromTheClient = req.body.paymentMethodNonce;
    let amountFromTheClient = req.body.amount;

    // charge
    let newTransaction = gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        options: {
            submitForSettlement: true
        }
    }, (err, result) => {
        if(err)
        {
            return res.json({
                success: false,
                message: err
            })
        }

        return res.json(result)
    })
})


module.exports = router;