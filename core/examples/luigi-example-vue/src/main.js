import * as Vue from 'vue'
import App from './app.vue';
import { router } from './router';
import store from './store';

const app = Vue.createApp({});

app.config.productionTip = false;

import LuigiClient from '@luigi-project/client';

app.mixin({
  created() {
    this.luigiClient = LuigiClient;
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
