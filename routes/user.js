const express = require('express');
const router = express.Router();

// Middleware for protecting routes
const auth = require('../middleware/userAuth');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const MongoObjectId = require("mongoose").Types.ObjectId;


// Express validation
const { check, validationResult } = require('express-validator');

// Models
const User = require('../models/user');



/*                                                  ROUTES                                                  */


// @route   POST /api/user
// @desc    Authenticate(login) user & get token
// @access  Public 
router.post('/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false,
        errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ 
            success: false,
            errors: [{ msg: 'Invalid Credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      
      if (!isMatch) {
        return res
          .status(400)
          .json({ 
            success: false,
            errors: [{ message: 'Invalid Credentials' }] });
      }

      const payload = {
        user: {
          id: user._id
        }
      };

      jwt.sign(
        payload,
        process.env.jwtSecret,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ 
            success: true,
            token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);


// @route   GET /api/users 
// @desc    List All users 
// @access  Public 
router.get('/', async(req, res) => {
  await User.find({}, (err, users) => {
    if(err) {
      return res.json({
        success: false,
        message: err
      }) 
    }

    else
    {
      return res.json({
        success: true,
        count: users.length,
        data: users
      });
    }
  })
})


// @route   GET /api/users/:id
// @desc    Find a user by id 
// @access  Private (using middleware) 
router.get('/:id', auth, async(req, res) => {
  
   if(!MongoObjectId.isValid(req.params.id))  //   id is not valid
    {
        return res.json({
            success: false,
            message: "User not Found"
          });
    }

  // Check is our middleware populated req.user (only when token was valid)
  if(req.user)
  {
    await User.findById(req.user.id, (err, user) => {  // req.user is coming from auth middleware where token is being checked
      
      if(user)
      {

        user.password = undefined;
        return res.json({
          success: true,
          data: user
        });
      }

      
      // User not found/invalid
      else
      {
            res.json({
              success: false,
              message: "User Could Not Be Found!"
            })
      }

    });

  }

  // Token invalid
  else
  {
        res.json({
          success: false,
          message: "Authorization Failed!"
        })
  }
});


// @route   PUT /api/users/:id
// @desc    Update a user by id
// @access  Private (using middleware) 
router.put('/:id', auth, async(req, res) => {

    
   if(!MongoObjectId.isValid(req.params.id))  //   id is not valid
   {
       return res.json({
           success: false,
           message: "User not Found"
         });
   }
  
  // Checking for empty fields
  for (var keys in req.body) {
    if (req.body[keys] === undefined || req.body[keys] === "") 
    {
      var incomplete = keys;
      break;
    }
  }
  
  // Return error if there are some undefined values
  if (incomplete != undefined) {
    return res.json({
      success: false,
      message: "Please fill " + incomplete.toUpperCase()
    });
  }

  // If token verifies correctly
  if(req.user)
  {
    await User.findByIdAndUpdate(req.user.id, req.body, {new: true}, (err, user) => {  // req.user is coming from auth middleware where token is being checked
      
      user.password = undefined;
      return res.json({
        success: true,
        data: user
      });

    });

  }

  // User not found/invalid
  else
  {
        res.json({
          success: false,
          message: "User Could Not Be Found!"
        })
  }
});


module.exports = router;