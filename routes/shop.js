const express = require('express');
const router = express.Router();

// Middleware for protecting routes
const auth = require('../middleware/shopAuth');
const userAuth = require("../middleware/userAuth");

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const MongoObjectId = require("mongoose").Types.ObjectId;

// Express validation
const { check, validationResult } = require('express-validator');

// Models
const Shop = require('../models/shop');
const Item = require("../models/item");


/*                                                  ROUTES                                                  */


// @route   POST /api/shops 
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
      let shop = await Shop.findOne({ email });

      if (!shop) {
        return res
          .status(400)
          .json({ 
            success: false,
            message: 'Invalid Credentials'
          });
      }

      const isMatch = await bcrypt.compare(password, shop.password);
      
      if (!isMatch) {
        return res
          .status(400)
          .json({ 
            success: false,
            message: 'Invalid Credentials'
          });
      }

      const payload = {
        shop: {
          id: shop._id
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
      return res.json({
        success: false,
        message: err.message
      });
    }
  }
);


// @route   GET /api/shops/signout
// @desc    Log the shop out and destroy cookie
// @access  Only for authenticated shops
router.get("/signout", auth, async(req, res) => {

  // Clear cookie from storage
  res.clearCookie('jwt')
  res.json({
    success: true,
    msg: "You have successfully logged out"})
});


// @route   GET /api/shops 
// @desc    List All shops 
// @access  Public 
router.get('/', async(req, res) => {
  const shops = await Shop.find().select('-image');

  if(!shops)
  {
    return res.json({
      success: false,
      count: 0
    })
  }
  
  return res.json({
      success: true,
      count: shops.length,
      data: shops
  });
});


// @route   GET /api/shops/:id
// @desc    Find a shop by id 
// @access  Private (using middleware) 
router.get('/:id', userAuth, async(req, res) => {
  
  console.log("hello")
  if(!MongoObjectId.isValid(req.params.id))  //   id is not valid
  {
      return res.json({
          success: false,
          message: "Shop Not Found"
        });
  }

      // Check whether the shop is authenticated or not
      if( (!JSON.stringify(req.params.id) ))
      {
        return res.json({
          success: false,
          message: "You are not authorized to perform this action"
        })
      }

    await Shop.findById(req.params.id, (err, shop) => {  // req.shop is coming from auth middleware where token is being checked
      
      if(shop)
      {

        shop.password = undefined;
        return res.json({
          success: true,
          data: shop
        });
      }

      
      // Shop not found/invalid
      else
      {
            res.json({
              success: false,
              message: "Shop Could Not Be Found!"
            })
      }

    });

});


// @route   PUT /api/shops/:id
// @desc    Update a shop by id
// @access  Private (using middleware) 
router.put('/:id', auth, async(req, res) => {

  
  if(!MongoObjectId.isValid(req.params.id))  //   id is not valid
  {
      return res.json({
          success: false,
          message: "Shop Not Found"
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

  // Check whether the user is authenticated or not
  if( (JSON.stringify(req.params.id) !== JSON.stringify(req.shop.id) ) || !req.shop)
   {
      return res.json({
        success: false,
        message: "You are not authorized to perform this action"
      })
   }

    await Shop.findByIdAndUpdate(req.shop.id, req.body, {new: true}, (err, shop) => {  // req.shop is coming from auth middleware where token is being checked
      
      shop.password = undefined;
      return res.json({
        success: true,
        data: shop
      });

    });

  

});

// @route   GET /api/shops/:id/items 
// @desc    Get all items for a particular shop
// @access  Public 
router.get("/:id/items", async(req, res) => {
  
  if(!MongoObjectId.isValid(req.params.id))  //   id is not valid
  {
      return res.json({
          success: false,
          message: "Shop Not Found"
        });
  }

  const items = await Item.find({shop: req.params.id}).select('-image');

  if(!items || items.length === 0)
  {
      return res.json({
        success: true,
        count: 0,
        message: "This shop has no items listed"
      })
  }

  return res.json({
    success: true,
    count: items.length,
    data: items
  })
  
});


// @route   GET /api/shops/photo/:id 
// @desc    Display image using shop id
// @access  Public 
router.get('/photo/:id', async(req, res) => {

  if(!MongoObjectId.isValid(req.params.id))  //   id is not valid
    {
        return res.json({
            success: false,
            message: "Item Not Found"
          });
    }

    const result = await Shop.findById(req.params.id); 

    if (!result) 
    {
        res.json({
            success: false,
            message: "Image not found"
        });
    }   

    res.contentType('image/jpeg');
    res.send(result.image.data);     
});
  




module.exports = router;