import Vue from 'vue'
import App from './App.vue'
import router from './routes/router'
import DashboardPlugin from './plugins/dashboard-plugin'

Vue.use(DashboardPlugin)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router
})
