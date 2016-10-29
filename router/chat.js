var express = require('express');
var chat = express.Router();
var db = require('../database');

var io = require('../app').io;

var userSockets = {};

io.on('connection', function (socket) {

  socket.on('bind', function (data) {
    var userId = data.uid;
    userSockets[userId] = socket;
  });

  socket.on('broadcast-data', function (data) {
    db.getUser(data.user_id, function (user) {
      db.insertMessage(data.user_id, data.friend_id, data.content, function (message) {
        userSockets[data.friend_id].emit('get-data', data)
      });
    });
  });
});


chat.use(function (req, res, next) {
  if (req.session.username && req.session.userid) {
    next();
  }
  else {
    res.status(401).send({
      message: "please login"
    });
  }
});

chat.get('/getUser', function (req, res) {
  db.getUser(req.session.userid, function (user) {
    res.send(user);
  });
});

chat.get('/message/:id', function (req, res) {
  db.getMessageOfSession(req.session.userid, req.params.id, function (message) {
    res.send(message);
  });
});

chat.get('/friend', function (req, res) {
  db.getFriends(req.session.userid, function (friends) {
    res.send(friends);
  });
});

chat.get('/searchUser', function (req, res) {
  db.searchUser(req.query.name, function (user) {
    res.send(user);
  });
});

chat.post('/friend', function (req, res) {
  db.searchUserByUsername(req.body.username, function (user) {
    db.addFriend(req.session.userid, user.id, function (success, friend) {
      if (success) {
        res.send(friend);
      } else {
        res.status(409).send({
          message: "you have this friend already."
        });
      }
    });
  });
});

module.exports = chat;