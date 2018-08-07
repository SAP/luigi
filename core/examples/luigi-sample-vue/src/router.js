import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/about.vue')
    },
    {
      path: '/projects',
      component: {
        render (c) { return c('router-view') }
      },
      children: [
        {
          path: '',
          name: 'projectOverview',
          component: () => import(/* webpackChunkName: "about" */ './views/projects/project-overview.vue'),
        },
        {
          path: ':id',
          name: 'projectDetail',
          component: () => import(/* webpackChunkName: "project-details" */ './views/projects/project-details.vue'),
        }
      ]
    }
  ]
})
