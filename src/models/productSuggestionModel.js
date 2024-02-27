const mongoose = require("mongoose");

const productSuggestion = new mongoose.Schema({
  productIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }], //select
  screenName: { type: String, required: true }, //input
  sequence: { type: Number }, //number
  name: String,
});

module.exports = mongoose.model(
  "productsuggestion",
  productSuggestion,
  "productsuggestions",
  {
    overwriteModels: true,
  }
);

//   crud api in BE of this model
// sugg.... manager page
// form with above fileds
