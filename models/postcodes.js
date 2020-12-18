const mongoose = require("mongoose");

const PostCodesSchema = new mongoose.Schema(
  {
    adminName: {
      type: String,
      required: true,
    },

    codes: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PostCodes", PostCodesSchema);
