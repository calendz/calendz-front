import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
import router from './routes/router'
import DashboardPlugin from './plugins/dashboard-plugin'
import ApiService from './services/api.service'
import ApiCalendarService from './services/api-calendar.service'
import { VueSpinners } from '@saeris/vue-spinners'
import Vue2TouchEvents from 'vue2-touch-events'
import VueAnalytics from 'vue-analytics'
import './registerServiceWorker'

const isProd = process.env.NODE_ENV === 'production'

Vue.use(DashboardPlugin)
Vue.use(VueSpinners)
Vue.use(Vue2TouchEvents)

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
ApiCalendarService.init(process.env.VUE_APP_API_CALENDAR_URL, process.env.VUE_APP_API_CALENDAR_TOKEN)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
