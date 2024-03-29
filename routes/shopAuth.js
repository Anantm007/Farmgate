const express = require("express");
const router = express.Router();

const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const formidable = require("formidable");
const fs = require("fs");

// Models
const Shop = require("../models/shop");

// Nodemailer setup
// Email templates
const welcomeShop = require("./emailTemplates/welcomeShop");
const forgotPass = require("./emailTemplates/forgotPassword");
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

/*                                                  ROUTES                                                  */

// @route   POST /api/shop/auth
// @desc    Register a new shop
// @access  Public
router.post("/", async (req, res) => {
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
      const {
        name,
        email,
        password,
        address,
        zipCode,
        phoneNumber,
        facebook,
        instagram,
        description,
        ABN,
      } = fields;

      if (
        !name ||
        !description ||
        !email ||
        !password ||
        !address ||
        !zipCode ||
        !phoneNumber ||
        !ABN
      ) {
        return res.status(400).json({
          success: false,
          message: "Please fill all the fields",
        });
      }

      let oldShop = await Shop.findOne({ email });

      // Shop already registered
      if (oldShop) {
        return res.status(400).json({
          success: false,
          message: "Shop already registered!",
        });
      }

      // Create new shop now
      let shop = new Shop(fields);

      // Handle files
      if (files.image) {
        // Validate file size less than 1 MB
        if (files.image.size > 1000000) {
          return res.status(400).json({
            success: false,
            message: "File size should be less than 1 MB",
          });
        }

        shop.image.data = fs.readFileSync(files.image.path);
        shop.image.contentType = files.image.type;
      }

      // Encrypting the password
      const salt = await bcrypt.genSalt(10);
      shop.password = await bcrypt.hash(password, salt);

      // Save to database
      await shop.save();

      // Payload for jwt
      const payload = {
        shop: {
          id: shop._id,
        },
      };

      // Signing the payload
      jwt.sign(
        payload,
        process.env.jwtSecret,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;

          // Do not send this to the client
          shop.password = undefined;
          shop.image = undefined;

          res.json({
            // Send token back to the client
            success: true,
            token,
            shop,
          });

          let information = {
            shopName: shop.name,
          };
          const mailHtml = welcomeShop(information);

          // Send welcome email
          let HelperOptions = {
            from: process.env.EmailName + "<" + process.env.EmailId + ">",
            to: email,
            subject: "Welcome to Farmgate!",
            html: mailHtml,
          };

          transporter.sendMail(HelperOptions, (err, info) => {
            if (err) throw err;
            console.log("The message was sent");
          });
        }
      );
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error });
  }
});

// @route   POST /api/shop/auth/forgot
// @desc    Forgot Password
// @access  Only for registered shop (Cannot be auth if he forgot his password)
router.post("/forgot", async (req, res) => {
  try {
    const shop = await Shop.findOne({ email: req.body.email });

    if (!shop) {
      return res.json({
        success: false,
        message: "Shop not found with that email",
      });
    }

    // Generate and hash password token using crypto (to besent to the user)
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Hash it to store in the database
    shop.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Set expire
    shop.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    // Saving reset token and expires in the database
    await shop.save();

    // Send reset password email
    const resetUrl = `${req.protocol}://farmgate-market.com/shop/reset/password/${resetToken}`;

    const information = {
      name: shop.name,
      resetUrl,
    };
    const mailHtml = forgotPass(information);

    let HelperOptions = {
      from: process.env.EmailName + "<" + process.env.EmailId + ">",
      to: shop.email,
      subject: "Farmgate Password Reset",
      html: mailHtml,
    };

    transporter.sendMail(HelperOptions, (err, info) => {
      if (err) throw err;

      res.json({
        success: true,
        message: "Email sent successfully",
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error });
  }
});

// @route   PUT /api/shop/auth/resetPassword/:resetToken
// @desc    Reset Password using token
// @access  Only for registered (shop cannot be auth if he forgot his password)
router.put("/resetPassword/:resetToken", async (req, res) => {
  try {
    // Validate new password
    if (
      !req.body.password ||
      req.body.password === "" ||
      req.body.password.length < 6
    ) {
      return res.json({
        success: false,
        message: "Please enter a valid password with 6 or more characters",
      });
    }

    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.resetToken)
      .digest("hex");

    const shop = await Shop.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!shop) {
      return res.json({
        success: false,
        message: "Invalid Token",
      });
    }
    // Encrypting the password
    const salt = await bcrypt.genSalt(10);
    shop.password = await bcrypt.hash(req.body.password, salt);

    shop.resetPasswordToken = undefined;
    shop.resetPasswordExpire = undefined;

    // Save new password to database
    await shop.save();

    return res.json({
      success: true,
      message: "Password updated!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error });
  }
});

module.exports = router;
