import Vue from 'vue'
import VueResource from 'vue-resource'
import Chat from './Chat.vue'
import UiButton from 'keen-ui/lib/UiButton'
import UiTextbox from 'keen-ui/lib/UiTextbox'

Vue.use(VueResource);

Vue.config.debug = true;

Vue.http.options.emulateJSON = true;

new Vue({
  el: 'body',
  components: {
    UiButton, UiTextbox, Chat
  }
});
