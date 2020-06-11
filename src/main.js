import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import "material-design-icons/iconfont/material-icons.css";
import '@mdi/font/css/materialdesignicons.css'
import "vue-notifyjs/themes/default.css";
import "devicon/devicon.css"

Vue.config.productionTip = false

export default new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
