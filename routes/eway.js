const express = require('express');
const router = express.Router();

// Middleware for protecting routes
const userAuth = require('../middleware/userAuth');

var rapid = require('eway-rapid');

require('dotenv').config();

// Models
const User = require('../models/user');


/*                                                              ROUTES                                                           */

// @route   POST /api/eway/payment/ 
// @desc    Create payment status
// @access  Private
router.post('/payment/', async(req, res) => {
    var client = rapid.createClient(process.env.apiKey, process.env.password, process.env.rapidEndpoint);   // rapidEndpoint can be written as "Sandbox/Production"
    const {EWAY_CARDNAME, EWAY_CARDNUMBER, EWAY_CARDCVN, EWAY_CARDEXPIRYMONTH, EWAY_CARDEXPIRYYEAR, amount} = req.body

    console.log(req.body)
client.createTransaction('Direct', {
    "Customer": {
       "CardDetails": {
         "Name": EWAY_CARDNAME,
         "Number": EWAY_CARDNUMBER,
         "ExpiryMonth": EWAY_CARDEXPIRYMONTH,
         "ExpiryYear": EWAY_CARDEXPIRYYEAR,
         "CVN": EWAY_CARDCVN
       }
    },
    "Payment": {
       "TotalAmount": amount * 100
    },
    "TransactionType": "Purchase"
}).then(function (response) {
    console.log(response)
    if (response.get('TransactionStatus')) {
        console.log('Payment successful! ID: ' + response.get('TransactionID'));
        return res.json({
            success: true,
            paymentId: response.get('TransactionID')
        })
    } else {
        var errorCodes = response.get('ResponseMessage').split(', ');
        errorCodes.forEach(function(errorCode) {
            console.log("Response Message: " + rapid.getMessage(errorCode, "en"));
        });
        return res.json({
            success: false,
            message: rapid.getMessage(errorCode, "en")
        })
    }
    })
    .catch(function(reason) {
        return res.json({
            success: false,
            message: reason
        })    
    });

})

module.exports = router;