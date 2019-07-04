import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import routes from './routes'

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
    const accessToken = localStorage.getItem('accessToken')
    if (!accessToken) return next({ name: 'Login' })

    axios.post(`${Vue.prototype.$apiUrl}/auth/refresh`, { accessToken }).then((res) => {
      localStorage.setItem('user', JSON.stringify(res.data.user))
    }).catch((err) => {
      Vue.prototype.$notify({ type: 'danger', message: `${err.response.data.message}.` })
      localStorage.removeItem('user')
      localStorage.removeItem('accessToken')
      next({ name: 'Login' })
    })
  } else

  // if user is connected, redirect to dashboard
  if (to.matched.some(record => record.meta.redirectToDashboardIfConnected)) {
    const accessToken = localStorage.getItem('accessToken')
    if (!accessToken) return next()

    axios.post(`${Vue.prototype.$apiUrl}/auth/refresh`, { accessToken }).then((res) => {
      localStorage.setItem('user', JSON.stringify(res.data.user))
      next('/dashboard')
    }).catch((err) => {
      Vue.prototype.$notify({ type: 'danger', message: `${err.response.data.message}.` })
      localStorage.removeItem('user')
      localStorage.removeItem('accessToken')
    })
  }

  next()
})

export default router
