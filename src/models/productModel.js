import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: "category" }],
  brand: String,
  stock_quantity: Number,
  images: [String],
  attributes: [
    {
      name: String,
      value: String,
    },
  ],
  ratings: {
    average: Number,
    count: Number,
  },
  reviews: [
    {
      user: String,
      rating: Number,
      comment: String,
    },
  ],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  sku: String,
  weight: Number,
  dimensions: {
    length: Number,
    width: Number,
    height: Number,
  },
  tags: [String],
  availability: String,
  shipping_info: {
    free_shipping: Boolean,
    estimated_delivery: String,
  },
  related_products: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],
  warranty: {
    type: String,
    duration: Number,
    details: String,
  },
});

const Product = mongoose.model("product", productSchema);

module.exports = Product;
