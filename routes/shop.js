const express = require("express");
const router = express.Router();

// Middleware for protecting routes
const auth = require("../middleware/shopAuth");
const userAuth = require("../middleware/userAuth");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const MongoObjectId = require("mongoose").Types.ObjectId;

// Express validation
const { check, validationResult } = require("express-validator");

// Models
const Shop = require("../models/shop");
const Item = require("../models/item");

/*                                                  ROUTES                                                  */

// @route   POST /api/shops
// @desc    Authenticate(login) user & get token
// @access  Public
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array(),
        });
      }

      const { email, password } = req.body;

      let shop = await Shop.findOne({ email });

      if (!shop) {
        return res.status(400).json({
          success: false,
          message: "Invalid Credentials",
        });
      }

      const isMatch = await bcrypt.compare(password, shop.password);

      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: "Invalid Credentials",
        });
      }

      const payload = {
        shop: {
          id: shop._id,
        },
      };

      // Do not send this to the client
      shop.password = undefined;
      shop.image = undefined;

      jwt.sign(
        payload,
        process.env.jwtSecret,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;

          res.json({
            success: true,
            token,
            shop,
          });
        }
      );
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, message: error });
    }
  }
);

// @route   GET /api/shops/signout
// @desc    Log the shop out and destroy cookie
// @access  Only for authenticated shops
router.get("/signout", auth, async (req, res) => {
  try {
    // Clear cookie from storage
    res.clearCookie("jwt");
    res.json({
      success: true,
      msg: "You have successfully logged out",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error });
  }
});

// @route   GET /api/shops
// @desc    List All shops
// @access  Public
router.get("/", async (req, res) => {
  try {
    const shops = await Shop.find().select("-image");

    if (!shops) {
      return res.json({
        success: false,
        count: 0,
      });
    }

    return res.json({
      success: true,
      count: shops.length,
      data: shops,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error });
  }
});

// @route   GET /api/shops/:id
// @desc    Find a shop by id
// @access  Private (using middleware)
router.get("/:id", async (req, res) => {
  try {
    if (!MongoObjectId.isValid(req.params.id)) {
      //   id is not valid
      return res.json({
        success: false,
        message: "Shop Not Found",
      });
    }

    // Check whether the shop is authenticated or not
    if (!JSON.stringify(req.params.id)) {
      return res.json({
        success: false,
        message: "You are not authorized to perform this action",
      });
    }

    await Shop.findById(req.params.id, (err, shop) => {
      // req.shop is coming from auth middleware where token is being checked

      if (shop) {
        shop.password = undefined;
        return res.json({
          success: true,
          data: shop,
        });
      }

      // Shop not found/invalid
      else {
        res.json({
          success: false,
          message: "Shop Could Not Be Found!",
        });
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error });
  }
});

// @route   PUT /api/shops/:id
// @desc    Update a shop by id
// @access  Private (using middleware)
router.put("/:id", auth, async (req, res) => {
  try {
    if (!MongoObjectId.isValid(req.params.id)) {
      //   id is not valid
      return res.json({
        success: false,
        message: "Shop Not Found",
      });
    }

    // Checking for empty fields
    for (var keys in req.body) {
      if (req.body[keys] === undefined || req.body[keys] === "") {
        var incomplete = keys;
        break;
      }
    }

    // Return error if there are some undefined values
    if (incomplete != undefined) {
      return res.json({
        success: false,
        message: "Please fill " + incomplete.toUpperCase(),
      });
    }

    // Check whether the user is authenticated or not
    if (
      JSON.stringify(req.params.id) !== JSON.stringify(req.shop.id) ||
      !req.shop
    ) {
      return res.json({
        success: false,
        message: "You are not authorized to perform this action",
      });
    }

    await Shop.findByIdAndUpdate(
      req.shop.id,
      req.body,
      { new: true },
      (err, shop) => {
        // req.shop is coming from auth middleware where token is being checked

        shop.password = undefined;
        return res.json({
          success: true,
          data: shop,
        });
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error });
  }
});

// @route   GET /api/shops/:id/items
// @desc    List all items for a particular shop (only in stock)
// @access  Public
router.get("/:id/items", async (req, res) => {
  try {
    if (!MongoObjectId.isValid(req.params.id)) {
      //   id is not valid
      return res.json({
        success: false,
        message: "Shop Not Found",
      });
    }

    if (req.params.id.toString() === '5ef007a26c7fd67a3df5d23f') {
      return res.redirect('http://monikasorganics.com.au/');
    }

    let items = await Item.find({ shop: req.params.id }).select("-image");

    if (!items || items.length === 0) {
      return res.json({
        success: true,
        count: 0,
        message: "This shop has no items listed",
      });
    }

    // don't send items that are not in stock
    for (i = items.length - 1; i >= 0; i--) {
      if (!items[i].inStock) {
        items.splice(i, 1);
      }
    }

    // Bubble sort technique to sort items by name
    for (i = 0; i < items.length - 1; i++) {
      for (j = i + 1; j < items.length; j++) {
        if (items[j].name.toString() < items[i].name.toString()) {
          let x = items[i];
          items[i] = items[j];
          items[j] = x;
        }
      }
    }

    // Return the in stock and sorted items
    return res.json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error });
  }
});

// @route   GET /api/shops/:id/items/allType
// @desc    List all items for a particular shop (both in and out of stock)
// @access  Public
router.get("/:id/items/allType", async (req, res) => {
  try {
    if (!MongoObjectId.isValid(req.params.id)) {
      //   id is not valid
      return res.json({
        success: false,
        message: "Shop Not Found",
      });
    }

    if (req.params.id.toString() === '5ef007a26c7fd67a3df5d23f') {
      return res.redirect('http://monikasorganics.com.au/');
    }

    let items = await Item.find({ shop: req.params.id }).select("-image");

    if (!items || items.length === 0) {
      return res.json({
        success: true,
        count: 0,
        message: "This shop has no items listed",
      });
    }

    // Return the in stock and sorted items
    return res.json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error });
  }
});

// @route   GET /api/shops/items/:id
// @desc    Return total items listed for the shop
// @access  Public
router.get("/items/:id", async (req, res) => {
  try {
    if (!MongoObjectId.isValid(req.params.id)) {
      //   id is not valid
      return res.json({
        success: false,
        message: "Item Not Found",
      });
    }

    if (req.params.id.toString() === '5ef007a26c7fd67a3df5d23f') {
      return res.redirect('http://monikasorganics.com.au/');
    }

    const shop = await Shop.findById(req.params.id).select("items");
    if (!shop) {
      return res.json({
        success: false,
        message: "Shop not found",
      });
    }

    return res.json({
      success: true,
      data: shop.items.length,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error });
  }
});

// @route   GET ${BASE_URL}/api/shops/photo/:id
// @desc    Display image using shop id
// @access  Public
router.get("/photo/:id", async (req, res) => {
  try {
    if (!MongoObjectId.isValid(req.params.id)) {
      //   id is not valid
      return res.json({
        success: false,
        message: "Item Not Found",
      });
    }

    if (req.params.id.toString() === '5ef007a26c7fd67a3df5d23f') {
      return res.redirect('http://monikasorganics.com.au/');
    }

    const result = await Shop.findById(req.params.id);

    if (!result) {
      res.json({
        success: false,
        message: "Image not found",
      });
    }

    res.contentType("image/jpeg");
    res.send(result.image.data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error });
  }
});

module.exports = router;
