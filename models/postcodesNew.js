const mongoose = require("mongoose");

const PostCodesNewSchema = new mongoose.Schema(
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

module.exports = mongoose.model("PostCodesNew", PostCodesNewSchema);
