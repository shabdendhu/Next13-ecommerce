const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true,
      },
      addedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const Wishlist =
  mongoose.model.wishList || mongoose.model("wishList", wishlistSchema);

module.exports = Wishlist;
