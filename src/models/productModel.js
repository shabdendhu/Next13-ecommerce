import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: "category" }],
  brand: String,
  stock_quantity: Number,
  images: [String],
  discount: Number,
  unitQuantity: {
    value: Number,
    unit: String,
  },
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
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "productreview" }],
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
  related_products: [{ type: mongoose.Schema.Types.ObjectId, ref: "products" }],
  warranty: {
    type: String,
    duration: Number,
    details: String,
  },
});

module.exports =
  mongoose.models.product || mongoose.model("product", productSchema);
