const express = require('express');
const router = express.Router();

// Middleware for protecting routes
const auth = require('../middleware/userAuth');
const adminAuth = require('../middleware/adminAuth');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const MongoObjectId = require("mongoose").Types.ObjectId;


// Express validation
const { check, validationResult } = require('express-validator');

// Models
const User = require('../models/user');
const PostCodes = require('../models/postcodes');
const Item = require('../models/item');


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
        message: errors.array()[0].msg 
      });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ 
            success: false,
            message: 'Invalid Credentials' 
          });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      
      if (!isMatch) {
        return res
          .status(400)
          .json({ 
            success: false,
            message: 'Invalid Credentials' 
          });
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
          
          // Do not send this to the client
          user.password = undefined;

          res.json({ 
            success: true,
            token,
            user
          });
        }
      );
    } catch (err) {
      return res.json({
        success: false,
        message: err.message
      });
    }
  }
);


// @route   GET /api/users/signout
// @desc    Log the user out and destroy cookie
// @access  Only for authenticated users
router.get("/signout", auth, async(req, res) => {

  // Clear cookie from storage
  res.clearCookie('jwt')
  res.json({
    success: true,
    message: "You have successfully logged out"
  });
});



// @route   GET /api/users 
// @desc    List All users 
// @access  Public 
router.get('/', adminAuth, async(req, res) => {
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

    // Check whether the user is authenticated or not
    if((JSON.stringify(req.params.id) !== JSON.stringify(req.user.id) ) || !req.user)
    {
      return res.json({
        success: false,
        message: "You are not authorized to perform this action"
      })
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

   if(req.body.role)
   {
     return res.json({
       success: false,
       message: "You cannot change your role manually!"
     })
   }

   // Check whether the user is authenticated or not    
   if((JSON.stringify(req.params.id) !== JSON.stringify(req.user.id) ) || !req.user)
   {
     return res.json({
       success: false,
       message: "You are not authorized to perform this action"
     })
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

  // Check if we can deliver to the user's postcode
    const p = await PostCodes.findOne({ adminName: "Admin" });
      
    if(p)
      {
        if(!p.codes.includes(req.body.zipCode))
        {
          return res.json({
            success: false,
            message: "Sorry, we do not currently deliver to your zip code."
          })
        }
      }
  
    await User.findByIdAndUpdate(req.user.id, req.body, {new: true}, (err, user) => {  // req.user is coming from auth middleware where token is being checked
      if(err)
      throw err;

      user.password = undefined;
      return res.json({
        success: true,
        data: user
      });

    });

});


// @route   POST /api/users/cart/add/:id
// @desc    Add or update an item in cart using the item id
// @access  Private (using middleware) 
router.post('/cart/add/:id', auth, async(req, res) => {
  
  const user = await User.findById(req.user.id)
  const item = await Item.findById(req.params.id);
  
  if(req.body.quantity < 1)
  {
    return res.json({
      success: false,
      message: "Item quantity must be greater than 1"
    })
  }

  let f = 0;
  
  try {
        // If item already exists, we just need to update the quantity
        if(user.cart.length > 0)
        {
          user.cart.forEach(c => {
            if(c.item.toString() === req.params.id)
            {
              f=1;
              c.quantity = req.body.quantity;
              c.price = req.body.quantity * item.price
            }            
          }) 
        }

        // Create a new cart item
        if(f === 0)
        {
          const cartItem = ({
            item,
            quantity: req.body.quantity,
            price: item.price * req.body.quantity 
          })
        }
    
        // Save item to the cart in the DB
        await user.save();
    
        return res.json({
          success: true,
          user
        })
      
  } catch (err) {
        return res.json({
          success: false,
          message: err
        })
    }  

})

module.exports = router;