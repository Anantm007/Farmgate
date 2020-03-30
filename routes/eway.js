const express = require('express');
const router = express.Router();

// Middleware for protecting routes
const userAuth = require('../middleware/userAuth');

var rapid = require('eway-rapid');

require('dotenv').config();

// Models
const User = require('../models/user');

// Nodemailer setup
const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
    service : 'gmail',
    secure : false,
    port : 25,
    auth : {
        user : process.env.EmailId,
        pass : process.env.EmailPass
    },
    tls : {
        rejectUnauthorized : false
    }});


/*                                                              ROUTES                                                           */

// @route   GET /api/eway/getToken/:id 
// @desc    Generate accessCode and formURL token for payments
// @access  Private
router.post('/getToken/:id', userAuth, async(req, res) => {
    var client = rapid.createClient(process.env.apiKey, process.env.password, process.env.rapidEndpoint); // rapidEndpoint can be written as "Sandbox"
    const user = await User.findById(req.params.id);

    if(!user)
    {
        return res.json({
            success: false,
            message: "Invalid User token"
        })
    }
    
    client.createTransaction('TransparentRedirect', {
        "Payment": {
        "TotalAmount": req.body.t * 100, // We have to write in smallest denomination possible so multiply it by 100
        "CurrencyCode": "AUD"
        },
        "Customer": {
            "FirstName": user.name,
            "Mobile": user.phoneNumber,
            "Email": user.email,
            "PostalCode": user.zipCode,     
        },
        "RedirectUrl": process.env.redirectUrl,
        "TransactionType": "Purchase"
    }).then(async (response) => {
        if (response.getErrors().length == 0) {
            
            var accessCode = response.get('AccessCode');
            var formUrl = response.get('FormActionURL');
            console.log(accessCode)
            return res.json({
                success: true,
                accessCode,
                formUrl
            })
        } else {
            response.getErrors().forEach(function(error) {
                console.log(rapid.getMessage(error, "en"))
            })
        }
    })
});


// @route   GET /api/eway/status/:code 
// @desc    Check payment status
// @access  Private
router.get('/status/:userId/:code', async(req, res) => {
    var client = rapid.createClient(process.env.apiKey, process.env.password, process.env.rapidEndpoint);   // rapidEndpoint can be written as "Sandbox/Production"
    
    const user = await User.findById(req.params.userId);

    client.queryTransaction(req.params.code)
    .then(function (response) {
        console.log(response)
        if (response.get('Transactions[0].TransactionStatus')) {
            console.log('Payment successful! ID: ' + response.get('Transactions[0].TransactionID'));
            return res.json({
                success: true,
                data: user
            })
        } else {
            var errorCodes = response.get('Transactions[0].ResponseMessage').split(', ');
            errorCodes.forEach(function(errorCode) {
                console.log("Response Message: " + rapid.getMessage(errorCode, "en"));
            });

            return res.json({
                success: false,
                data: user
            })
        }
    }).catch(function(reason) {
        console.log('error', reason)
        return res.json({
            success: false,
            data: user
        })
    });

})
module.exports = router;