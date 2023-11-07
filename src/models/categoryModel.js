import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: String,
  description: String, // A description of the category
  parent_category: {
    // Reference to the parent category (if applicable)
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
  },
  subcategories: [
    {
      // Subcategories within this category
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
  ],
  image: String, // URL to an image representing the category
  meta_keywords: [String], // Keywords for SEO
  is_active: Boolean, // Indicates whether the category is active or not
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
