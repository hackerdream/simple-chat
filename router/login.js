var express = require('express');

var login = express.Router();
var db = require('../database');


login.post('/login', function (req, res) {
  db.getUserByLogin(req.body.username, req.body.password, function (user) {
    if (user) {
      req.session.username = user.username;
      req.session.userid = user.id;
      res.redirect('/chat');
    }
    else {
      res.status(401).send({
        message: 'please input right username or password!'
      });
    }
  })
});

login.get('/login', function (req, res) {
  res.render('login.html')
});

login.get('/chat', function (req, res) {
  if (req.session.username) {
    res.render('chat.html')
  }
  else {
    res.status(401).send({
      message: 'please login!'
    });
  }
});

module.exports = login;