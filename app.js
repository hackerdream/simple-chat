var express = require('express');
var ejs = require('ejs');
var path = require('path');
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);

exports.io = io;

var login = require('./router/login');
var chat = require('./router/chat');

app.engine('html', ejs.__express);

app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/dist', express.static(path.join(__dirname, 'dist')));


app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}));

app.use(bodyParser.json({})); // for parsing application/json

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(login);
app.use(chat);

server.listen(8000, function () {
  console.log("http://localhost:8000");
});