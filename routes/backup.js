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

      let data = `[ ${JSON.stringify(certificates, null, 2)}`;
      data += `, ${JSON.stringify(items, null, 2)}`;
      data += `, ${JSON.stringify(orders, null, 2)}`;
      data += `, ${JSON.stringify(postcodes, null, 2)}`;
      data += `, ${JSON.stringify(postcodesNew, null, 2)}`;
      data += `, ${JSON.stringify(queries, null, 2)}`;
      data += `, ${JSON.stringify(shops, null, 2)}`;
      data += `, ${JSON.stringify(suburbAndPostcode, null, 2)}`;
      data += `, ${JSON.stringify(users, null, 2)} ]`;

      fs.writeFileSync(`${requiredPath}/backup.json`, data);
      return;
    } catch (err) {
      console.log(err);
      return res.status(500).json(error);
    }
  },
};
