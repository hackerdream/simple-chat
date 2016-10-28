<template>

    <div id="app">

        <div class="sidebar">
            <user></user>
            <list></list>
        </div>

        <div class="main">
            <message></message>
            <text></text>
        </div>
    </div>
</template>
<style scoped>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    #app {
        display: flex;
        flex-direction: row;
        margin: 40px auto;
        width: 900px;
        height: 600px;
        overflow: hidden;
        border-radius: 3px;
    }

    #app .sidebar {
        display: flex;
        flex: 0 0 25%;
        flex-direction: column;
        border-right: 1px solid #CCCCCC;
        color: #f4f4f4;
        background-color: #2e3238;
    }

    #app .main {
        display: flex;
        flex: 1;
        flex-direction: column;
        overflow: hidden;
        background-color: #eee;
    }

</style>
<script>
    import User from './User.vue'
    import List from './List.vue'
    import Message from './Message.vue'
    import Text from './Text.vue'
    import store from './store'

    var socket = io('http://localhost:8000');

    export default{
        ready(){
            var that = this;
            this.$http.get('/getUser').then(function (resp) {
                that.$broadcast('check-user', resp.data.username);
                that.$broadcast('broadcast-user-id', resp.data.id);
            });
            socket.on('get-data', function (data) {
                that.$broadcast('get-data', data);
            });
        },
        components: {
            User, List, Message, Text
        },
        events: {
            'get-friend-id': function (friend_id) {
                this.$broadcast('broadcast-friend-id', friend_id);
            },
            'add-message': function (message) {
                this.$broadcast('get-message', message);
            },
            'get-search': function (search) {
                this.$broadcast('add-search', search)
            },
            'add-friend': function (friend) {
                this.$broadcast('friend', friend);
            },
            'return-friends-list': function (data) {
                this.$broadcast('return-friends-list', data);
            },
            'clear-content': function () {
                this.$broadcast('clear-content');
            },
            'broadcast-data': function (data) {
                socket.emit('broadcast-data', data);
            }
        }
    }
</script>