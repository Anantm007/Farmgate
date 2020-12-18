const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      trim: true,
      maxlength: [50, "Name cannot be more than 50 characters"],
    },

    image: {
      data: Buffer,
      contentType: String,
    },

    description: {
      type: String,
      required: [true, "Please enter a description"],
    },

    price: {
      type: Number,
      required: [true, "Please add a price"],
    },

    variant: {
      // per kg or bunch or dozen
      type: String,
      required: true,
    },

    quality: {
      type: String,
      required: [true, "Please add a quality"],
    },

    inStock: {
      type: Boolean,
      default: true,
      required: [true, "Please add item stock status"],
    },

    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", ItemSchema);
