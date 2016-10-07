var express = require('express');
var chat = express.Router();
var db = require('../database');

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

chat.post('/message/:id', function (req, res) {
  db.insertMessage(req.session.userid, req.params.id, req.body.message, function (message) {
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
  db.addFriend(req.session.userid, req.body.to_userid, function (success, frined) {
    if (success) {
      res.send(frined);
    } else {
      res.status(409).send({
        message: "you have this friend already."
      });
    }
  });
});

module.exports = chat;