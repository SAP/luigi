import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Sample1 from '../views/Sample1.vue';
import Sample2 from '../views/Sample2.vue';

// const routes = [
//   {
//     path: '/',
//     name: 'home',
//     component: HomeView
//   },
//   {
//     path: '/about',
//     name: 'about',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: function () {
//       return import(/* webpackChunkName: "about" *../views/Sample1.vuevue')
//     }
//   }
// ]

const routes = [
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
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
