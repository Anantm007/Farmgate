const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()

// Express validation
const { check, validationResult } = require('express-validator');

// Models
const Shop = require('../models/shop');



//  Authenticate(log in) user & get token
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

// List All shops (public)
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


// Find a shop by id (public)
router.get('/:id', async(req, res) => {
  await Shop.findById(req.params.id, (err, shop) => {
    if(err || !shop)
    {
      res.json({
        success: false,
        message: "Shop Could Not Be Found!"
      })
    }

    else
    {
      return res.json({
        success: true,
        data: shop
      });
    }
  })
})

module.exports = router;