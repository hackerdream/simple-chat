<template>
    <div style="flex: 0 0 30%;">
        <textarea placeholder="按 Ctrl + Enter 发送" @keyup="onKeyup" v-model="content">

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
    import store from './store'

    export default{
        data () {
            return {
                id: null,
                content: ''
            };
        },
        events: {
            'broadcast-friend-id': function (friend_id) {
                this.id = friend_id;
                return this.id
            }
        }
        ,
        methods: {
            onKeyup (e) {
                if (e.ctrlKey && e.keyCode === 13 && this.content.length) {
                    this.$http.post('/message/' + this.id, JSON.stringify({message: this.content})).then(function (resp) {
                        this.$dispatch('add-message', resp.data);
                        this.content = '';
                    }, function (err) {
                        console.log(err);
                    });

                }
            }
        }
    }
</script>