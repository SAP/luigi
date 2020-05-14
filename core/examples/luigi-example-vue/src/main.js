import Vue from 'vue';
import App from './app.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

import LuigiClient from '@luigi-project/client';

Vue.mixin({
  created() {
    this.luigiClient = LuigiClient;
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
