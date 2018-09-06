import Vue from 'vue';
import App from './app.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

import * as LuigiClient from '@kyma-project/luigi-client';

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
