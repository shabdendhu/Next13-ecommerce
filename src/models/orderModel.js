const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: false,
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true,
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
  totalAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["orderd", "payment", "shipped", "delivered", "canceled"],
    default: "orderd",
  },
  shippingAddress: {
    addressLine1: String,
    addressLine2: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
  },
  billingAddress: {
    addressLine1: String,
    addressLine2: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
  },
  paymentMethod: {
    type: String,
    // enum: ["credit_card", "paypal", "cash_on_delivery"],
    default: "phonepay",
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },
  transactionId: String,
  paidAmount: String,
  //add expected delivery date 5days from today
  expectedDeliveryDate: {
    type: Date,
    default: function () {
      // Calculate expected delivery date 5 days from today
      const deliveryDate = new Date();
      deliveryDate.setDate(deliveryDate.getDate() + 5);
      return deliveryDate;
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
// console.log(mongoose.models);

const Order = mongoose.model("order", orderSchema, "orders", {
  overwriteModels: true,
});
// console.log(mongoose.models);

module.exports = Order;
