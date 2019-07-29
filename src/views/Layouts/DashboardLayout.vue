<template>
  <div class="wrapper">
    <notifications/>
    <side-bar>
      <template
        slot="links">
        <sidebar-item
          :link="{
            name: 'Dashboards',
            icon: 'ni ni-shop text-primary',
          }"
        >
          <sidebar-item
            :link="{ name: 'Dashboard', path: '/dashboard' }"
          />
          <sidebar-item
            :link="{ name: 'Alternative', path: '/alternative' }"
          />
        </sidebar-item>

        <sidebar-item
          :link="{
            name: 'Examples',
            icon: 'ni ni-ungroup text-orange'
        }">
          <sidebar-item :link="{ name: 'Pricing', path: '/pricing' }"/>
          <sidebar-item :link="{ name: 'Login', path: '/login' }"/>
          <sidebar-item :link="{ name: 'Register', path: '/register' }"/>
          <sidebar-item :link="{ name: 'Lock', path: '/lock' }"/>
          <sidebar-item :link="{ name: 'Timeline', path: '/pages/timeline' }"/>
          <sidebar-item :link="{ name: 'Profile', path: '/pages/user' }"/>

        </sidebar-item>

        <sidebar-item
          :link="{
            name: 'Components',
            icon: 'ni ni-ui-04 text-info'
        }">
          <sidebar-item :link="{ name: 'Buttons', path: '/components/buttons' }"/>
          <sidebar-item :link="{ name: 'Cards', path: '/components/cards' }"/>
          <sidebar-item :link="{ name: 'Grid', path: '/components/grid-system' }"/>
          <sidebar-item :link="{ name: 'Notifications', path: '/components/notifications' }"/>
          <sidebar-item :link="{ name: 'Icons', path: '/components/icons' }"/>
          <sidebar-item :link="{ name: 'Typography', path: '/components/typography' }"/>

          <sidebar-item :link="{ name: 'Multi Level' }">
            <sidebar-item :link="{ name: 'Third level menu', path:'#' }"/>
            <sidebar-item :link="{ name: 'Just another link', path:'#' }"/>
            <sidebar-item :link="{ name: 'One last link', path:'#' }"/>
          </sidebar-item>
        </sidebar-item>
        <sidebar-item
          :link="{
            name: 'Forms',
            icon: 'ni ni-single-copy-04 text-pink'
        }">
          <sidebar-item :link="{ name: 'Elements', path: '/forms/elements' }"/>
          <sidebar-item :link="{ name: 'Components', path: '/forms/components' }"/>
          <sidebar-item :link="{ name: 'Validation', path: '/forms/validation' }"/>
        </sidebar-item>

        <sidebar-item
          :link="{
            name: 'Tables',
            icon: 'ni ni-align-left-2 text-default'
        }">
          <sidebar-item :link="{ name: 'Tables', path: '/tables/regular' }"/>
          <sidebar-item :link="{ name: 'Sortable', path: '/tables/sortable' }"/>
          <sidebar-item :link="{ name: 'Paginated Tables', path: '/tables/paginated' }"/>
        </sidebar-item>

        <sidebar-item
          :link="{
            name: 'Maps',
            icon: 'ni ni-map-big text-primary'
        }">
          <sidebar-item :link="{ name: 'Google', path: '/maps/google' }"/>
          <sidebar-item :link="{ name: 'Vector', path: '/maps/vector' }"/>
        </sidebar-item>
        <sidebar-item
          :link="{
            name: 'Widgets',
            icon: 'ni ni-archive-2 text-green',
            path: '/widgets'
        }"/>
        <sidebar-item
          :link="{
            name: 'Charts',
            icon: 'ni ni-chart-pie-35 text-info',
            path: '/charts'
        }"/>

        <sidebar-item
          :link="{
            name: 'Calendar',
            icon: 'ni ni-calendar-grid-58 text-red',
            path: '/calendar'
        }"/>
      </template>

      <template slot="links-after">
        <hr class="my-3">
        <h6 class="navbar-heading p-0 text-muted">Documentation</h6>

        <ul class="navbar-nav mb-md-3">
          <li class="nav-item">
            <a
              class="nav-link"
              href="https://demos.creative-tim.com/vue-argon-dashboard-pro/documentation"
              target="_blank">
              <i class="ni ni-spaceship"/>
              <span class="nav-link-text">Getting started</span>
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              href="https://demos.creative-tim.com/vue-argon-dashboard-pro/documentation/foundation/colors.html"
              target="_blank">
              <i class="ni ni-palette"/>
              <span class="nav-link-text">Foundation</span>
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              href="https://demos.creative-tim.com/vue-argon-dashboard-pro/documentation/components/avatars.html"
              target="_blank">
              <i class="ni ni-ui-04"/>
              <span class="nav-link-text">Components</span>
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              href="https://demos.creative-tim.com/vue-argon-dashboard-pro/documentation/components/plugin_datepicker.html"
              target="_blank">
              <i class="ni ni-chart-pie-35"/>
              <span class="nav-link-text">Plugins</span>
            </a>
          </li>
        </ul>
      </template>
    </side-bar>
    <div class="main-content">
      <dashboard-navbar/>

      <div @click="$sidebar.displaySidebar(false)">
        <fade-transition
          :duration="200"
          origin="center top"
          mode="out-in">
          <!-- your content here -->
          <router-view/>
        </fade-transition>
      </div>
      <content-footer v-if="!$route.meta.hideFooter"/>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { TokenService } from '../../services/storage.service'
import { UserService } from '../../services/user.service'

/* eslint-disable no-new */
import PerfectScrollbar from 'perfect-scrollbar'
import 'perfect-scrollbar/css/perfect-scrollbar.css'

import DashboardNavbar from './DashboardNavbar.vue'
import ContentFooter from './ContentFooter.vue'
import DashboardContent from './Content.vue'
import { FadeTransition } from 'vue2-transitions'

function hasElement (className) {
  return document.getElementsByClassName(className).length > 0
}

function initScrollbar (className) {
  if (hasElement(className)) {
    new PerfectScrollbar(`.${className}`)
  } else {
    // try to init it later in case this component is loaded async
    setTimeout(() => {
      initScrollbar(className)
    }, 100)
  }
}

export default {
  components: {
    DashboardNavbar,
    ContentFooter,
    DashboardContent,
    FadeTransition
  },
  beforeCreate () {
    const accessToken = TokenService.getToken()
    if (!accessToken) return this.$router.push('/login')

    axios.post(`/auth/refresh`, { accessToken }).then((res) => {
      UserService.setUser(res.data.user)
    }).catch((err) => {
      this.$notify({ type: 'danger', message: `${err.response.data.message}.` })
      UserService.removeUser()
      TokenService.removeToken()
      this.$router.push('/login')
    })
  },
  methods: {
    initScrollbar () {
      let docClasses = document.body.classList
      let isWindows = navigator.platform.startsWith('Win')
      if (isWindows) {
        // if we are on windows OS we activate the perfectScrollbar function
        initScrollbar('scrollbar-inner')

        docClasses.add('perfect-scrollbar-on')
      } else {
        docClasses.add('perfect-scrollbar-off')
      }
    }
  }
}
</script>
<style lang="scss">
</style>
