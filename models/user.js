const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Please add a valid email"],
      trim: true,
      unique: true,
    },

    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: 6,
    },

    address: {
      type: String,
      required: [true, "Please add an address"],
    },

    zipCode: {
      type: Number,
      required: [true, "Please add a zip code"],
    },

    suburb: {
      type: String,
      trim: true,
    },

    phoneNumber: {
      type: Number,
      unique: true,
      required: [true, "Please add a phone number"],
    },

    role: {
      type: Number,
      default: 0,
    },

    cart: [
      {
        item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Item",
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],

    history: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],

    fortyPromo: {
      type: Number,
      default: 0,
      required: true,
    },

    twentyPromo: {
      type: Number,
      default: 0,
      required: true,
    },

    newUser: {
      type: Boolean,
      required: true,
    },

    resetPasswordToken: {
      type: String,
    },

    resetPasswordExpire: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
