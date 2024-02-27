const mongoose = require("mongoose");

// Define the Banner Schema
const bannerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  targetURL: {
    type: String,
    required: true,
  },
  pathURL: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

// Create the Banner model
const Banner = mongoose.model("banner", bannerSchema, "banners", {
  overwriteModels: true,
});

module.exports = Banner;
