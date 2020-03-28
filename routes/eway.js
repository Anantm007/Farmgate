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

// // @route   POST /api/braintree/payment/:id 
// // @desc    Process payments
// // @access  Public
// router.post('/braintree/payment/:id', userAuth, async(req, res) => {
//     let nonceFromTheClient = req.body.paymentMethodNonce;
//     let amountFromTheClient = req.body.amount;

//     // charge
//     let newTransaction = gateway.transaction.sale({
//         amount: amountFromTheClient,
//         paymentMethodNonce: nonceFromTheClient,
//         options: {
//             submitForSettlement: true
//         }
//     }, (err, result) => {
//         if(err)
//         {
//             return res.json({
//                 success: false,
//                 message: err
//             })
//         }

//         return res.json(result)
//     })
// })


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
        "RedirectUrl": 'http://localhost:3006',
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
    var client = rapid.createClient(process.env.apiKey, process.env.password, process.env.rapidEndpoint);   // rapidEndpoint can be written as "Sandbox"
    
    const user = await User.findById(req.params.userId).select('email');

    client.queryTransaction(req.params.code)
    .then(function (response) {
        const Attri = response.attributes;
        const Trans = Attri.Transactions;
        console.log('fuck me', Attri)
        console.log('hey baby', Trans)

        if(Trans.length !== 0)
        {
            if(Trans[0].ResponseCode === '00')
            return res.json({
                success: true
            })
        }

        else
        {
            console.log('lol wtf');
    
            // Send order confirmation email to user and admin
            let HelperOptions = {
                from : process.env.EmailName + '<'+ (process.env.EmailId)+'>' ,
                to : user.email,
                subject : "Your order on Farmgate Market was unseccessful",
                text : "Hello , \n\nYour purchase on Farmgate Market was unsuccessful. Please try checking out again with correct credit card details" + "\n\nRegards, \nThe Farmgate Team"
            };
                
            transporter.sendMail(HelperOptions,(err,info)=>{
                if(err) throw err;
                console.log("Error email was sent");
            });

            return res.json({
                success: false
            })
        }
        
    });

})
module.exports = router;