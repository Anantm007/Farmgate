const express = require('express');
const router = express.Router();

const crypto = require("crypto");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config()

// Express validation
const { check, validationResult } = require('express-validator');

// Models
const User = require('../models/user');
const PostCodes = require("../models/postcodes");
const PostCodesNew = require('../models/postcodesNew');

// Nodemailer setup 
// Email templates
const welcomeUser = require("./emailTemplates/welcomeUser");
const forgotPass = require("./emailTemplates/forgotPassword");
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


// @route   POST /api/user/auth 
// @desc    Register a new user
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
        message: errors.array()[0].msg });
    }

    const { name, email, password, address, zipCode, phoneNumber } = req.body;
  
    /*const { name, email, password, address, zipCode, phoneNumber, captcha  } = req.body;
    
    if (!captcha)
    {
        return res.json({success: false, message: "Please fill out the captcha"});
    }

    // Verify URL
    const query = stringify({
      secret: process.env.captchaSecretKey,
      response: captcha,
      remoteip: req.connection.remoteAddress
    });

    const verifyURL = `https://google.com/recaptcha/api/siteverify?${query}`;

    // Make a request to verifyURL
    const body = await fetch(verifyURL).then(res => res.json());
    
    // If not successful
    if (body.success !== undefined && !body.success)
    {
        return res.json({success: false, message: "Sorry, there was an error, please try again later"});
    }
  */
    try {
      let user = await User.findOne({ email });

      // User already registered
      if (user) {
        return res
          .status(400)
          .json({ 
            success: false,
            message: 'User already registered!'
          });
      }

      // Check if we can deliver to the user's postcode
      let flag = 0;
      let newUser = false;
      const p = await PostCodes.findOne({ adminName: "Admin" });
      if(p)
      {
        if(p.codes.includes(zipCode))
        {
          flag = 1;
        }
      }

      // Check in the new array if we can deliver to the user's postcode
      const po = await PostCodesNew.findOne({ adminName: "Admin" });
      if(po)
      {
        if(po.codes.includes(zipCode))
        {
          newUser = true;
          flag = 1;
        }
      }

      // Return false if we cannot deliver to customer's postcode
      if(flag === 0)
      {
        return res.json({
          success: false,
          message: "Sorry, we do not currently deliver to your zip code. We are working hard to bring Farmgate to more customers"
        })
      }

      // Create New User
      user = new User({
        name,
        email,
        password,
        address,
        zipCode,
        phoneNumber,
        newUser 
      });

      // Encrypting the password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // Save to database
      await user.save();

      // Payload for jwt
      const payload = {
        user: {
          id: user._id
        }
      };

      // Signing the payload
      jwt.sign(
        payload,
        process.env.jwtSecret,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          
          
          // Do not send this to the client
          user.password = undefined;

          res.json({ 
            success: true,
            token,
            user
          });

          let information = {
            userName: user.name
          }
          const mailHtml = welcomeUser(information)
          
          // Send welcome email
          let HelperOptions ={
            from : process.env.EmailName + '<'+ (process.env.EmailId)+'>' ,
            to : email,
            subject : "Welcome to Farmgate!",
            html: mailHtml
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
  
// @route   POST /api/user/auth/forgot 
// @desc    Forgot Password (send token)
// @access  Only for registered (user cannot be auth if he forgot his password)
router.post("/forgot", async(req, res) => {
  const user = await User.findOne({email: req.body.email});

  if(!user)
  {
    return res.json({
      success: false,
      message: "User not found with that email"
    });
  }

  // Generate and hash password token using crypto (to besent to the user)
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hash it to store in the database
  user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  // Set expire
  user.resetPasswordExpire = Date.now() + 10 *60 * 1000;

  // Saving reset token and expires in the database
  await user.save();
  

  // Send reset password email
  const resetUrl = `${req.protocol}://farmgate-market.com/user/reset/password/${resetToken}`;

  const information = {
    name: user.name,
    resetUrl
  }
  const mailHtml = forgotPass(information);

  let HelperOptions ={
    from : process.env.EmailName + '<'+ (process.env.EmailId)+'>' ,
    to : user.email,
    subject : "Farmgate Password Reset",
    html: mailHtml
  };

  transporter.sendMail(HelperOptions,(err,info)=>{
    if(err) throw err;
    
    res.json({
      success: true,
      message: "Email sent successfully"
    })
   });

});



// @route   POST /api/user/auth/validToken 
// @desc    Check whether token is valid or not
// @access  Only for registered (user cannot be auth if he forgot his password)
router.post("/validToken", async(req, res) => {
  
  const resetPasswordToken = crypto.createHash('sha256').update(req.body.token).digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  });

  if(!user)
  {
    return res.json({
      success: false,
      message: "Invalid Token"
    })
  }
    
  return res.json({ 
      success: true 
  });
})



// @route   PUT /api/user/auth/resetPassword/:resetToken 
// @desc    Reset Password using token
// @access  Only for registered (user cannot be auth if he forgot his password)
router.put("/resetPassword/:resetToken", async(req, res) => {

  // Validate new password
  if(!req.body.password || req.body.password === "" || req.body.password.length < 6)
  {
    return res.json({
      success: false,
      message: "Please enter a valid password with 6 or more characters"
    })
  }

  const resetPasswordToken = crypto.createHash('sha256').update(req.params.resetToken).digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  });

  if(!user)
  {
    return res.json({
      success: false,
      message: "Invalid Token"
    })
  }
    // Encrypting the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    // Save new password to database
    await user.save();

    return res.json({
      success: true,
      message: "Password updated!"
    })
})


module.exports = router;