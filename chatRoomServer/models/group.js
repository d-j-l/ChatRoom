const mongoose = require("mongoose");

var Group = mongoose.model("Group", {
  name: { type: String },
  users: { type: Array },
});

module.exports = { Group };
