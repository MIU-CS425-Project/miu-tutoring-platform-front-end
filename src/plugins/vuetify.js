import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import VModal from "vue-js-modal";
import Notify from "vue-notifyjs";

import VueCodemirror from 'vue-codemirror';
import { ValidationProvider } from 'vee-validate';
import 'codemirror/lib/codemirror.css';
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify);
Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(Notify, {
  horizontalAlign: "center",
  verticalAlign: "top"
});
Vue.use(VModal, { dynamic: true });
Vue.component('ValidationProvider', ValidationProvider);
Vue.use(require('vue-moment'));

Vue.use(VueCodemirror)

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
  theme: {
    themes: {
      light: {
        primary: '#385F73',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
      },
    },
  },
});
