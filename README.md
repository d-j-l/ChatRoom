# phase1
3813ICT Software Frameworks - Assignment 1 - server and front end for a chat system.

### server
contains files required for communcation between client and server including web sockets.
install dependencies with "npm install" and start server with "node server.js".

### client
contains files required for displaying web app.
install dependencies with "npm install" and start client app with "ng serve".

# server side data structure

### users, var users
Stored as objects with properties written in name: value pairs separated by commas held within an array literal. 
Properties include id, name, email, password and role.

### groups, var groups
Stored as objects with properties written in name: value pairs separated by commas held within an array literal. 
Properties include id, name and users. The users property stores each user as an object written in name: value pairs separated by commas held within an array literal. 
Properties of each user object include id, name, email, password and role. 

### channels , var channels
Stored as objects written in name: value pairs separated by commas held within an array literal. 
Properties include id, groupId, name, users and messages. 
The users property stores each user as objects written in name: value pairs separated by commas held within an array literal. 
Properties of each user object include id, name, email, password and role. The messages property stores messages in an empty array literal. 

# angular architecture

### ionic framework
a library of optimized user interface components written in HTML, CSS and Javascript.  Allows for faster creation of web applications.

### components

admin
allows view of users, groups and channels depending on permissions given by user role.

channel-creator
allowing text input for new channel name and drop down menu assigning channel to group.

channel-users
add user to channel from drop down menu, view channel users and their corresponding email and role as well as the option to remove user from channel.

group-creator
allowing text input for new group.

group-users
add user to group from drop down menu, view group users and their corresponding email and role as well as the option to remove user from group.

role-editor
edit role of user from drop down menu.

user-creator
allowing text input for the creation of a new user, with name, email and password, with drop down menu to select role.

chat
allows view of groups, users and messages depending on access given to the user.

messages
view for sending and recieving messages.

login
allows text input for user email and password, providing user authentication. 

tabs
allows switching between admin and chat components. 

### services

socket.service
containing methods to initialise a socket, send and receive messages. 

### models

AdminPage
ChannelCreatorPage
ChannelUsersPage
GroupCreatorPage
GroupUsersPage
RoleEditorPage
UserCreatorPage
ChatPage
LoginPage
TabsPage

### routes
stored within an array in app-routing.module.ts. Lazy loading is utilized to speed up application load time with loadChildren.

path: ‘ ‘, loadChildren: () => import(‘./login/login.module’).then((m) = > m.LoginPageModule)

path: ‘ ‘, loadChildren: () => import(‘./tabs/tabs.module’).then((m) = > m.TabsPageModule)

path: ‘login ‘, loadChildren: () => import(‘./login/login.module’).then((m) = > m.LoginPageModule)

path: ‘chat‘, loadChildren: () => import(‘./chat/chat.module’).then((m) = > m.ChatPageModule)

path: ‘admin‘, loadChildren: () => import(‘./admin/admin.module’).then((m) = > m.AdminPageModule)

# node server architecture

### modules

express
web application framework for Node.js.

cors
cross-origin resource sharing, providing relaxed security applied to an API (application programming interface, a connection between computers). 

http
allows Node.js to transfer data over the Hypertext Transfer Protocol (HTTP).

socket.io
allows realtime, bi-directional communication between web clients and servers.

body-parser
responsible for parsing incoming request bodies in a middleware before it is handled.

### functions

login, /api/login
provides user authentication.

get all users, /api/users
returns all users.

get group’s users, /api/groupUsers
returns users of a group.

get channel’s users, /api/channelUsers
returns users of a channel.

get all groups, /api/groups
returns all groups.

get all groups that provided user belongs to, /api/groupsForUser
returns groups a user belongs to.

get all channels, /api/channels
returns all channels.

get all channels the user belongs to for the specified group, /api/channelsForUser 
returns channels a user belongs inside the group.

create new user, /api/createUser 
adds a user to the users array.

create new group, /api/createGroup 
adds a group to the groups array.

create new channel, /api/createChannel 
adds a channel to the channels array.

delete user, /api/deleteUser 
removes user from users array.

delete group, /api/deleteGroup 
removes group from groups array.

delete channel, /api/deleteChannel 
removes channel from channels array.

add user to group, /api/deleteGroupUser 
adds a user to the users array inside the groups array. 

remove user from group, /api/removeGroupUser
removes a user from the users array inside the groups array.

add user to channel, /api/addChannelUser
adds a user to the users array inside the channels array.

remove user from channel, /api/removeChannelUser 
removes a user from the users array inside the channels array.

edit role, /api/changeRole 
changes the role of a user of the users array.

get messages, /api/messages 
returns messages of a channel.

send messages, /api/sendMessage
sends messages to a channel. 

### files

server.js
main server file containing all the necessary modules (body-parser, cors, express, socket.io), applying modules, defining ports, socket setup, data structures (users, groups, channels), global variables and functions.

_listen.js
setup to listen to requests on port.

_socket.js
setup to handle requests, respond to message events and emit data to connected clients. 

package.json
lists the dependencies of the server.

### global variables
	
newUid
new user id, used when calling the create new user function.

newGid
new group id, used when calling the create new group function.

newCid
new channel id, used when calling the create new channel function.

PORT
defining the port used for the server. 

### routes

app.get("/api/users"... returns users.

app.post("/api/groupUsers"... parameters: group... returns groups for user.

app.post("/api/channelUsers"... parameters: channel... returns channels for user.

app.get("/api/groups"... returns groups.

app.post("/api/groupsForUser"... parameters: user, groupsForUser, groupUser... returns groups user belongs to.

app.get("/api/channels"... returns channels.

app.post("/api/channelsForUser"... parameters: group, user, channelsForUser, channelUser... returns channles user belongs to for a specific group. 

app.post("/api/createUser"... parameters: newUser{id, name, email, password, role}... returns new user object.

app.post("/api/createGroup"... parameters: newGroup{id, name, users}... returns new group object.

app.post("/api/createChannel"... parameters: newChannel{id, groupID, name, users, messages}...returns new channel object.

app.post("/api/deleteUser"... parameters: index... returns boolean.

app.post("/api/deleteGroup"... parameters: index... returns boolean.

app.post("/api/deleteChannel"... parameters: index... returns boolean.

app.post("/api/addGroupUser"... parameters: userId, user, groupId, group... returns new user to group.

app.post("/api/removeGroupUser... parameters: userId, user, groupId, group... returns boolean.

app.post("/api/addChannelUser"... paramters: userId, user, channelId, channel... returns new user to channel.

app.post("/api/removeChannelUser"... paramters: userId, user, channelId, channel... returns boolean.

app.post("/api/changeRole"... parameters: id, role, user... returns edit user role.

app.post("/api/messages"... parameters: channel... returns messages for channel.

app.post("/api/sendMessage"... parameters: channel... returns messages to channel
