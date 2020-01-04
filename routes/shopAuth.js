const express = require('express');
const router = express.Router();

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

// Register a new shop
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
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, address, zipCode, phoneNumber,  } = req.body;

    try {
      let shop = await Shop.findOne({ email });

      if (shop) {
        return res
          .status(400)
          .json({ errors: [{ message: 'Shop already registered!' }] });
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

      // Save to password
      await shop.save();

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
          res.json({ token });  // Send token back to the client

          // Send welcome email
          let HelperOptions ={

            from : process.env.EmailName + '<'+ (process.env.EmailId)+'>' ,
            to : email,
            subject : "Welcome to Farmgate",
            text : "Hello " + name + ", \n\nWelcome to Farmgate. We are very excited to see you onboard! Login now to order fresh organic food from the best stores near you. \n\nRegards, \nTeam Farmgate"
        };

        transporter.sendMail(HelperOptions,(err,info)=>{
            if(err) throw err;
            console.log("The message was sent");
        });
        }
      );

      // If signup fails due to any reason
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);
  



module.exports = router;