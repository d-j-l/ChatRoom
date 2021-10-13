var express = require("express");
var app = express();

var cors = require("cors");
var http = require("http").Server(app);
var io = require("socket.io")(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: false,
  },
});

var sockets = require("./_socket.js");
var server = require("./_listen.js");

var bodyParser = require("body-parser");
app.use(bodyParser.json());

// define port used for server
var PORT = 8080;

// apply express middleware
app.use(cors());

// setup socket
sockets.connect(io, PORT);

// start server listening for requests
server.listen(http, PORT);

const mongoose = require("mongoose");
var { User } = require("./models/User");
var { Group } = require("./models/Group");
var { Channel } = require("./models/Channel");

mongoose.connect("mongodb://localhost:27017/ChatRoom", (err) => {
  if (!err) console.log("mongodb connection");
  else
    console.log(
      "error in mongdb connection : " + JSON.stringify(err, undefined, 2)
    );
});

// login
app.post("/api/login", function (req, res) {
  console.log("logging in...");

  var email = req.body.email;
  var password = req.body.password;

  // find any user that matches the email address provided
  User.find({ email: email }, (err, docs) => {
    var user = docs[0];

    // no users found
    if (docs.length == 0) {
      res.json({
        success: false,
        error: "Unable to find user with email provided",
        user: null,
      });
    }

    // user found
    else {
      if (user) {
        // passwords match
        if (user.password === password) {
          res.json({ success: true, error: "", user: user });
        }

        // passwords do not match
        else {
          res.json({
            success: false,
            error: "Password is incorrect",
            user: null,
          });
        }
      }

      // no user found
      else {
        res.json({
          success: false,
          error: "Unable to find user with email provided",
          user: null,
        });
      }
    }
  });
});

// get all users
app.get("/api/users", function (req, res) {
  console.log("getting all users...");
  
  User.find((err, docs) => {
    res.json({ users: docs });
  });
});

// get group's users
app.post("/api/groupUsers", function (req, res) {
  console.log("getting all group users...");

  Group.findById(req.body._id, (err, group) => {
    if (group) {
      res.json({
        success: true,
        groupUsers: group.users,
      });
    } else {
      res.json({
        success: false,
        groupUsers: [],
      });
    }
  });
});

// get channel's users
app.post("/api/channelUsers", function (req, res) {
  console.log("getting all channel users...");

  Channel.findById(req.body._id, (err, channel) => {
    if (channel) {
      res.json({
        success: true,
        channelUsers: channel.users,
      });
    } else {
      res.json({
        success: false,
        channelUsers: [],
      });
    }
  });
});

// get all groups
app.get("/api/groups", function (req, res) {
  console.log("getting all groups...");

  Group.find((err, docs) => {
    res.json({ groups: docs });
  });
});

// get all groups that provided user belongs to
app.post("/api/groupsForUser", function (req, res) {
  console.log("getting all groups user belongs to...");

  User.findById(req.body._id, (err1, user) => {
    var groupsForUser = [];

    Group.find((err2, groups) => {
      groups.forEach((group) => {
        const groupUser = group.users.find((y) => y._id.equals(user._id));

        if (groupUser) {
          groupsForUser.push(group);
        }
      });

      res.json({
        groupsForUser: groupsForUser,
      });
    });
  });
});

// get all channels
app.get("/api/channels", function (req, res) {
  console.log("getting all channels...");

  Channel.find((err, docs) => {
    res.json({ channels: docs });
  });
});

// get all channels the user belongs to for the specified group
app.post("/api/channelsForUser", function (req, res) {
  console.log(
    "getting all channels the user belongs to for the specified group..."
  );

  Group.findById(req.body.group._id, (err1, group) => {
    User.findById(req.body.user._id, (err2, user) => {
      var channelsForUser = [];

      Channel.find((err3, channels) => {
        channels.forEach((channel) => {
          // Check if channel belongs to specified group first
          if (group._id.equals(channel.groupId)) {
            // Check that user is part of this channel
            const channelUser = channel.users.find((y) =>
              y._id.equals(user._id)
            );

            if (channelUser) {
              channelsForUser.push(channel);
            }
          }
        });

        res.json({
          channelsForUser: channelsForUser,
        });
      });
    });
  });
});

// create new user
app.post("/api/createUser", function (req, res) {
  console.log("creating user...");

  var newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
  });

  newUser.save((err, doc) => {
    if (!err) {
      res.json({
        success: true,
        newUser: newUser,
      });
    }
  });
});

// create new group
app.post("/api/createGroup", function (req, res) {
  console.log("creating group...");

  var newGroup = new Group({
    name: req.body.name,
    users: [],
  });

  newGroup.save((err, doc) => {
    if (!err) {
      res.json({
        success: true,
        newGroup: newGroup,
      });
    }
  });
});

