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

var newUid = 100;
var newGid = 200;
var newCid = 300;

var users = [
  {
    id: 1,
    name: "Super",
    email: "super@email.com",
    password: "super",
    role: "Super Admin",
  },
  {
    id: 2,
    name: "Cedric",
    email: "cedric@email.com",
    password: "cedric",
    role: "Group Admin",
  },
  {
    id: 3,
    name: "Dylan",
    email: "dylan@email.com",
    password: "dylan",
    role: "Group Assis",
  },
  {
    id: 4,
    name: "Hayden",
    email: "hayden@email.com",
    password: "hayden",
    role: "User",
  },
];

var groups = [
  {
    id: 1,
    name: "Group A",
    users: [
      {
        id: 1,
        name: "Super",
        email: "super@email.com",
        password: "super",
        role: "Super Admin",
      },
      {
        id: 2,
        name: "Cedric",
        email: "cedric@email.com",
        password: "cedric",
        role: "Group Admin",
      },
      {
        id: 3,
        name: "Dylan",
        email: "dylan@email.com",
        password: "dylan",
        role: "Group Assis",
      },
    ],
  },
  {
    id: 2,
    name: "Group B",
    users: [
      {
        id: 2,
        name: "Cedric",
        email: "cedric@email.com",
        password: "cedric",
        role: "Group Admin",
      },
      {
        id: 3,
        name: "Dylan",
        email: "dylan@email.com",
        password: "dylan",
        role: "Group Assis",
      },
      {
        id: 4,
        name: "Hayden",
        email: "hayden@email.com",
        password: "hayden",
        role: "User",
      },
    ],
  },
  {
    id: 3,
    name: "Group C",
    users: [],
  },
];

var channels = [
  {
    id: 1,
    groupId: 1,
    name: "Channel A1",
    users: [
      {
        id: 2,
        name: "Cedric",
        email: "cedric@email.com",
        password: "cedric",
        role: "Group Admin",
      },
      {
        id: 3,
        name: "Dylan",
        email: "dylan@email.com",
        password: "dylan",
        role: "Group Assis",
      },
    ],
    messages: [],
  },
  {
    id: 2,
    groupId: 1,
    name: "Channel A2",
    users: [],
    messages: [],
  },
  {
    id: 3,
    groupId: 2,
    name: "Channel B1",
    users: [
      {
        id: 2,
        name: "Cedric",
        email: "cedric@email.com",
        password: "cedric",
        role: "Group Admin",
      },
      {
        id: 4,
        name: "Hayden",
        email: "hayden@email.com",
        password: "hayden",
        role: "User",
      },
    ],
    messages: [],
  },
  {
    id: 4,
    groupId: 3,
    name: "Channel C1",
    users: [],
    messages: [],
  },
];

