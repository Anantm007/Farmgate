const express = require("express");
const router = express.Router();

// Middleware for protecting routes
const auth = require("../middleware/shopAuth");

// Config variables
require("dotenv").config();
const { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

// Cloudinary
const cloudinary = require("cloudinary");

// Configure cloudinary for upload
cloudinary.v2.config({
  cloud_name: "dtgqjl09r",
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

// Form Data
const formidable = require("formidable");
const fs = require("fs");

const MongoObjectId = require("mongoose").Types.ObjectId;

// Models
const Item = require("../models/item");
const Shop = require("../models/shop");

/*                                                       ROUTES                                                   */

// @route   GET /api/items/checking/setitemQuality
// @desc    Set item quality to Pesticide free
// @access  Public
// router.get('/checking/setItemQuality', async(req, res) => {
//   await Item.updateMany({}, { $set: { quality: 'Pesticide Free' } });
//   const items = await Item.find({});

//   return res.json({
//     success: true,
//     data: items
//   })

// })

// @route   POST /api/items
// @desc    Add new item
// @access  Private
router.post("/", auth, async (req, res) => {
  try {
    // Formidable is used to handle form data. we are using it to handle image upload
    let form = new formidable.IncomingForm();
    form.keepExtensions = true; // Extension for images

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: "Image could not be uploaded",
        });
      }

      // check for all fields
      const { name, price, variant, quality, description } = fields; // Destructure

      if (!name || !price || !variant || !quality || !description) {
        return res.status(400).json({
          success: false,
          message: "Please fill all the fields",
        });
      }

      // Create new item now
      let item = new Item(fields);
      item.shop = req.shop.id;
      // Handle files
      if (files.image) {
        // Validate file size less than 1 MB
        if (files.image.size > 1000000) {
          return res.status(400).json({
            success: false,
            message: "File size should be less than 1 MB",
          });
        }

        // Upload image to cloudinary
        const res = await cloudinary.v2.uploader.upload(files.image.path, {
          folder: "cloudImages",
          use_filename: true,
        });

        item.photo = res.secure_url;

        // item.image.data = fs.readFileSync(files.image.path);
        // item.image.contentType = files.image.type;
      }

      // Add the item to shop's item array
      const shop = await Shop.findById(req.shop.id);
      shop.items.unshift(item);
      await shop.save();

      // Save to database
      await item.save();

      return res.json({
        success: true,
        message: "Item added",
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error });
  }
});

// @route   GET /api/items/:id
// @desc    Get a particular item
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    if (!MongoObjectId.isValid(req.params.id)) {
      //   id is not valid
      return res.json({
        success: false,
        message: "Item Not Found",
      });
    }

    const item = await Item.findById(req.params.id).select("-image");

    if (!item) {
      return res.json({
        success: false,
        message: "Item not found!",
      });
    }

    return res.json({
      success: true,
      data: item,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error });
  }
});

// @route   PUT /api/items/:id
// @desc    Update item
// @access  Private
router.put("/:id", auth, async (req, res) => {
  try {
    // Formidable is used to handle form data. we are using it to handle image upload
    let form = new formidable.IncomingForm();
    form.keepExtensions = true; // Extension for images

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: "Image could not be uploaded",
        });
      }

      // Saving product to the Database
      const item = await Item.findByIdAndUpdate(req.params.id, fields, {
        new: true,
      });

      // Handle files
      if (files.image) {
        // Validate file size less than 1 MB
        if (files.image.size > 1000000) {
          return res.status(400).json({
            success: false,
            message: "File size should be less than 1 MB",
          });
        }

        // Upload image to cloudinary
        const res = await cloudinary.v2.uploader.upload(files.image.path, {
          folder: "cloudImages",
          use_filename: true,
        });

        item.photo = res.secure_url;

        // item.image.data = fs.readFileSync(files.image.path);
        // item.image.contentType = files.image.type;
      }

      // Save to database
      await item.save();

      return res.json({
        success: true,
        message: "Item Modified",
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error });
  }
});

// @route   DELETE /api/items/:id
// @desc    Delete item using item id
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    // Check whether the shop is authorized or not
    const item = await Item.findById(req.params.id);
    if (
      (item && JSON.stringify(item.shop) !== JSON.stringify(req.shop.id)) ||
      !item
    ) {
      return res.json({
        success: false,
        message: "You are not authorized to perform this action!",
      });
    }

    if (!MongoObjectId.isValid(req.params.id)) {
      //   id is not valid
      return res.json({
        success: false,
        message: "Item Not Found",
      });
    }

    // cascade delete the item from shop schema as well
    const shop = await Shop.findById(item.shop);

    let x = 0;
    for (x = 0; x < shop.items.length; x++) {
      if (JSON.stringify(shop.items[x]) === JSON.stringify(item._id)) {
        shop.items.splice(x, 1);
      }
    }

    await shop.save();

    await Item.findByIdAndDelete(req.params.id, async (err, item) => {
      if (err) {
        return res.json({
          success: false,
          message: "Item Not Found",
        });
      }
    });

    return res.json({
      success: true,
      message: "Item deleted",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error });
  }
});

// @route   GET ${BASE_URL}/api/items/photo/:id
// @desc    Display image using item id
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

    const result = await Item.findById(req.params.id);

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
