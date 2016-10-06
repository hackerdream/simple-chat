var express = require('express');
var ejs = require('ejs');
var path = require('path');
var app = express();

app.engine('html', ejs.__express);

app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use('/public', express.static(path.join(__dirname, 'public')));

app.listen(8080, function () {
  console.log("http://localhost:8080");
});