// login
app.post("/api/login", function (req, res) {
  console.log("logging in...");

  var email = req.body.email;
  var password = req.body.password;

  // find any user that matches the email address provided
  var user = users.find((x) => {
    return x.email === email;
  });

  // user found
  if (user) {
    // passwords match
    if (user.password === password) {
      res.json({ success: true, error: "", user: user });
    }

    // passwords do not match
    else {
      res.json({ success: false, error: "Password is incorrect", user: null });
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
});

// get all users
app.get("/api/users", function (req, res) {
  console.log("getting all users...");

  res.json({
    users: users,
  });
});

// get group's users
app.post("/api/groupUsers", function (req, res) {
  console.log("getting all group users...");

  const group = groups.find((x) => x.id == req.body.id);

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

// get channel's users
app.post("/api/channelUsers", function (req, res) {
  console.log("getting all channel users...");

  const channel = channels.find((x) => x.id == req.body.id);

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

// get all groups
app.get("/api/groups", function (req, res) {
  console.log("getting all groups...");

  res.json({
    groups: groups,
  });
});

// get all groups that provided user belongs to
app.post("/api/groupsForUser", function (req, res) {
  console.log("getting all groups user belongs to...");

  const user = users.find((x) => x.id == req.body.id);

  var groupsForUser = [];

  groups.forEach((group) => {
    const groupUser = group.users.find((y) => y.id == user.id);

    if (groupUser) {
      groupsForUser.push(group);
    }
  });

  res.json({
    groupsForUser: groupsForUser,
  });
});

// get all channels
app.get("/api/channels", function (req, res) {
  console.log("getting all channels...");

  res.json({
    channels: channels,
  });
});

// get all channels the user belongs to for the specified group
app.post("/api/channelsForUser", function (req, res) {
  console.log(
    "getting all channels the user belongs to for the specified group..."
  );

  const group = users.find((x) => x.id == req.body.group.id);
  const user = users.find((x) => x.id == req.body.user.id);

  var channelsForUser = [];

  channels.forEach((channel) => {
    // Check if channel belongs to specified group first
    if (group.id === channel.groupId) {
      // Check that user is part of this channel
      const channelUser = channel.users.find((y) => y.id == user.id);

      if (channelUser) {
        channelsForUser.push(channel);
      }
    }
  });

  res.json({
    channelsForUser: channelsForUser,
  });
});

// create new user
app.post("/api/createUser", function (req, res) {
  console.log("creating user...");

  var newUser = {
    id: newUid++,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
  };

  users.push(newUser);

  res.json({
    success: true,
    newUser: newUser,
  });
});

// create new group
app.post("/api/createGroup", function (req, res) {
  console.log("creating group...");

  var newGroup = {
    id: newGid++,
    name: req.body.name,
    users: [],
  };

  groups.push(newGroup);

  res.json({
    success: true,
    newGroup: newGroup,
  });
});

// create new channel
app.post("/api/createChannel", function (req, res) {
  console.log("creating channel...");

  var newChannel = {
    id: newCid++,
    groupId: req.body.groupId,
    name: req.body.channelName,
    users: [],
    messages: [],
  };

  channels.push(newChannel);

  res.json({
    success: true,
    newChannel: newChannel,
  });
});

// delete user
app.post("/api/deleteUser", function (req, res) {
  console.log("deleting user...");

  const index = users.findIndex((user) => user.id == req.body.id);

  if (index > -1) {
    users.splice(index, 1);

    res.json({
      success: true,
    });
  } else {
    res.json({
      success: false,
    });
  }
});

// delete group
app.post("/api/deleteGroup", function (req, res) {
  console.log("deleting group...");

  const index = groups.findIndex((group) => group.id == req.body.id);

  if (index > -1) {
    groups.splice(index, 1);

    res.json({
      success: true,
    });
  } else {
    res.json({
      success: false,
    });
  }
});

// delete channel
app.post("/api/deleteChannel", function (req, res) {
  console.log("deleting channel...");

  const index = channels.findIndex((channel) => channel.id == req.body.id);

  if (index > -1) {
    channels.splice(index, 1);

    res.json({
      success: true,
    });
  } else {
    res.json({
      success: false,
    });
  }
});

// add user to group
app.post("/api/addGroupUser", function (req, res) {
  console.log("adding user to group...");

  var userId = req.body.user.id;
  var user = users.find((x) => {
    return x.id === userId;
  });

  var groupId = req.body.group.id;
  var group = groups.find((x) => {
    return x.id === groupId;
  });

  if (!user || !group) {
    res.json({
      success: false,
    });
  } else {
    group.users.push(user);

    res.json({
      success: true,
    });
  }
});

// remove user from group
app.post("/api/removeGroupUser", function (req, res) {
  console.log("removing user from group...");

  var userId = req.body.user.id;
  var user = users.find((x) => {
    return x.id === userId;
  });

  var groupId = req.body.group.id;
  var group = groups.find((x) => {
    return x.id === groupId;
  });

  if (!user || !group) {
    res.json({
      success: false,
    });
  } else {
    const index = group.users.findIndex((x) => x.id == user.id);
    if (index > -1) {
      group.users.splice(index, 1);
    }

    res.json({
      success: true,
    });
  }
});

// add user to channel
app.post("/api/addChannelUser", function (req, res) {
  console.log("adding user to channel...");

  var userId = req.body.user.id;
  var user = users.find((x) => {
    return x.id === userId;
  });

  var channelId = req.body.channel.id;
  var channel = channels.find((x) => {
    return x.id === channelId;
  });

  if (!user || !channel) {
    res.json({
      success: false,
    });
  } else {
    channel.users.push(user);

    res.json({
      success: true,
    });
  }
});

// remove user from channel
app.post("/api/removeChannelUser", function (req, res) {
  console.log("removing user from channel...");

  var userId = req.body.user.id;
  var user = users.find((x) => {
    return x.id === userId;
  });

  var channelId = req.body.channel.id;
  var channel = channels.find((x) => {
    return x.id === channelId;
  });

  if (!user || !channel) {
    res.json({
      success: false,
    });
  } else {
    const index = channel.users.findIndex((x) => x.id == user.id);
    if (index > -1) {
      channel.users.splice(index, 1);
    }

    res.json({
      success: true,
    });
  }
});

// edit role
app.post("/api/changeRole", function (req, res) {
  console.log("editing role...");

  var id = req.body.id;
  var role = req.body.role;

  // find any user that matches the id
  var user = users.find((x) => {
    return x.id === id;
  });

  if (user) {
    user.role = role;

    res.json({
      success: true,
    });
  } else {
    res.json({
      success: false,
    });
  }
});

// get messages
app.post("/api/messages", function (req, res) {
  console.log("getting messages...");

  var channel = channels.find((x) => {
    return x.id === req.body.channel.id;
  });

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

// send messages
app.post("/api/sendMessage", function (req, res) {
  console.log("sending message...");

  var channel = channels.find((x) => {
    return x.id === req.body.channel.id;
  });

  if (channel) {
    channel.messages.push(req.body.message);
  }

  res.json({
    success: true,
  });
});
