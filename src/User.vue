<template>
    <div style="flex:0 0 15%;" class="user">
        <header>
            <img class="avatar" width="40" height="40" alt="user.name">
            <p class="name" v-for="user in users">{{user.name}}</p>
        </header>

        <footer>
            <input class="search" type="text" placeholder="search user..." v-model="content"
                   @keyup="onKeyup">
        </footer>
    </div>
</template>
<style>
    .user {
        padding: 20px 12px;
        border-bottom: 1px solid #24272c;
    }

    .user .avatar {
        border-radius: 2px;
    }

    .user .avatar, .user .name {
        vertical-align: middle;
    }

    .user footer {
        margin-top: 20px;
    }

    .user .name {
        display: inline-block;
        margin: 0 0 0 15px;
        font-size: 16px;
    }

    .user .search {
        padding: 0 10px;
        width: 80%;
        font-size: 12px;
        color: #fff;
        height: 30px;
        line-height: 30px;
        border: solid 1px #3a3a3a;
        border-radius: 4px;
        outline: none;
        background-color: #26292E;
    }
</style>
<script>
    import store from './store'

    export default{
        ready(){
            this.$http.get('/getUser').then(function (resp) {
                store.addUser(resp.data);
            })
        },
        data(){
            return {
                users: store.getUser(),
                content: ''
            }
        },
        methods: {
            onKeyup(e){
                if (e.ctrlKey && e.keyCode === 13 && this.content.length) {
                    console.log('run');
                    this.$http.get('/searchUser?name=' + this.content)
                            .then(function (resp) {
                                console.log(resp.data);
                            }, function (err) {
                                console.log(err);
                            })
                }
            }
        }
    }
</script>