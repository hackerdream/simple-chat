var db = require('./database');


db.createChatDatabase();
db.insertUser('admin', 'password', 'administrator', '/xxxxx/xxx');

db.insertFriend(1, 4, function () {

});

db.getFriends(1, function (results) {
  console.log(results);
});


db.getUserByLogin('admin', 'password', function (result) {
  console.log(result);
});

db.getUser(4, function (result) {
  console.log(result);
});

db.insertMessage(1, 2, "hello", function (result) {
  console.log(result);
});

db.getMessageById(1, 2, function (results) {
  console.log(results);
});