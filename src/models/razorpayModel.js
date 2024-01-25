const mongoose = require("mongoose");

// Define the Banner Schema
const paymentSchema = new mongoose.Schema({
  razorpay_order_id: {
    type: String,
    required: true,
  },
  razorpay_payment_id: {
    type: String,
    required: true,
  },
  razorpay_signature: {
    type: String,
    required: true,
  },
});

const Banner =
  mongoose.models.payment || mongoose.model("payment", paymentSchema);

module.exports = Banner;
