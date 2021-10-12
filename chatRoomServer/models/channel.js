const mongoose = require("mongoose");
var ObjectId = require("mongoose").Types.ObjectId;

var Channel = mongoose.model("Channel", {
  name: { type: String },
  groupId: { type: ObjectId },
  users: { type: Array },
  messages: { type: Array },
});

module.exports = { Channel };
