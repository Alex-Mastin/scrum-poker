import Vue from 'vue'
import VueRouter from 'vue-router'
import DatabaseMixin from '../mixins/DatabaseMixin.js'
import store from '../store/index'

Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      name: 'Home',
      meta: {
        title: 'Home'
      },
      component: () => import('../pages/home/home.vue')
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('../pages/host/dashboard.vue'),
      meta: {
        title: 'Dashboard'
      },
      beforeEnter(to, from, next) {
        // Don't allow access to dashboard without being logged in
        store.getters.getUser ? next() : next('/')
      }
    },
    {
      path: '/session/:id',
      name: 'Planning Session',
      component: () => import('../pages/session/planning-session.vue'),
      meta: {
        title: 'Planning Session'
      },
      beforeEnter(to, from, next) {
        // Don't allow routing to a session which doesn't exist
        DatabaseMixin.methods.getFromCollection('sessions', to.params.id)
            .then((docSnapshot) => {
              if (docSnapshot.exists) next()
              else next('/')
            })
      },
    },
    {
      path: '*',
      beforeEnter(to, from, next) {
        // Don't allow routing to routes which don't exist
        next('/')
      }
    }
]

const router = new VueRouter({
  routes
})

export default router
