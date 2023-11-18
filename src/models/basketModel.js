const mongoose = require("mongoose");

// Define the Basket schema
const basketSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model (assuming you have a User model)
    required: false,
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", // Reference to the Product model
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
        min: 1,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  total: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
// post add to basket
// remove from basket