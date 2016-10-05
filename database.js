var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('chat.db');

function createChatDatabase() {
  db.run("CREATE TABLE IF NOT EXISTS users(" +
    "id INTEGER PRIMARY KEY," +
    "username VARCHAR(255) NOT NULL," +
    "password VARCHAR(255) NOT NULL," +
    "name VARCHAR(10) NOT NULL," +
    "portrait VARCHAR(255) NOT NULL" +
    ")"
  );
  db.run("CREATE TABLE IF NOT EXISTS user_friends(" +
    "id INTEGER PRIMARY KEY," +
    "from_userid INTEGER," +
    "to_userid INTEGER" +
    ")"
  );
  db.run("CREATE TABLE IF NOT EXISTS user_message(" +
    "id INTEGER PRIMARY KEY," +
    "from_userid INTEGER," +
    "to_userid INTEGER," +
    "message VARCHAR(255) NOT NULL," +
    "time DATETIME NOT NULL" +
    ")"
  )
}

function insertUser(username, password, name, portrait) {
  confirmUserIsExists(username, function (result) {
    if (result == undefined) {
      db.run("INSERT INTO users VALUES (?,?,?,?,?)", [null, username, password, name, portrait]);
    }
    else {
      console.log('username is exists');
    }
  });
}

function insertFriend(from_userid, to_userid, callback) {
  confirmFriendIsExists(from_userid, to_userid, function (result) {
    if (result == undefined) {
      db.run("INSERT INTO user_friends VALUES(?,?,?)", [null, from_userid, to_userid], function (err, row) {
        db.run("INSERT INTO user_friends VALUES(?,?,?)", [null, to_userid, from_userid]);
        db.get("SELECT * FROM user_friends WHERE rowid = " + this.lastID, function (err, row) {
          callback(row);
        })
      })
    }
    else {
      console.log('you have this friend');
    }
  });
}

function confirmUserIsExists(username, callback) {
  db.get("select * from users where username = ?", [username], function (err, row) {
    callback(row);
  })
}

function confirmFriendIsExists(from_userid, to_userid, callback) {
  db.get("select * from user_friends where from_userid = ? AND to_userid = ?", [from_userid, to_userid], function (err, row) {
    callback(row);
  })
}

exports.insertUser = insertUser;
exports.createChatDatabase = createChatDatabase;
exports.insertFriend = insertFriend;