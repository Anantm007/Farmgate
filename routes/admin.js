const express = require("express");
const router = express.Router();

// Middleware for protecting routes
const auth = require("../middleware/adminAuth");

require("dotenv").config();
const formidable = require("formidable");
const fs = require("fs");

const MongoObjectId = require("mongoose").Types.ObjectId;

// Models
const Shop = require("../models/shop");
const Item = require("../models/item");
const User = require("../models/user");
const Certificate = require("../models/certificate");
const Query = require("../models/query");

// Nodemailer setup
const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
  service: "gmail",
  secure: false,
  port: 25,
  auth: {
    user: process.env.EmailId,
    pass: process.env.EmailPass,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

/*                                                           ROUTES                                       */

// @route   GET /api/admin/fortyCount
// @desc    Get a count of how many orders went through with promo "fortyforfree"
// @access  Public
router.get("/fortyCount", async (req, res) => {
  try {
    const ans = await User.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: { $add: ["$fortyPromo"] } },
        },
      },
    ]);
    const total = ans[0].total;
    return res.status(200).json({ success: true, total });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error });
  }
});

// @route   DELETE /api/admin/delete/user/:id
// @desc    Delete a user account
// @access  Private
router.delete("/delete/user/:id", auth, async (req, res) => {
  try {
    if (!MongoObjectId.isValid(req.params.id)) {
      //   id is not valid
      return res.json({
        success: false,
        message: "User Not Found",
      });
    }

    const admin = await User.findById(req.admin.id);
    if (admin && admin.role === 1) {
      await User.findByIdAndDelete(req.params.id);
      return res.json({
        success: true,
        message: "User deleted successfully",
      });
    } else {
      return res.status(403).json({
        success: false,
        message: "Unauthorized!",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error });
  }
});

// @route   DELETE /api/admin/delete/shop/:id
// @desc    Delete a user account
// @access  Private
router.delete("/delete/shop/:id", auth, async (req, res) => {
  try {
    if (!MongoObjectId.isValid(req.params.id)) {
      //   id is not valid
      return res.json({
        success: false,
        message: "Shop Not Found",
      });
    }
    const admin = await User.findById(req.admin.id);
    if (admin && admin.role === 1) {
      await Item.deleteMany({ shop: req.params.id });

      await Shop.findByIdAndDelete(req.params.id);
      return res.json({
        success: true,
        message: "Shop deleted successfully",
      });
    } else {
      return res.json({
        success: false,
        message: "Unauthorized!",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error });
  }
});

// @route   POST /api/admin/feedback
// @desc    Get user feedback
// @access  public
router.post("/feedback", async (req, res) => {
  try {
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

    var re = /\S+@\S+\.\S+/;
    if (!re.test(req.body.email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    const { name, email, description } = req.body;

    const query = new Query({
      name,
      email,
      description,
    });

    await query.save();

    // Send email to admin
    let HelperOptions = {
      from: process.env.EmailName + "<" + process.env.EmailId + ">",
      to: "farmgateishere@gmail.com",
      subject: `${name} has submitted a Query`,
      text: `Hello Admin, \n\n${description} \n\n${name} can be contacted at ${email}`,
    };

    transporter.sendMail(HelperOptions, (err, info) => {
      if (err) throw err;
      console.log("The message was sent");
    });

    return res.json({
      success: true,
      message: "Query submitted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error });
  }
});

// @route   PUT /api/admin/items/:id
// @desc    Update item
// @access  Private
router.put("/items/:id", auth, async (req, res) => {
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

        item.image.data = fs.readFileSync(files.image.path);
        item.image.contentType = files.image.type;
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

// @route   POST /api/admin/certificate
// @desc    Create a new certificate
// @access  Public
router.post("/certificate", auth, async (req, res) => {
  try {
    const { name, url, shop } = req.body;

    let certificate = new Certificate({
      name,
      url,
      shop,
    });

    await certificate.save();

    return res.status(200).json({ success: true, certificate });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: err });
  }
});

// @route   PUT /api/admin/certificate/:id
// @desc    Update a new certificate
// @access  Public
router.put("/certificate/:id", auth, async (req, res) => {
  try {
    const newData = req.body;

    const certificate = await Certificate.findByIdAndUpdate(
      req.params.id,
      newData,
      { new: true }
    );

    return res.status(200).json({ success: true, certificate });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: err });
  }
});

// @route   DELETE /api/admin/certificate/:id
// @desc    Delete a certificate
// @access  Public
router.delete("/certificate/:id", auth, async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id).select(
      " _id"
    );

    if (!certificate) {
      return res
        .status(404)
        .json({ success: false, message: "Certificate not found" });
    }

    await Certificate.findByIdAndRemove(req.params.id);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: err });
  }
});

module.exports = router;
