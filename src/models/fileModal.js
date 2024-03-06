var mongoose = require("mongoose");

var fileSchema = mongoose.Schema(
  {
    name: { type: String },
    path: { type: String },
    size: { type: Number },
    mimetype: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("file", fileSchema, "files", {
  overwriteModels: true,
});