// create new channel
app.post("/api/createChannel", function (req, res) {
  console.log("creating channel...");

  var newChannel = new Channel({
    groupId: req.body.groupId,
    name: req.body.channelName,
    users: [],
    messages: [],
  });

  newChannel.save((err, doc) => {
    if (!err) {
      res.json({
        success: true,
        newChannel: newChannel,
      });
    }
  });
});

// delete user
app.post("/api/deleteUser", function (req, res) {
  console.log("deleting user...");

  User.findByIdAndRemove(req.body._id, (err, doc) => {
    if (!err) {
      res.json({
        success: true,
      });
    } else {
      res.json({
        success: false,
      });
    }
  });
});

// delete group
app.post("/api/deleteGroup", function (req, res) {
  console.log("deleting group...");

  Group.findByIdAndRemove(req.body._id, (err, doc) => {
    if (!err) {
      res.json({
        success: true,
      });
    } else {
      res.json({
        success: false,
      });
    }
  });
});

// delete channel
app.post("/api/deleteChannel", function (req, res) {
  console.log("deleting channel...");

  Channel.findByIdAndRemove(req.body._id, (err, doc) => {
    if (!err) {
      res.json({
        success: true,
      });
    } else {
      res.json({
        success: false,
      });
    }
  });
});

// add user to group
app.post("/api/addGroupUser", function (req, res) {
  console.log("adding user to group...");

  var userId = req.body.user._id;
  var groupId = req.body.group._id;

  User.findById(userId, (err1, user) => {
    Group.findById(groupId, (err2, group) => {
      if (!user || !group) {
        res.json({
          success: false,
        });
      } else {
        group.users.push(user);

        Group.findByIdAndUpdate(
          groupId,
          { users: group.users },
          (err3, docs) => {
            res.json({
              success: true,
            });
          }
        );
      }
    });
  });
});

// remove user from group
app.post("/api/removeGroupUser", function (req, res) {
  console.log("removing user from group...");

  var userId = req.body.user._id;
  var groupId = req.body.group._id;

  User.findById(userId, (err1, user) => {
    Group.findById(groupId, (err2, group) => {
      if (!user || !group) {
        res.json({
          success: false,
        });
      } else {
        const index = group.users.findIndex((x) => x._id.equals(user._id));

        if (index > -1) {
          group.users.splice(index, 1);
        }

        Group.findByIdAndUpdate(
          groupId,
          { users: group.users },
          (err3, docs) => {
            res.json({
              success: true,
            });
          }
        );
      }
    });
  });
});

// add user to channel
app.post("/api/addChannelUser", function (req, res) {
  console.log("adding user to channel...");

  var userId = req.body.user._id;
  var channelId = req.body.channel._id;

  User.findById(userId, (err1, user) => {
    Channel.findById(channelId, (err2, channel) => {
      if (!user || !channel) {
        res.json({
          success: false,
        });
      } else {
        channel.users.push(user);

        Channel.findByIdAndUpdate(
          channelId,
          { users: channel.users },
          (err3, docs) => {
            res.json({
              success: true,
            });
          }
        );
      }
    });
  });
});

// remove user from channel
app.post("/api/removeChannelUser", function (req, res) {
  console.log("removing user from channel...");

  var userId = req.body.user._id;
  var channelId = req.body.channel._id;

  User.findById(userId, (err1, user) => {
    Channel.findById(channelId, (err2, channel) => {
      if (!user || !channel) {
        res.json({
          success: false,
        });
      } else {
        const index = channel.users.findIndex((x) => x._id.equals(user._id));
        if (index > -1) {
          channel.users.splice(index, 1);
        }

        Channel.findByIdAndUpdate(
          channelId,
          { users: channel.users },
          (err3, docs) => {
            res.json({
              success: true,
            });
          }
        );
      }
    });
  });
});

// edit role
app.post("/api/changeRole", function (req, res) {
  console.log("editing role...");

  var id = req.body._id;
  var role = req.body.role;

  // find any user that matches the id
  User.findByIdAndUpdate(id, { role: role }, (err, docs) => {
    if (!err) {
      res.json({
        success: true,
      });
    } else {
      res.json({
        success: false,
      });
    }
  });
});

// get messages
app.post("/api/messages", function (req, res) {
  console.log("getting messages...");

  Channel.findById(req.body.channel._id, (err, channel) => {
    if (!channel) {
      res.json({
        success: false,
        messages: [],
      });
    } else {
      res.json({
        success: true,
        messages: channel.messages,
      });
    }
  });
});

// send messages
app.post("/api/sendMessage", function (req, res) {
  console.log("sending message...");

  var channelId = req.body.channel._id;

  Channel.findById(channelId, (err1, channel) => {
    channel.messages.push(req.body.message);

    Channel.findByIdAndUpdate(
      channelId,
      { messages: channel.messages },
      (err2, docs) => {
        res.json({
          success: true,
        });
      }
    );
  });
});

module.exports = app;