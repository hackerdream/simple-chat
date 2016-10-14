var user = [];
var friends = [];

export default {
  getUser(){
    return user;
  },
  addUser(item){
    user.push(item);
    return user;
  },
  getFriends(){
    return friends;
  },
  addFriendToFriends(items){
    [].forEach.call(items, function (item) {
      friends.push(item);
    });
    return friends;
  }
}