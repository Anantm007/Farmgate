require("dotenv").config();
const fs = require("fs");
const path = require("path");

// Models
const Certificate = require("../models/certificate");
const Item = require("../models/item");
const Order = require("../models/order");
const Postcodes = require("../models/postcodes");
const PostcodesNew = require("../models/postcodesNew");
const Query = require("../models/query");
const Shop = require("../models/shop");
const SuburbAndPostcode = require("../models/suburbAndPostcode");
const User = require("../models/user");

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

module.exports = {
  databaseBackup: async (req, res) => {
    try {
      const certificates = await Certificate.find({});
      const items = await Item.find({}).select("-image");
      const orders = await Order.find({});
      const postcodes = await Postcodes.find({});
      const postcodesNew = await PostcodesNew.find({});
      const queries = await Query.find({});
      const shops = await Shop.find({}).select("-image");
      const suburbAndPostcode = await SuburbAndPostcode.find({});
      const users = await User.find({});

      let requiredPath = path.join(__dirname, "../backup");

      let data = JSON.stringify(certificates, null, 2);
      fs.writeFileSync(`${requiredPath}/certificates.json`, data);

      data = JSON.stringify(items, null, 2);
      fs.writeFileSync(`${requiredPath}/items.json`, data);

      data = JSON.stringify(orders, null, 2);
      fs.writeFileSync(`${requiredPath}/orders.json`, data);

      data = JSON.stringify(postcodes, null, 2);
      fs.writeFileSync(`${requiredPath}/postcodes.json`, data);

      data = JSON.stringify(postcodesNew, null, 2);
      fs.writeFileSync(`${requiredPath}/postcodesNew.json`, data);

      data = JSON.stringify(queries, null, 2);
      fs.writeFileSync(`${requiredPath}/queries.json`, data);

      data = JSON.stringify(shops, null, 2);
      fs.writeFileSync(`${requiredPath}/shops.json`, data);

      data = JSON.stringify(suburbAndPostcode, null, 2);
      fs.writeFileSync(`${requiredPath}/suburbAndPostcode.json`, data);

      data = JSON.stringify(users, null, 2);
      fs.writeFileSync(`${requiredPath}/users.json`, data);

      let HelperOptions = {
        from: process.env.EmailName + "<" + process.env.EmailId + ">",
        to: "farmgatedevishere@gmail.com",
        subject: `Farmgate Ag Backup for ${new Date()}`,
        attachments: [
          {
            filename: `certificates.json`,
            path: path.join(__dirname, `../backup/certificates.json`),
          },
          {
            filename: `items.json`,
            path: path.join(__dirname, `../backup/items.json`),
          },
          {
            filename: `orders.json`,
            path: path.join(__dirname, `../backup/orders.json`),
          },
          {
            filename: `postcodes.json`,
            path: path.join(__dirname, `../backup/postcodes.json`),
          },
          {
            filename: `postcodesNew.json`,
            path: path.join(__dirname, `../backup/postcodesNew.json`),
          },
          {
            filename: `queries.json`,
            path: path.join(__dirname, `../backup/queries.json`),
          },
          {
            filename: `shops.json`,
            path: path.join(__dirname, `../backup/shops.json`),
          },
          {
            filename: `suburbAndPostcode.json`,
            path: path.join(__dirname, `../backup/suburbAndPostcode.json`),
          },
          {
            filename: `users.json`,
            path: path.join(__dirname, `../backup/users.json`),
          },
        ],
      };

      transporter.sendMail(HelperOptions, (err, info) => {
        if (err) throw err;
        console.log("The message was sent...");
      });

      return;
    } catch (err) {
      console.log(err);
      return res.status(500).json(error);
    }
  },
};
