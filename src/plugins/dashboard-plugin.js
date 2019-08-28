// Polyfills for js features used in the Dashboard but not supported in some browsers (mainly IE)
import '@/polyfills'

// Notifications plugin. Used on Notifications page
import Notifications from '@/components/NotificationPlugin'

// Validation plugin used to validate forms
import VeeValidate, { Validator } from 'vee-validate'
import french from 'vee-validate/dist/locale/fr'
import './veeCustom/customDictionary'
import './veeCustom/customValidators'

// A plugin file where you could register global components
import GlobalComponents from './globalComponents'

// A plugin file where you could register global directives
import GlobalDirectives from './globalDirectives'

// Sidebar on the right. Used as a local plugin in DashboardLayout.vue
import SideBar from '@/components/SidebarPlugin'

// element ui language configuration
import lang from 'element-ui/lib/locale/lang/fr'
import locale from 'element-ui/lib/locale'

// asset imports
import '@/assets/sass/argon.scss'
import '@/assets/css/nucleo/css/nucleo.css'
locale.use(lang)

export default {
  install (Vue) {
    Vue.use(GlobalComponents)
    Vue.use(GlobalDirectives)
    Vue.use(SideBar)
    Vue.use(Notifications)
    Vue.use(VeeValidate, {
      fieldsBagName: 'veeFields',
      classes: true,
      validity: true,
      classNames: {
        valid: 'is-valid',
        invalid: 'is-invalid'
      }
    })
    Validator.localize('fr', french)
  }
}
