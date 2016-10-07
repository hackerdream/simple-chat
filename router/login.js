var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');

var login = express();
var db = require('../database');

login.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}));

login.use(bodyParser.json({})); // for parsing application/json

login.use(bodyParser.urlencoded({
  extended: true
}));

login.post('/login', function (req, res) {
  db.getUserByLogin(req.body.username, req.body.password, function (row) {
    if (row) {
      req.session.username = row.username;
      req.session.userid = row.id;
      res.redirect('/chat');
    }
    else {
      res.status(401).send('please input right username or password!\n');
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
    res.status(401).send('please login!\n');
  }
});

module.exports = login;