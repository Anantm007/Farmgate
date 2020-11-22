const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
    },

    instructions: {
      type: String,
      default: "",
    },

    userName: {
      type: String,
      required: true,
    },

    shopName: {
      type: String,
      required: true,
    },

    deliveryAddress: {
      type: String,
      required: true,
    },

    InvoiceIncluded: {
      type: Boolean,
      default: false,
      required: true,
    },

    items: [
      {
        item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Item",
        },

        itemName: {
          type: String,
          required: true,
        },

        variant: {
          type: String,
          required: true,
        },

        quantity: {
          type: Number,
          required: [true, "Please add quantity"],
        },
      },
    ],

    subtotal: {
      type: Number,
      min: 0,
      required: true,
    },

    tax_shipping: {
      type: Number,
      default: 4.95,
      min: 0,
    },

    totalAmount: {
      type: Number,
      min: 0,
      required: true,
    },

    status: {
      type: String,
      default: "Order Received",
      enum: ["Order Received", "Dispatched", "Delivered", "Cancelled"], // enum means string objects
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
