import Vue from 'vue'
import Router from 'vue-router'
import Projects from './views/projects/projects.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/projects',
      component: {
        render (c) { return c('router-view') }
      },
      children: [
        {
          path: '',
          name: 'projectOverview',
          component: Projects,
        },
        {
          path: ':projectId',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: '',
              props: true,
              name: 'projectDetail',
              component: Projects,
            },
            {
              path: 'miscellaneous',
              name: 'Miscellaneous',
              // route level code-splitting
              // this generates a separate chunk (about.[hash].js) for this route
              // which is lazy-loaded when the route is visited.
              component: () => import(/* webpackChunkName: "project-details" */ './views/projects/miscellaneous.vue'),
            },
            {
              path: 'miscellaneous2',
              name: 'Miscellaneous2',
              component: () => import(/* webpackChunkName: "project-details" */ './views/projects/miscellaneous2.vue'),
            },
            {
              path: 'developers',
              name: 'Developers',
              component: () => import(/* webpackChunkName: "project-details" */ './views/projects/developers.vue'),
            },
            {
              path: 'settings',
              name: 'Settings',
              props: true,
              component: () => import(/* webpackChunkName: "project-details" */ './views/projects/settings.vue'),
            },
            {
              path: 'users',
              component: {
                render (c) { return c('router-view') }
              },
              children: [
                {
                  path: '',
                  name: 'Users',
                  component: () => import(/* webpackChunkName: "project-details" */ './views/projects/users/users.vue'),
                },
                {
                  path: 'usersoverview',
                  name: 'Users Overview',
                  component: () => import(/* webpackChunkName: "project-details" */ './views/projects/users/users-overview.vue'),
                },
                {
                  path: 'groups',
                  component: {
                    render (c) { return c('router-view') }
                  },
                  children: [
                    {
                      path: '',
                      name: 'Groups',
                      component: () => import(/* webpackChunkName: "project-details" */ './views/projects/users/groups/groups.vue'),
                    },
                    {
                      path: 'stakeholders',
                      name: 'Stakeholders',
                      component: () => import(/* webpackChunkName: "project-details" */ './views/projects/users/groups/stakeholders.vue'),
                    },
                    {
                      path: 'customers',
                      name: 'Customers',
                      component: () => import(/* webpackChunkName: "project-details" */ './views/projects/users/groups/customers.vue'),
                    },
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
})
