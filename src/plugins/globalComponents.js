import BaseInput from '@/components/Inputs/BaseInput.vue'
import BaseDropdown from '@/components/BaseDropdown.vue'
import Card from '@/components/Cards/Card.vue'
import Modal from '@/components/Modal.vue'
import StatsCard from '@/components/Cards/StatsCard.vue'
import BaseButton from '@/components/BaseButton.vue'
import Badge from '@/components/Badge.vue'
import RouteBreadcrumb from '@/components/Breadcrumb/RouteBreadcrumb'
import BaseCheckbox from '@/components/Inputs/BaseCheckbox.vue'
import BaseSwitch from '@/components/BaseSwitch.vue'
import BaseRadio from '@/components/Inputs/BaseRadio'
import BaseProgress from '@/components/BaseProgress'
import BasePagination from '@/components/BasePagination'
import BaseAlert from '@/components/BaseAlert'
import BaseNav from '@/components/Navbar/BaseNav'
import BaseHeader from '@/components/BaseHeader'
import TagsInput from '@/components/Inputs/TagsInput'
import PasswordStrength from '@/components/PasswordStrength'
import ApiErrors from '@/components/ApiErrors'
import Placeholder from '@/components/Placeholder'

// Tasks
import TaskType from '@/components/Tasks/TaskType'
import TaskCore from '@/components/Tasks/TaskCore'

import { Input, Tooltip, Popover } from 'element-ui'
import { ValidationProvider } from 'vee-validate'

// Help
import HelpSection from '@/components/Help/HelpSection'

const GlobalComponents = {
  install (Vue) {
    Vue.component(Badge.name, Badge)
    Vue.component(BaseAlert.name, BaseAlert)
    Vue.component(BaseButton.name, BaseButton)
    Vue.component(BaseCheckbox.name, BaseCheckbox)
    Vue.component(BaseHeader.name, BaseHeader)
    Vue.component(BaseInput.name, BaseInput)
    Vue.component(BaseDropdown.name, BaseDropdown)
    Vue.component(BaseNav.name, BaseNav)
    Vue.component(BasePagination.name, BasePagination)
    Vue.component(BaseProgress.name, BaseProgress)
    Vue.component(BaseRadio.name, BaseRadio)
    Vue.component(BaseSwitch.name, BaseSwitch)
    Vue.component(Card.name, Card)
    Vue.component(Modal.name, Modal)
    Vue.component(StatsCard.name, StatsCard)
    Vue.component(RouteBreadcrumb.name, RouteBreadcrumb)
    Vue.component(Input.name, Input)
    Vue.component(TagsInput.name, TagsInput)
    Vue.component(PasswordStrength.name, PasswordStrength)
    Vue.component(ApiErrors.name, ApiErrors)
    Vue.component(Placeholder.name, Placeholder)
    Vue.component('ValidationProvider', ValidationProvider)

    Vue.component(TaskType.name, TaskType)
    Vue.component(TaskCore.name, TaskCore)

    Vue.component(HelpSection.name, HelpSection)

    Vue.use(Tooltip)
    Vue.use(Popover)
  }
}

export default GlobalComponents
