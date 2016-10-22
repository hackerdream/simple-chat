<template>
    <div style="flex: 1;" class="list">
        <ul>
            <li v-for="friend in friends" :class="{ active: friend.id === currentId }"
                @click="setSign(friend)">
                <img class="avatar" width="30" height="30" :alt="friend.name">
                <p class="name">{{friend.id,friend.name}}</p>
            </li>
        </ul>
    </div>
</template>
<style scoped>
    ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    .list li {
        padding: 12px 15px;
        border-bottom: 1px solid #292c33;
        cursor: pointer;
        -webkit-transition: background-color .1s;
        transition: background-color .1s;
    }

    .list li:hover {
        background-color: hsla(0, 0%, 100%, .03);
    }

    .list li.active {
        background-color: hsla(0, 0%, 100%, .1);
    }

    .list .avatar {
        border-radius: 2px;
    }

    .list .name {
        display: inline-block;
        margin: 0 0 0 15px;
    }

    .list .avatar, .list .name {
        vertical-align: middle;
    }
</style>
<script>
    import store from './store'

    export default{
        ready(){
            this.$http.get('/friend').then(function (resp) {
                var that = this;
                [].forEach.call(resp.data, function (item) {
                    that.friends.push(item);
                    that.storeFriendsList.push(item);
                })
            })
        },
        data(){
            return {
                friends: [],
                storeFriendsList: [],
                currentId: null
            }
        },
        methods: {
            setSign(friend){
                var index = 0;
                for (var k = 0; k < this.storeFriendsList.length; k++) {
                    if (this.storeFriendsList[k].username == friend.username) {
                        index = 1;
                        break;
                    }
                }
                if (index == 1) {
                    this.currentId = friend.id;
                    for (var i = 0; i < this.friends.length; i++) {
                        this.friends[i].selection = false;
                    }
                    for (i = 0; i < this.friends.length; i++) {
                        if (this.friends[i].id === friend.id) {

                            this.$dispatch('get-friend-id', this.friends[i].id);
                            break;
                        }
                    }
                }
                else {
                    this.$dispatch('add-friend', friend)
                }
            }
        },
        events: {
            'add-search': function (search) {
                var that = this;
                that.friends.splice(0, that.friends.length);
                [].forEach.call(search, function (item) {
                    that.friends.push(item);
                });
            },
            'return-friends-list': function (data) {
                var that = this;
                if (data != null) {
                    that.storeFriendsList.push(data);
                    that.friends.splice(0, that.friends.length);
                    [].forEach.call(that.storeFriendsList, function (item) {
                        that.friends.push(item);
                    });
                    that.$dispatch('clear-content');
                }
                else {
                    that.friends.splice(0, that.friends.length);
                    [].forEach.call(that.storeFriendsList, function (item) {
                        that.friends.push(item);
                    });
                    that.$dispatch('clear-content');
                }
            }
        }
    }

</script>