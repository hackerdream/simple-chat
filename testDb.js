require('shelljs/global');
rm('./chat.db');

var db = require('./database');

function assertTrue(chk) {
  if (!chk) {
    throw  new Error();
  }
}

function assertFalse(chk) {
  if (chk) {
    throw  new Error();
  }
}

function chain(callbacks) {
  var i = 0;

  function next() {
    if (i < callbacks.length) {
      callbacks[i++](next);
    }
  }

  next();
}

function createDatabase(next) {
  db.createChatDatabase();
  next();
}

function testUserInsert(next) {
  db.insertUser('admin', 'password', 'administrator', '/xxxxx/xxx', function (success) {
    assertTrue(success);
    db.insertUser('admin', 'password', 'administrator', '/xxxxx/xxx', function (success) {
      assertFalse(success);
      next();
    });
  });
}

function testInsertFriends(next) {

  db.insertFriend(1, 4, function (success, row) {
    assertTrue(success);
    assertTrue(row != undefined);
    db.insertFriend(1, 4, function (success, row) {
      assertFalse(success);
      assertTrue(row == undefined);

      next();
    });
  });
}

function testInsertMessage(next) {
  db.insertMessage(1, 2, 'hello', function (row) {
    assertTrue(row instanceof Object);
    db.insertMessage(1, 3, 'how are you', function (row) {
      assertTrue(row instanceof Object);

      next();
    })
  })
}

function testGetMessage(next) {
  db.getMessageOfSession(1, 2, function (row) {
    assertTrue(row instanceof Array);

    next();
  })
}

function testGetFriends(next) {
  db.getFriends(1, function (rows) {
    assertTrue(rows instanceof Array);
    [].forEach.call(rows, function (friend) {
      assertTrue(friend.password == undefined);
    });

    next();
  })
}

function testGetUserByLogin(next) {
  db.getUserByLogin('admin', 'password', function (row) {
    assertTrue(row instanceof Object);
    assertTrue(row.password == undefined);

    next();
  })
}

function testGetUser(next) {
  db.getUser(1, function (row) {
    assertTrue(row instanceof Object);
    assertFalse(row.password != undefined);

    next();
  })
}

function testSearchUser(next) {
  db.searchUser('hello', function (rows) {
    assertTrue(rows instanceof Array);
    [].forEach.call(rows, function (user) {
      assertTrue(user.password == undefined);
    });

    next();
  })
}

chain([createDatabase, testUserInsert, testInsertFriends, testInsertMessage,
  testGetMessage, testGetFriends, testGetUserByLogin, testGetUser, testSearchUser]);