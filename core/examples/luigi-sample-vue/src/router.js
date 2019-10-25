import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/home.vue';
import Sample1 from './views/sample1.vue';
import Sample2 from './views/sample2.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/sample1',
      name: 'sample1',
      component: Sample1
    },
    {
      path: '/sample2',
      name: 'sample2',
      component: Sample2
    }
  ]
});
