import Vue from 'vue'
import App from './App.vue'
import router from './routes/router'
import DashboardPlugin from './plugins/dashboard-plugin'
import { VueSpinners } from '@saeris/vue-spinners'
import ApiService from './services/api.service'
import TokenService from './services/storage.service'

Vue.use(DashboardPlugin)
Vue.use(VueSpinners)

// Set the base URL of the API
ApiService.init(process.env.VUE_APP_API_URL)

// If token exists set header
if (TokenService.getToken()) {
  ApiService.setHeader()
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router
})
