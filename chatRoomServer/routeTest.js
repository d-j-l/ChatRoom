var assert = require('assert');
var app = require('./server.js');
var http = require('http');
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
chai.use(chaiHttp);

describe("*login", () => {

    it('status', (done) => {
        chai.request(app)
            .post('/api/login')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    it('body object', (done) => {
        chai.request(app)
            .post('/api/login')
            .end((err, res) => {
                res.body.should.be.a('object');
                done();
            });
    });
    it('body success', (done) => {
        chai.request(app)
            .post('/api/login')
            .end((err, res) => {
                res.body.should.have.property('success');
                done();
            });
    });
    it('body error', (done) => {
        chai.request(app)
            .post('/api/login')
            .end((err, res) => {
                res.body.should.have.property('error');
                done();
            });
    });
    it('body user', (done) => {
        chai.request(app)
            .post('/api/login')
            .end((err, res) => {
                res.body.should.have.property('user');
                done();
            });
    });

});

describe("*get all users", () => {

    it('body object', (done) => {
        chai.request(app)
            .post('/api/users')
            .end((err, res) => {
                res.body.should.be.a('object');
                done();
            });
    });

});

describe("*get group's users", () => {

    it('status', (done) => {
        chai.request(app)
            .post('/api/groupUsers')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    it('body object', (done) => {
        chai.request(app)
            .post('/api/groupUsers')
            .end((err, res) => {
                res.body.should.be.a('object');
                done();
            });
    });
    it('body success', (done) => {
        chai.request(app)
            .post('/api/groupUsers')
            .end((err, res) => {
                res.body.should.have.property('success');
                done();
            });
    });
    it('body groupUsers', (done) => {
        chai.request(app)
            .post('/api/groupUsers')
            .end((err, res) => {
                res.body.should.have.property('groupUsers');
                done();
            });
    });
    it('groupUser array', (done) => {
        chai.request(app)
            .post('/api/groupUsers')
            .end((err, res) => {
                res.body.groupUsers.should.be.a('array');
                done();
            });
    });

});

describe("*get channel's users", () => {

    it('body object', (done) => {
        chai.request(app)
            .post('/api/channelUsers')
            .end((err, res) => {
                res.body.should.be.a('object');
                done();
            });
    });
    it('body success', (done) => {
        chai.request(app)
            .post('/api/channelUsers')
            .end((err, res) => {
                res.body.should.have.property('success');
                done();
            });
    });
    it('body channelUsers', (done) => {
        chai.request(app)
            .post('/api/channelUsers')
            .end((err, res) => {
                res.body.should.have.property('channelUsers');
                done();
            });
    });
    it('channelUsers array', (done) => {
        chai.request(app)
            .post('/api/channelUsers')
            .end((err, res) => {
                res.body.channelUsers.should.be.a('array');
                done();
            });
    });

});

describe("*get all groups", () => {

    it('body object', (done) => {
        chai.request(app)
            .post('/api/groups')
            .end((err, res) => {
                res.body.should.be.a('object');
                done();
            });
    });

});

/* describe("*get all groups that provided user belongs to", () => {


    it('', (done) => {
        chai.request(app)
            .post('/api/groupsForUser')
            .end((err, res) => {

                done();
            });
    });

}); */

describe("*get all channels", () => {

    it('body object', (done) => {
        chai.request(app)
            .post('/api/channels')
            .end((err, res) => {
                res.body.should.be.a('object');
                done();
            });
    });

});

/* describe("*get all channels the user belongs to for the specified group", () => {

    it('body object', (done) => {
        chai.request(app)
            .post('/api/channelsForUser')
            .end((err, res) => {
                res.body.should.be.a('object');
                done();
            });
    });

}); */

describe("*create new user", () => {

    it('status', (done) => {
        chai.request(app)
            .post('/api/createUser')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    it('body object', (done) => {
        chai.request(app)
            .post('/api/createUser')
            .end((err, res) => {
                res.body.should.be.a('object');
                done();
            });
    });
    it('body success', (done) => {
        chai.request(app)
            .post('/api/createUser')
            .end((err, res) => {
                res.body.should.have.property('success');
                done();
            });
    });
    it('body newUser', (done) => {
        chai.request(app)
            .post('/api/createUser')
            .end((err, res) => {
                res.body.should.have.property('newUser');
                done();
            });
    });
    it('newUser object', (done) => {
        chai.request(app)
            .post('/api/createUser')
            .end((err, res) => {
                res.body.newUser.should.be.a('object');
                done();
            });
    });
    it('newUser _id', (done) => {
        chai.request(app)
            .post('/api/createUser')
            .end((err, res) => {
                res.body.newUser.should.have.property('_id');
                done();
            });
    });
    it('newUser _id string', (done) => {
        chai.request(app)
            .post('/api/createUser')
            .end((err, res) => {
                res.body.newUser._id.should.be.a('string');
                done();
            });
    });

});

describe("*create new group", () => {

    it('status', (done) => {
        chai.request(app)
            .post('/api/createGroup')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    it('body object', (done) => {
        chai.request(app)
            .post('/api/createGroup')
            .end((err, res) => {
                res.body.should.be.a('object');
                done();
            });
    });
    it('body success', (done) => {
        chai.request(app)
            .post('/api/createGroup')
            .end((err, res) => {
                res.body.should.have.property('success');
                done();
            });
    });
    it('body newGroup', (done) => {
        chai.request(app)
            .post('/api/createGroup')
            .end((err, res) => {
                res.body.should.have.property('newGroup');
                done();
            });
    });
    it('newGroup object', (done) => {
        chai.request(app)
            .post('/api/createGroup')
            .end((err, res) => {
                res.body.newGroup.should.be.a('object');
                done();
            });
    });
    it('newGroup users', (done) => {
        chai.request(app)
            .post('/api/createGroup')
            .end((err, res) => {
                res.body.newGroup.should.have.property('users');
                done();
            });
    });
    it('newGroup users array', (done) => {
        chai.request(app)
            .post('/api/createGroup')
            .end((err, res) => {
                res.body.newGroup.users.should.be.a('array');
                done();
            });
    });
    it('newGroup _id', (done) => {
        chai.request(app)
            .post('/api/createGroup')
            .end((err, res) => {
                res.body.newGroup.should.have.property('_id');
                done();
            });
    });
    it('newGroup _id string', (done) => {
        chai.request(app)
            .post('/api/createGroup')
            .end((err, res) => {
                res.body.newGroup._id.should.be.a('string');
                done();
            });
    });

});

describe("*create new channel", () => {

    it('status', (done) => {
        chai.request(app)
            .post('/api/createChannel')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    it('body object', (done) => {
        chai.request(app)
            .post('/api/createChannel')
            .end((err, res) => {
                res.body.should.be.a('object');
                done();
            });
    });
    it('body success', (done) => {
        chai.request(app)
            .post('/api/createChannel')
            .end((err, res) => {
                res.body.should.have.property('success');
                done();
            });
    });
    it('body newChannel', (done) => {
        chai.request(app)
            .post('/api/createChannel')
            .end((err, res) => {
                res.body.should.have.property('newChannel');
                done();
            });
    });
    it('newChannel object', (done) => {
        chai.request(app)
            .post('/api/createChannel')
            .end((err, res) => {
                res.body.newChannel.should.be.a('object');
                done();
            });
    });
    it('newChannel users', (done) => {
        chai.request(app)
            .post('/api/createChannel')
            .end((err, res) => {
                res.body.newChannel.should.have.property('users');
                done();
            });
    });
    it('newChannel users array', (done) => {
        chai.request(app)
            .post('/api/createChannel')
            .end((err, res) => {
                res.body.newChannel.users.should.be.a('array');
                done();
            });
    });
    it('newChannel messages', (done) => {
        chai.request(app)
            .post('/api/createChannel')
            .end((err, res) => {
                res.body.newChannel.should.have.property('messages');
                done();
            });
    });
    it('newChannel messages array', (done) => {
        chai.request(app)
            .post('/api/createChannel')
            .end((err, res) => {
                res.body.newChannel.messages.should.be.a('array');
                done();
            });
    });
    it('newChannel _id', (done) => {
        chai.request(app)
            .post('/api/createChannel')
            .end((err, res) => {
                res.body.newChannel.should.have.property('_id');
                done();
            });
    });
    it('newChannel _id string', (done) => {
        chai.request(app)
            .post('/api/createChannel')
            .end((err, res) => {
                res.body.newChannel._id.should.be.a('string');
                done();
            });
    });

});

describe("*delete user", () => {

    it('status', (done) => {
        chai.request(app)
            .post('/api/deleteUser')
            .end((err, res) => {
                res.should.have.status(200)
                done();
            });
    });
    it('body object', (done) => {
        chai.request(app)
            .post('/api/deleteUser')
            .end((err, res) => {
                res.body.should.be.a('object')
                done();
            });
    });
    it('body success', (done) => {
        chai.request(app)
            .post('/api/deleteUser')
            .end((err, res) => {
                res.body.should.have.property('success')
                done();
            });
    });

});

describe("*delete group", () => {

    it('status', (done) => {
        chai.request(app)
            .post('/api/deleteGroup')
            .end((err, res) => {
                res.should.have.status(200)
                done();
            });
    });
     it('body object', (done) => {
        chai.request(app)
            .post('/api/deleteGroup')
            .end((err, res) => {
                res.body.should.be.a('object')
                done();
            });
    });
    it('body success', (done) => {
        chai.request(app)
            .post('/api/deleteGroup')
            .end((err, res) => {
                res.body.should.have.property('success')
                done();
            });
    });

});


describe("*delete channel", () => {

    it('status', (done) => {
        chai.request(app)
            .post('/api/deleteChannel')
            .end((err, res) => {
                res.should.have.status(200)
                done();
            });
    });
      it('body object', (done) => {
        chai.request(app)
            .post('/api/deleteChannel')
            .end((err, res) => {
                res.body.should.be.a('object')
                done();
            });
    });
    it('body success', (done) => {
        chai.request(app)
            .post('/api/deleteChannel')
            .end((err, res) => {
                res.body.should.have.property('success')
                done();
            });
    });
    
});

/* describe("*add user to group", () => {

    it('body object', (done) => {
        chai.request(app)
            .post('/api/addGroupUser')
            .end((err, res) => {
                res.body.should.be.a('object')
                done();
            });
    });
    
}); */

/* describe("*remove user from group", () => {

    it('body object', (done) => {
        chai.request(app)
            .post('/api/removeGroupUser')
            .end((err, res) => {
                res.body.should.be.a('object')
                done();
            });
    });
    
}); */

/* describe("*add user to channel", () => {

    it('body object', (done) => {
        chai.request(app)
            .post('/api/addChannelUser')
            .end((err, res) => {
                res.body.should.be.a('object')
                done();
            });
    });
    
}); */

/* describe("*remove user from channel", () => {

    it('body object', (done) => {
        chai.request(app)
            .post('/api/removeChannelUser')
            .end((err, res) => {
                res.body.should.be.a('object')
                done();
            });
    });
    
}); */

describe("*edit role", () => {

    it('status', (done) => {
        chai.request(app)
            .post('/api/changeRole')
            .end((err, res) => {
                res.should.have.status(200)
                done();
            });
    });
    it('body object', (done) => {
        chai.request(app)
            .post('/api/changeRole')
            .end((err, res) => {
                res.body.should.be.a('object')
                done();
            });
    });
    it('body success', (done) => {
        chai.request(app)
            .post('/api/changeRole')
            .end((err, res) => {
                res.body.should.have.property('success')
                done();
            });
    });
    
});

/* describe("*get messages", () => {

     it('body object', (done) => {
        chai.request(app)
            .post('/api/messages')
            .end((err, res) => {
                res.body.should.be.a('object')
                done();
            });
    });

}); */

/* describe("*send messages", () => {

     it('body object', (done) => {
        chai.request(app)
            .post('/api/sendMessage')
            .end((err, res) => {
                res.body.should.be.a('object')
                done();
            });
    });

}); */