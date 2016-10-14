<template>
    <div style="flex:0 0 20%;">
        <p></p>
    </div>
</template>
<style>
</style>
<script>
    export default{
        ready(){
            this.$http.get('/message').then(function (resp) {

            })
        }
    }
</script>