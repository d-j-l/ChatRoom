const mongoose = require("mongoose");

var Upload = mongoose.model("Upload", {
  filename: { type: String },
  path: { type: String },
});

module.exports = { Upload };
