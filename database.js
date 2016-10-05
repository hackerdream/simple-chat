var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('chat.db');

function createChatDatabase() {
  db.run("create table users(" +
    "id INTEGER PRIMARY KEY," +
    "username VARCHAR(255) NOT NULL," +
    "password VARCHAR(255) NOT NULL," +
    "name VARCHAR(10) NOT NULL," +
    "portrait VARCHAR(255) NOT NULL" +
    ")"
  );
  db.run("CREATE TABLE user_friends(" +
    "id INTEGER PRIMARY KEY," +
    "from_userid INTEGER," +
    "to_userid INTEGER" +
    ")"
  );
  db.run("CREATE TABLE user_message(" +
    "id INTEGER PRIMARY KEY," +
    "from_userid INTEGER," +
    "to_userid INTEGER," +
    "message VARCHAR(255) NOT NULL," +
    "time DATETIME NOT NULL" +
    ")"
  )
}

exports.createChatDatabase = createChatDatabase;