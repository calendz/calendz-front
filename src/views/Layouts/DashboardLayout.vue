<template>
  <div class="wrapper">
    <notifications/>
    <side-bar>
      <template
        slot="links-after">
        <hr class="mt-0 mb-3">
        <h6 class="navbar-heading p-0 text-muted">Menu principal</h6>

        <ul class="navbar-nav mb-md-3">

          <!-- dashboard -->
          <sidebar-item
            :link="{
              name: 'Dashboard',
              icon: 'ni ni-shop text-red',
              path: '/dashboard'
          }"/>

          <!-- calendar -->
          <sidebar-item
            :link="{
              name: 'Emploi du temps',
              icon: 'ni ni-calendar-grid-58 text-info',
              path: '/calendar'
          }"/>

          <!-- homeworks -->
          <sidebar-item
            :link="{
              name: 'Devoirs',
              icon: 'fas fa-book text-primary',
              path: '/homeworks'
          }"/>

          <!-- settings -->
          <sidebar-item
            :link="{
              name: 'Mon profil',
              icon: 'fas fa-user-edit text-success',
              path: '/profile'
          }"/>

          <!-- settings -->
          <sidebar-item
            :link="{
              name: 'Paramètres',
              icon: 'fas fa-cogs text-grey',
              path: '/settings'
          }"/>
        </ul>
      </template>

      <template
        v-if="user && user.permissionLevel === 'ADMIN'"
        slot="links-after">
        <hr class="my-3">
        <h6 class="navbar-heading p-0 text-muted">Admin</h6>

        <ul class="navbar-nav mb-md-3">
          <!-- dashboard admin -->
          <sidebar-item
            :link="{
              name: 'Dashboard admin',
              icon: 'ni ni-shop text-red',
              path: '/dashboard-admin'
          }"/>

          <!-- statistics -->
          <sidebar-item
            :link="{
              name: 'Statistiques',
              icon: 'fas fa-chart-line text-info',
              path: '/stats'
          }"/>

          <!-- user-management -->
          <sidebar-item
            :link="{
              name: 'Gestion des utilisateurs',
              icon: 'fas fa-users-cog text-primary',
              path: '/user-management'
          }"/>
        </ul>
      </template>

      <template slot="links-after">
        <hr class="my-3">
        <h6 class="navbar-heading p-0 text-muted">Autres</h6>

        <ul class="navbar-nav mb-md-3">
          <!-- Bug report -->
          <li class="nav-item">
            <a
              href="https://docs.api-calendar.calendz.app/autres/faq#comment-signaler-des-bugs"
              target="_blank"
              rel="noreferrer noopenner"
              class="nav-link">
              <i class="fas fa-bug text-grey"/>
              <span class="nav-link-text">Signaler un bug</span>
            </a>
          </li>

          <!-- Documentation -->
          <li class="nav-item">
            <a
              href="https://docs.calendz.app/"
              target="_blank"
              rel="noreferrer noopenner"
              class="nav-link">
              <i class="fas fa-newspaper text-grey"/>
              <span class="nav-link-text">Documentation</span>
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
/* eslint-disable no-new */
import PerfectScrollbar from 'perfect-scrollbar'
import 'perfect-scrollbar/css/perfect-scrollbar.css'

import DashboardNavbar from './DashboardNavbar.vue'
import ContentFooter from './ContentFooter.vue'
import DashboardContent from './Content.vue'
import { FadeTransition } from 'vue2-transitions'
import { mapState } from 'vuex'

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
  computed: {
    ...mapState({
      user: state => state.account.user
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
