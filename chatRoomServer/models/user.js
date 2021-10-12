const mongoose = require("mongoose");

var User = mongoose.model("User", {
  name: { type: String },
  email: { type: String },
  password: { type: String },
  role: { type: String },
});

module.exports = { User };
