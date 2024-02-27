// models/productReviewModel.js
import mongoose from "mongoose";

const productReviewSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: String,
  user: {
    type: String,
    required: true,
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const ProductReview = mongoose.model(
  "productreview",
  productReviewSchema,
  "productreviews",
  { overwriteModels: true }
);

export default ProductReview;
