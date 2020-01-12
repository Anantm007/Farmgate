const express = require('express');
const router = express.Router();

const crypto = require("crypto");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()

// Express validation
const { check, validationResult } = require('express-validator');

// Models
const Shop = require('../models/shop');

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



/*                                                  ROUTES                                                  */


// @route   POST /api/shop/auth 
// @desc    Register a new shop
// @access  Public 
router.post('/',
  [ // Validation
    check('name', 'Name is required')
    .not()
    .isEmpty(),

    check('email', 'Please include a valid email').isEmail(),

    check('password', 'Please enter a password with 6 or more characters')
    .isLength({ min: 6 }),
  
    check('address', 'Adress is required')
    .not()
    .isEmpty(),
    
    check('zipCode', 'Zipcode is required')
    .not()
    .isEmpty(),

    check('phoneNumber', 'Phone Number is required')
    .not()
    .isEmpty(),   
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false,
        errors: errors.array() });
    }

    const { name, email, password, address, zipCode, phoneNumber  } = req.body;

    try {
      let shop = await Shop.findOne({ email });

      // Shop already registered
      if (shop) {
        return res
          .status(400)
          .json({ 
            success: false,
            message: 'Shop already registered!' 
          });
      }

      // New Shop
      shop = new Shop({
        name,
        email,
        password,
        address,
        zipCode,
        phoneNumber        
      });

      // Encrypting the password
      const salt = await bcrypt.genSalt(10);
      shop.password = await bcrypt.hash(password, salt);

      // Save to database
      await shop.save();

      // Payload for jwt
      const payload = {
        shop: {
          id: shop._id
        }
      };

      // Signing the payload
      jwt.sign(
        payload,
        process.env.jwtSecret,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;

          res.json({    // Send token back to the client 
            success: true,
            token 
          });
          

          // Send welcome email
          let HelperOptions ={

            from : process.env.EmailName + '<'+ (process.env.EmailId)+'>' ,
            to : email,
            subject : "Welcome to Farmgate!",
            text : "Hello " + name + ", \n\nWelcome to Farmgate. We are very excited to see you onboard! Thank you for signing up and helping our customers enjoy more quality organic food. \n\nLogin now to add items to your shop. \n\nVisit http://www.farmgate-market.com \n\nRegards, \nTeam Farmgate"
        };

        transporter.sendMail(HelperOptions,(err,info)=>{
            if(err) throw err;
            console.log("The message was sent");
        });
        }
      );

      // If signup fails due to any reason
    } catch (err) {
      return res.json({
        success: false,
        message: err.message
      });
    }
  }
);
  

// @route   POST /api/shop/auth/forgot 
// @desc    Forgot Password
// @access  Only for registered shop (Cannot be auth if he forgot his password)
router.post("/forgot", async(req, res) => {
  const shop = await Shop.findOne({email: req.body.email});

  if(!shop)
  {
    return res.json({
      success: false,
      message: "Shop not found with that email"
    });
  }

  // Generate and hash password token using crypto (to besent to the user)
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hash it to store in the database
  shop.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  // Set expire
  shop.resetPasswordExpire = Date.now() + 10 *60 * 1000;

  // Saving reset token and expires in the database
  await shop.save();
  

  // Send reset password email
  const resetUrl = `${req.protocol}://${req.get('host')}/api/shop/auth/resetPassword/${resetToken}`;

  let HelperOptions ={
    from : process.env.EmailName + '<'+ (process.env.EmailId)+'>' ,
    to : shop.email,
    subject : "Farmgate Password Reset",
    text : "Hello " + shop.name + 
            `, \n\nYou are receiving this email because you have requested your password reset. Please visit: \n${resetUrl} to reset your password.\n\nDo not share this link with anybody. \nThis link is valid only for 10 minutes.
            \n\nRegards, \nTeam Farmgate`
  };

  transporter.sendMail(HelperOptions,(err,info)=>{
    if(err) throw err;
    
    res.json({
      success: true,
      message: "Email sent successfully"
    })
   });

});


// @route   PUT /api/shop/auth/resetPassword/:resetToken 
// @desc    Reset Password using token
// @access  Only for registered (shop cannot be auth if he forgot his password)
router.put("/resetPassword/:resetToken", async(req, res) => {

  // Validate new password
  if(!req.body.password || req.body.password === "" || req.body.password.length < 6)
  {
    return res.json({
      success: false,
      message: "Please enter a valid password"
    })
  }

  const resetPasswordToken = crypto.createHash('sha256').update(req.params.resetToken).digest('hex');

  const shop = await Shop.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  });

  if(!shop)
  {
    return res.json({
      success: false,
      message: "Invalid Token"
    })
  }
    // Encrypting the password
    const salt = await bcrypt.genSalt(10);
    shop.password = await bcrypt.hash(req.body.password, salt);

    shop.resetPasswordToken = undefined;
    shop.resetPasswordExpire = undefined;

    // Save new password to database
    await shop.save();

    return res.json({
      success: true,
      message: "Password updated!"
    })
})


module.exports = router;