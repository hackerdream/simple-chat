var express = require('express');
var ejs = require('ejs');
var path = require('path');
var app = express();
var login = require('./router/login');
var chat = require('./router/chat');

app.engine('html', ejs.__express);

app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(login);
app.use(chat);

app.listen(8080, function () {
  console.log("http://localhost:8080");
});