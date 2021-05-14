// Models
const Shop = require("../models/shop");
const Item = require("../models/item");

// Middleware
const fs = require("fs");

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

// Retrieve shop image from MongoDB and upload it to cloudinary and then to schema
const buffer_image_shops = async () => {
  const shops = await Shop.find().select("_id name image");

  shops.map(async (shop) => {
    const path = `images-upload/shops/${shop._id}.jpg`;

    fs.writeFileSync(path, shop.image.data);

    const res = await cloudinary.v2.uploader.upload(path, {
      folder: "cloudImages",
      use_filename: true,
    });

    shop.photo = res.secure_url;
    // shop.image = undefined;
    await shop.save();

    console.log("done", shop.name);
  });
};

// Retrieve item image from MongoDB and upload it to cloudinary and then to schema
const buffer_image_items = async () => {
  const items = await Item.find().select("_id name image");

  items.map(async (item) => {
    const path = `images-upload/items/${item._id}.jpg`;

    fs.writeFileSync(path, item.image.data);

    const res = await cloudinary.v2.uploader.upload(path, {
      folder: "cloudImages",
      use_filename: true,
    });

    item.photo = res.secure_url;
    // item.image = undefined;
    await item.save();

    console.log("done", item.name);
  });
};

module.exports = { buffer_image_items };
