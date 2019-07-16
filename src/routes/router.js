import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import routes from './routes'
import { UserService } from '../services/user.service'
import { TokenService } from '../services/storage.service'

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

  // check if the route requires auth
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const accessToken = TokenService.getToken()
    if (!accessToken) return next({ name: 'Login' })

    axios.post(`/auth/refresh`, { accessToken }).then((res) => {
      UserService.setUser(res.data.user)
    }).catch((err) => {
      Vue.prototype.$notify({ type: 'danger', message: `${err.response.data.message}.` })
      UserService.removeUser()
      TokenService.removeToken()
      next({ name: 'Login' })
    })
  } else

  // if user is connected, redirect to dashboard
  if (to.matched.some(record => record.meta.redirectToDashboardIfConnected)) {
    const accessToken = TokenService.getToken()
    if (!accessToken) return next()

    axios.post(`/auth/refresh`, { accessToken }).then((res) => {
      UserService.setUser(res.data.user)
      next('/dashboard')
    }).catch((err) => {
      Vue.prototype.$notify({ type: 'danger', message: `${err.response.data.message}.` })
      UserService.removeUser()
      TokenService.removeToken()
    })
  }

  next()
})

export default router
