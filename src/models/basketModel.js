const mongoose = require("mongoose");

// Define the Basket schema
const basketSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user", // Reference to the User model (assuming you have a User model)
    required: false,
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product", // Reference to the Product model
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
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
const Basket = mongoose.model("basket", basketSchema, "baskets", {
  overwriteModels: true,
});

module.exports = Basket;
