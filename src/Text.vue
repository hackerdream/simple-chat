<template>
    <div style="flex: 0 0 30%;">
        <textarea placeholder="按 Ctrl + Enter 发送" @keyup="onKeyup" v-model="content" autofocus autocomplete="off"
                  autocorrect="off">

        </textarea>
    </div>
</template>
<style scoped>
    textarea {
        padding: 10px;
        height: 100%;
        width: 100%;
        border: none;
        outline: none;
        resize: none;
    }
</style>
<script>
    export default{
        data () {
            return {
                id: null,
                content: '',
                user_id: null,
                username: ''
            };
        },
        events: {
            'broadcast-friend-id': function (friend_id) {
                this.id = friend_id;
                return this.id
            },
            'broadcast-user-id': function (id) {
                this.user_id = id;
                return this.user_id;
            },
            'check-user': function (username) {
                this.username = username;
                return this.username;
            }
        }
        ,
        methods: {
            onKeyup (e) {
                if (e.ctrlKey && e.keyCode === 13 && this.content.length) {
                    var data = new Date();
                    var time = null;
                    if (data.getSeconds() >= 10 && data.getMinutes() >= 10) {
                        time = data.getHours() + ":" + data.getMinutes() + ":" + data.getSeconds();
                    }
                    else if (data.getSeconds() < 10 && data.getMinutes() >= 10) {
                        time = data.getHours() + ":" + data.getMinutes() + ":0" + data.getSeconds();
                    }
                    else if (data.getMinutes() < 10 && data.getSeconds() >= 10) {
                        time = data.getHours() + ":0" + data.getMinutes() + ":" + data.getSeconds();
                    }
                    else {
                        time = data.getHours() + ":0" + data.getMinutes() + ":0" + data.getSeconds();
                    }
                    this.content = this.content.replace(/\n|\r\n/g, "<br/>");
                    this.$dispatch('broadcast-data', {
                        content: this.content,
                        user_id: this.user_id,
                        friend_id: this.id,
                        time: time,
                        username: this.username
                    });
                    this.content = '';
                }
            }
        }
    }
</script>