const mongoose = require("mongoose");

const productSuggestion = new mongoose.Schema({
  productIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }], //select
  screenName: { type: String, required: true }, //input
  sequence: { type: Number }, //number
});

module.exports =
  mongoose.models.productsuggestion ||
  mongoose.model("productsuggestion", productSuggestion);

//   crud api in BE of this model
// sugg.... manager page
// form with above fileds
