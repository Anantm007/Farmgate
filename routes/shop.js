const express = require('express');
const router = express.Router();

// Middleware for protecting routes
const auth = require('../middleware/shopAuth');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()

// Express validation
const { check, validationResult } = require('express-validator');

// Models
const Shop = require('../models/shop');



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
            errors: [{ msg: 'Invalid Credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, shop.password);
      
      if (!isMatch) {
        return res
          .status(400)
          .json({ 
            success: false,
            errors: [{ message: 'Invalid Credentials' }] });
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
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);


// @route   GET /api/shops 
// @desc    // List All shops 
// @access  Public 
router.get('/', async(req, res) => {
  await Shop.find({}, (err, shops) => {
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
        count: shops.length,
        data: shops
      });
    }
  })
})


// @route   GET /api/shops/:id
// @desc    Find a shop by id (private)
// @access  Private (using middleware) 
router.get('/:id', auth, async(req, res) => {
  
  console.log(req.user);
  if(req.user)
  {
    await Shop.findById(req.user.id, (err, shop) => {  // req.user is coming from auth middleware where token is being checked
      
      return res.json({
        success: true,
        data: shop
      });

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


module.exports = router;