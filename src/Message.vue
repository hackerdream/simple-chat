<template>
    <div class="message">
        <ul>
            <li v-for="item in messages">
                <p class="time">
                    <span>{{item.time}}</span>
                </p>
                <div class="message-main" :class="{ self: item.username === user }">
                    <img class="avatar" width="30" height="30">
                    <div class="text">{{item.message}}</div>
                </div>
            </li>
        </ul>
    </div>
</template>
<style scoped>
    .message {
        flex: 0 0 70%;;
        border-bottom: 1px solid #CCCCCC;
        padding: 10px 15px;
        overflow-y: scroll;
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
</style>
<script>
    export default{
        data(){
            return {
                messages: [],
                user: null
            }
        },
        events: {
            'broadcast-friend-id': function (friend_id) {
                if (this.messages[0] != null)
                    this.messages.splice(0, this.messages.length);
                var that = this;
                this.$http.get('/message/' + friend_id).then(function (resp) {
                    if (resp.data[0] == null) {
                        that.messages.splice(0, that.messages.length);
                    } else {
                        [].forEach.call(resp.data, function (item) {
                            var blackIndex = item.time.lastIndexOf(' ');
                            item.time = item.time.substring(blackIndex);
                            that.messages.push(item);
                        })
                    }
                });
            },
            'get-message': function (message) {
                this.messages.push(message);
            },
            'checkUser': function (username) {
                this.user = username;
                return this.user;
            }
        }
    }
</script>