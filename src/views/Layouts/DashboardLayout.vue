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
            }"
          >
            <sidebar-item
              :link="{ name: 'Emploi du temps', path: '/calendar' }"
            />
            <sidebar-item
              :link="{ name: 'Rechercher', path: '/calendar/search' }"
            />
          </sidebar-item>

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

      <template slot="links-after">
        <hr class="my-3">
        <h6 class="navbar-heading p-0 text-muted">Documentation</h6>

        <ul class="navbar-nav mb-md-3">
          <!-- Blog -->
          <sidebar-item
            :link="{
              name: 'Blog',
              icon: 'fas fa-newspaper text-grey',
              path: '/blog'
          }"/>

          <!-- Fonctionnalités -->
          <sidebar-item
            :link="{
              name: 'Fonctionnalités',
              icon: 'ni ni-ui-04 text-grey',
              path: '/features'
          }"/>

          <!-- Bug report -->
          <sidebar-item
            :link="{
              name: 'Signaler un bug',
              icon: 'fas fa-bug text-grey',
              path: '/bug-report'
          }"/>
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
  created () {
    // if user isn't connected, redirect him to login page
    if (!this.$store.getters.isLoggedIn) return this.$router.push('/login')

    // checks if user is still logged in
    this.$store.dispatch('verify')
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
