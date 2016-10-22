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

function insertUser(username, password, name, portrait, callback) {
  confirmUserExists(username, function (result) {
    if (result == undefined) {
      db.run("INSERT INTO users VALUES (?,?,?,?,?)", [null, username, password, name, portrait], function (err, row) {
        callback(true);
      });
    } else {
      callback(false);
    }
  });
}

function getUserByLogin(username, password, callback) {
  db.get(" select username,id,portrait from users where username = ? AND password = ?", [username, password], function (err, row) {
    callback(row);
  });
}

function getUser(id, callback) {
  db.get("select id,username,name,portrait from users where id = ?", [id], function (err, row) {
    callback(row);
  })
}

function addFriend(from_userid, to_userid, callback) {
  confirmFriendExists(from_userid, to_userid, function (result) {
    if (result == undefined) {
      db.run("INSERT INTO user_friends VALUES(?,?,?)", [null, to_userid, from_userid], function (err, row) {
        db.run("INSERT INTO user_friends VALUES(?,?,?)", [null, from_userid, to_userid], function (err, row) {
          db.get("SELECT name,username,id,portrait FROM users WHERE id in (SELECT to_userid FROM user_friends WHERE  rowid = ?);", this.lastID, function (err, row) {
            callback(true, row);
          });
        });
      })
    } else {
      callback(false);
    }
  });
}

function searchUser(name, callback) {
  db.all("SELECT username,name,id,portrait FROM users WHERE name = ?", [name], function (err, row) {
    callback(row);
  })
}

function searchUserByUsername(username, callback) {
  db.get("SELECT username,name,id,portrait FROM users WHERE username = ?", [username], function (err, row) {
    callback(row);
  })
}

function getFriends(from_userid, callback) {
  db.all("SELECT username,name,portrait,id FROM users WHERE id IN (SELECT to_userid FROM user_friends WHERE from_userid = ?)", [from_userid],
    function (err, row) {
      callback(row);
    });
}

function insertMessage(from_userid, to_userid, message, callback) {
  db.run("INSERT INTO user_message VALUES(?,?,?,?,DATETIME('now','+8 hour'))", [null, from_userid, to_userid, message], function (err, row) {
    db.get("SELECT user_message.*,users.username,users.portrait ,users.name FROM user_message,users WHERE user_message.rowid = ? AND users.id = ?", [this.lastID, from_userid], function (err, row) {
      callback(row);
    })
  });
}

function getMessageOfSession(from_userid, to_userid, callback) {
  db.all("SELECT user_message.*,users.username,users.portrait ,users.name FROM user_message,users where user_message.from_userid = ? AND user_message.to_userid = ? AND users.id = ? " +
    "or user_message.from_userid = ? AND user_message.to_userid = ? AND users.id = ? ORDER BY user_message.time ASC;",
    [from_userid, to_userid, from_userid, to_userid, from_userid, to_userid], function (err, row) {
      callback(row);
    });
}

function confirmUserExists(username, callback) {
  db.get("SELECT username FROM users WHERE username = ?", [username], function (err, row) {
    callback(row);
  })
}

function confirmFriendExists(from_userid, to_userid, callback) {
  db.get("SELECT * FROM user_friends WHERE from_userid = ? AND to_userid = ?", [from_userid, to_userid], function (err, row) {
    callback(row);
  })
}

exports.createChatDatabase = createChatDatabase;
exports.insertUser = insertUser;
exports.addFriend = addFriend;
exports.getFriends = getFriends;
exports.getUserByLogin = getUserByLogin;
exports.getUser = getUser;
exports.insertMessage = insertMessage;
exports.getMessageOfSession = getMessageOfSession;
exports.searchUser = searchUser;
exports.searchUserByUsername = searchUserByUsername;