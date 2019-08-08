import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '../store/index'

Vue.use(VueRouter)

// creates our router
const router = new VueRouter({
  routes,
  linkActiveClass: 'active',
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) return savedPosition
    if (to.hash) return { selector: to.hash }
    return { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  // sets the page's title
  document.title = to.meta.title || 'calendz'

  // if user is connected, redirect him to dashboard
  if (to.matched.some(record => record.meta.redirectToDashboardIfConnected)) {
    if (store.getters.isLoggedIn) return router.push('/dashboard')
  }

  // if user isn't connected, redirect him to login
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isLoggedIn) return router.push('/login')
  }

  // if user isn't admin, redirect him to main dashboard
  if (to.matched.some(record => record.meta.adminOnly)) {
    if (store.state.user.permissionLevel !== 'ADMIN') return router.push('/dashboard')
  }

  next()
})

export default router
