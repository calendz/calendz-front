import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
import router from './routes/router'
import DashboardPlugin from './plugins/dashboard-plugin'
import ApiService from './services/api.service'
import { VueSpinners } from '@saeris/vue-spinners'
import VueAnalytics from 'vue-analytics'

const isProd = process.env.NODE_ENV === 'production'

Vue.use(DashboardPlugin)
Vue.use(VueSpinners)

Vue.use(VueAnalytics, {
  id: 'UA-146470801-1',
  router,
  debug: {
    enabled: !isProd,
    sendHitTask: isProd
  }
})

// Set the base URL of the API
ApiService.init(process.env.VUE_APP_API_URL)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
