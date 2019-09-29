import Vue from 'vue'
import Vuex from 'vuex'
import AccountModule from './modules/account.module'
import NotificationsModule from './modules/notifications.module'
import CalendarModule from './modules/calendar.module'
import SysconfModule from './modules/sysconf.module'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    account: AccountModule,
    calendar: CalendarModule,
    notifications: NotificationsModule,
    sysconf: SysconfModule
  },
  strict: process.env.NODE_ENV !== 'production'
})
