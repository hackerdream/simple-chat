<template>
    <div class="message">
        <ul>
            <li v-for="item in messages">
                <p class="time">
                    <span>{{item.time}}</span>
                </p>
                <div class="message-main" :class="{ self: item.username === user }">
                    <img class="avatar" width="30" height="30">
                    <p class="text">{{{item.message}}}</p>
                </div>
            </li>
        </ul>
    </div>
    <div id="friend-message">
        <div class="apply">
            <p class="apply-tittle">是否加{{currentName}}为好友</p>
            <div class="check-button">
                <button @click="returnFriends()">x</button>
                <button @click="addFriend(currentUser)">√</button>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .message {
        flex: 0 0 70%;;
        border-bottom: 1px solid #CCCCCC;
        padding: 10px 15px;
        overflow-y: scroll;
        position: relative;
    }

    ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    .message .time {
        margin: 7px 0;
        text-align: center;
    }

    .message .time > span {
        display: inline-block;
        padding: 5px 18px;
        font-size: 12px;
        color: #fff;
        border-radius: 2px;
        background-color: #dcdcdc;
    }

    .avatar {
        float: left;
        margin: 0 10px 0 0;
        border-radius: 3px;
    }

    .text {
        display: inline-block;
        position: relative;
        padding: 0 10px;
        max-width: calc(100% - 60px);
        min-height: 30px;
        line-height: 2.5;
        font-size: 12px;
        text-align: left;
        word-break: break-all;
        background-color: #fafafa;
        border-radius: 4px;
    }

    .text:before {
        content: " ";
        position: absolute;
        top: 9px;
        right: 100%;
        border: 6px solid transparent;
        border-right-color: #fafafa;
    }

    .self {
        text-align: right;
    }

    .self .avatar {
        float: right;
        margin: 0 0 0 10px;
    }

    .self .text {
        background-color: #b2e281;
    }

    .self .text:before {
        right: inherit;
        left: 100%;
        border-right-color: transparent;
        border-left-color: #b2e281;
    }

    #friend-message {
        background-color: #2e3238;
        padding: 30px 120px;
        position: absolute;
        top: 100px;
        right: 320px;
        height: 150px;
        width: 300px;
        display: none;
        color: #CCCCCC;
    }

    #friend-message button {
        width: 40px;
        height: 40px;
        padding: 5px 5px;
        margin: 0 12px;
        border-radius: 5px;
        text-align: center;
        text-decoration: none;
        cursor: pointer;
        border: none;
    }

    #friend-message .apply {
        display: block;
        width: 180px;
        height: 100px;
        margin: 40px auto;
        overflow: hidden;
    }

    .check-button {
        width: 150px;
        height: 45px;
        margin: 0 auto;
    }
</style>
<script>

    export default{
        ready(){
            var getFriends = function (id) {
                this.$http.get('/message/' + id).then(function (resp) {
                    this.messages.splice(0, this.messages.length);
                    [].forEach.call(resp.data, function (item) {
                        var blackIndex = item.time.lastIndexOf(' ');
                        item.time = item.time.substring(blackIndex);
                        this.messages.push(item);
                    }.bind(this))
                });
            }.bind(this);

            setInterval(function () {
                getFriends(this.friendId);
            }.bind(this), 100000);
        },
        data(){
            return {
                messages: [],
                user: null,
                currentUser: null,
                currentName: null,
                friendId: null
            }
        },
        events: {
            'broadcast-friend-id': function (friend_id) {
                this.friendId = friend_id;
                this.$http.get('/message/' + friend_id).then(function (resp) {
                    this.messages.splice(0, this.messages.length);
                    [].forEach.call(resp.data, function (item) {
                        var blackIndex = item.time.lastIndexOf(' ');
                        item.time = item.time.substring(blackIndex);
                        this.messages.push(item);
                    }.bind(this))
                });
            },
            'get-message': function (message) {
                this.messages.push(message);
            },
            'check-user': function (username) {
                this.user = username;
                return this.user;
            },
            'friend': function (friend) {
                this.currentUser = friend.username;
                this.currentName = friend.name;
                document.getElementById('friend-message').style.display = 'block';
            }
        },
        methods: {
            returnFriends(){
                this.$dispatch('return-friends-list', null);
                document.getElementById('friend-message').style.display = 'none';
            },
            addFriend(currentUser){
                this.$http.post('/friend',
                        JSON.stringify({
                            username: currentUser
                        })
                ).then(function (resp) {
                    this.$dispatch('return-friends-list', resp.data);
                    document.getElementById('friend-message').style.display = 'none';
                }, function (err) {
                    console.log(err);
                })
            }
        }
    }
</script>