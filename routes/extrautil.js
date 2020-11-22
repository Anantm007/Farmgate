const express = require("express");
const router = express.Router();

const fs = require("fs");
const path = require("path");
const shortid = require("shortid");
const { createInvoice } = require("./createInvoice");

// Models
const SuburbAndPostcode = require("../models/suburbAndPostcode");
const User = require("../models/user");
const Order = require("../models/order");
const Item = require("../models/item");

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

// @route   GET /api/util/specialInvoice/:orderId
// @desc    Generate PDF invoice using the user id
// @access  Public
router.get("/specialInvoice/:id", async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return res.json({
      success: false,
      message: "Order not found",
    });
  }
  const user = await User.findById(order.user).select("address zipCode suburb");

  await Promise.all(
    order.items.map(async (item) => {
      let fullItem = await Item.findById(item.item).select("-image").exec();
      let x = {
        itemName: fullItem.name,
        description: fullItem.description,
        price: fullItem.price,
        quantity: item.quantity,
        variant: fullItem.variant,
        amount: item.quantity * fullItem.price,
      };
      return x;
    })
  )
    .then((orderItems) => {
      const invoice = {
        shipping: {
          name: order.userName,
          address: user.address,
          suburb: user.suburb,
          country: "Australia",
          postal_code: user.zipCode,
        },
        instructions: order.instructions,
        items: orderItems,
        subtotal: order.subtotal,
        shippingAmount: order.tax_shipping, // Be careful
        tax: 0,
        total: order.totalAmount,
        invoice_nr: order._id,
      };
      const code = shortid.generate();
      createInvoice(invoice, `${code}.pdf`);

      // Send email to admin
      let HelperOptions = {
        from: process.env.EmailName + "<" + process.env.EmailId + ">",
        to: "farmgateishere@gmail.com",
        subject: `Re-generated Invoice for Order ${order._id}`,
        text: `Hello Admin, \n\nPlease find the attached re-generated invoice of ${order.userName} of $${order.totalAmount} purchased from ${order.shopName}`,
        attachments: [
          {
            filename: `${code}.pdf`,
            path: path.join(__dirname, `../${code}.pdf`),
            contentType: "application/pdf",
          },
        ],
      };

      transporter.sendMail(HelperOptions, (err, info) => {
        if (err) throw err;
        console.log("The message was sent");
      });

      return res.status(200).json({
        success: true,
        message: "Invoice sent to email ",
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

// @route   GET /api/util/cleanPostcodes
// @desc    Remove duplicate postcodes from MongoDB
// @access  Public
router.get("/cleanPostcodes", async (req, res) => {
  try {
    // path needs to be changes in future
    let data = JSON.parse(
      fs.readFileSync(`${__dirname}/postcodes_geo.json`, "utf-8")
    );

    var flags = {};
    let myData = [];
    data.filter(function (obj) {
      if (!flags[obj.postcode]) {
        flags[obj.postcode] = true;
        myData.push(obj);
      }
    });

    myData.forEach(async (obj) => {
      let x = new SuburbAndPostcode({
        postcode: obj.postcode,
        suburb: obj.suburb,
      });

      await x.save();
    });

    data = await SuburbAndPostcode.find({});

    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
});

// @route   GET /api/util/addSuburbs
// @desc    Add suburbs to users
// @access  Public
router.get("/addSuburbs", async (req, res) => {
  try {
    let users = await User.find({}).select("_id zipCode");

    users.forEach(async (user) => {
      let ob = await SuburbAndPostcode.findOne({ postcode: user.zipCode });
      if (ob) {
        user.suburb = ob.suburb;
        await user.save();
      } else {
        console.log("not found for", user.zipCode);
      }
    });

    users = await User.find({}).select("_id name zipCode suburb");
    return res.json(users);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
});

// @route   GET /api/util/addPromo
// @desc    Add fortyPromo field to all users
// @access  Public
router.get("/addPromo", async (req, res) => {
  try {
    let users = await User.find({}).select("_id");

    users.forEach(async (user) => {
      user.fortyPromo = 0;
      await user.save();
    });

    users = await User.find({}).select("_id name fortyPromo");

    return res.json(users);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
});

module.exports = router;
