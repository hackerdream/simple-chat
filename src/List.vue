<template>
    <div style="flex: 1;" class="list">
        <ul>
            <li v-for="friend in friends" :class="{ active: friend.id === currentId }" @click="setSign(friend.id)">
                <img class="avatar" width="30" height="30" :alt="friend.name">
                <p class="name">{{friend.name}}</p>
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
                store.addFriendToFriends(resp.data);
            })
        },
        data(){
            return {
                friends: store.getFriends(),
                currentId: null
            }
        },
        methods: {
            setSign(id){
                this.currentId = id;
                for (var i = 0; i < this.friends.length; i++) {
                    this.friends[i].selection = false;
                }
                for (i = 0; i < this.friends.length; i++) {
                    if (this.friends[i].id === id) {

                        this.$dispatch('get-friend-id', this.friends[i].id);
                        break;
                    }
                }
            }
        }
    }

</script>