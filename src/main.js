import Vue from 'vue'
import App from './App.vue'
import router from './routes/router'
import DashboardPlugin from './plugins/dashboard-plugin'

Vue.use(DashboardPlugin)

// create global variables with env configuration
Vue.prototype.$apiUrl = process.env.VUE_APP_API_URL

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router
})
