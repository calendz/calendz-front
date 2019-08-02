import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import { UserService } from '../services/user.service'

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

  // if user is connected, redirect to dashboard
  if (to.matched.some(record => record.meta.redirectToDashboardIfConnected)) {
    const user = UserService.getUser()
    if (user) return next('/dashboard')
  }

  next()
})

export default router
