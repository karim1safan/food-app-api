const mongoose = require("mongoose");

//schema
const ordersSchema = new mongoose.Schema(
  {
    foods: [{ type: mongoose.Schema.Types.ObjectId, ref: "Foods" }],
    payment: {},
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    deliveryAddress: {
      type: String,
      required: true,
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
    },
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    orderStatus: {
      type: String,
      enum: ["preparing", "on the way", "delivered"],
      default: "preparing",
    },
  },
  { timestamps: true }
);

//export
module.exports = mongoose.model("Orders", ordersSchema);