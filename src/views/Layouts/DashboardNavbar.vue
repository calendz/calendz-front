<template>
  <base-nav
    :class="$route.meta.navbarClasses ? $route.meta.navbarClasses : 'bg-primary navbar-dark'"
    container-classes="container-fluid"
    class="navbar-top border-bottom navbar-expand"
    type="">

    <!-- ========================================================== -->
    <!-- == Search form =========================================== -->
    <!-- ========================================================== -->

    <!-- TODO: rechercher des devoirs, ou autre chose  -->
    <form
      id="navbar-search-main"
      :class="$route.meta.searchClasses ? $route.meta.searchClasses : 'navbar-search-light'"
      class="navbar-search form-inline mr-sm-3">
      <div class="form-group mb-0">
        <div class="input-group input-group-alternative input-group-merge">
          <div class="input-group-prepend">
            <span class="input-group-text"><i class="fas fa-search"/></span>
          </div>
          <input
            class="form-control"
            placeholder="Rechercher"
            type="text">
        </div>
      </div>
      <button
        type="button"
        class="close"
        data-action="search-close"
        data-target="#navbar-search-main"
        aria-label="Close">
        <span aria-hidden="true">×</span>
      </button>
    </form>

    <!-- ========================================================== -->
    <!-- == Navbar links ========================================== -->
    <!-- ========================================================== -->

    <ul class="navbar-nav align-items-center ml-md-auto">

      <!-- Sidenav toggler -->
      <li class="nav-item d-xl-none">
        <div
          class="pr-3 sidenav-toggler sidenav-toggler-dark"
          @click="toggleSidebar">
          <div class="sidenav-toggler-inner">
            <i class="sidenav-toggler-line"/>
            <i class="sidenav-toggler-line"/>
            <i class="sidenav-toggler-line"/>
          </div>
        </div>
      </li>

      <!-- idk -->
      <li class="nav-item d-sm-none">
        <a
          class="nav-link"
          href="#"
          data-action="search-show"
          data-target="#navbar-search-main">
          <i class="ni ni-zoom-split-in"/>
        </a>
      </li>

      <!-- Notifications -->
      <base-dropdown
        :tag="'li'"
        :icon="'ni ni-bell-55'"
        :title-tag="'a'"
        :title-classes="'nav-link dropdown-toggle'"
        :menu-on-right="true"
        :menu-classes="'dropdown-menu dropdown-menu-xl py-0 overflow-hidden'">
        <div class="px-3 py-3">
          <h6 class="text-sm text-muted m-0">Vous avez <strong class="text-primary">1</strong> notification non-lue.</h6>
        </div>

        <div class="list-group list-group-flush">
          <a
            href="#!"
            class="list-group-item list-group-item-action">
            <div class="row align-items-center">
              <div class="col-auto">
                <img
                  alt="Image placeholder"
                  src="img/theme/team-1.jpg"
                  class="avatar rounded-circle">
              </div>
              <div class="col ml--2">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <h4 class="mb-0 text-sm">John Snow</h4>
                  </div>
                  <div class="text-right text-muted">
                    <small>il y a 2h</small>
                  </div>
                </div>
                <p class="text-sm mb-0">Let's meet at Starbucks at 11:30. Wdyt?</p>
              </div>
            </div>
          </a>
        </div>

        <a
          href="#!"
          class="dropdown-item text-center text-primary font-weight-bold py-3">Voir tout</a>
      </base-dropdown>

      <!-- Shortcuts -->
      <base-dropdown
        :tag="'li'"
        :icon="'ni ni-ungroup'"
        :title-tag="'a'"
        :title-classes="'nav-link dropdown-toggle'"
        :menu-on-right="true"
        :menu-classes="'dropdown-menu dropdown-menu-lg dropdown-menu-dark bg-default'">
        <div class="row shortcuts px-4">
          <a
            href="#!"
            class="col-4 shortcut-item">
            <span class="shortcut-media avatar rounded-circle bg-gradient-red">
              <i class="ni ni-calendar-grid-58"/>
            </span>
            <small>Calendar</small>
          </a>
          <a
            href="#!"
            class="col-4 shortcut-item">
            <span class="shortcut-media avatar rounded-circle bg-gradient-orange">
              <i class="ni ni-email-83"/>
            </span>
            <small>Email</small>
          </a>
          <a
            href="#!"
            class="col-4 shortcut-item">
            <span class="shortcut-media avatar rounded-circle bg-gradient-info">
              <i class="ni ni-credit-card"/>
            </span>
            <small>Payments</small>
          </a>
          <a
            href="#!"
            class="col-4 shortcut-item">
            <span class="shortcut-media avatar rounded-circle bg-gradient-green">
              <i class="ni ni-books"/>
            </span>
            <small>Reports</small>
          </a>
          <a
            href="#!"
            class="col-4 shortcut-item">
            <span class="shortcut-media avatar rounded-circle bg-gradient-purple">
              <i class="ni ni-pin-3"/>
            </span>
            <small>Maps</small>
          </a>
          <a
            href="#!"
            class="col-4 shortcut-item">
            <span class="shortcut-media avatar rounded-circle bg-gradient-yellow">
              <i class="ni ni-basket"/>
            </span>
            <small>Shop</small>
          </a>
        </div>
      </base-dropdown>
    </ul>

    <!-- ========================================================== -->
    <!-- == Profile =============================================== -->
    <!-- ========================================================== -->

    <ul class="navbar-nav align-items-center ml-auto ml-md-0">
      <li
        v-click-outside="closeDropDown"
        class="nav-item dropdown">
        <a
          class="nav-link pr-0"
          href="#"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          @click="toggleProfileDropdown">
          <div class="media align-items-center">
            <span class="avatar avatar-sm rounded-circle">
              <img
                alt="Image placeholder"
                src="img/theme/default-pp.svg">
            </span>
            <div class="media-body ml-2 d-none d-lg-block">
              <span class="mb-0 text-sm  font-weight-bold">John Snow</span>
            </div>
          </div>
        </a>
        <div
          :class="showProfileDropdown ? 'show' : ''"
          class="dropdown-menu dropdown-menu-right">
          <div class="dropdown-header noti-title">
            <h6 class="text-overflow m-0">Bienvenue !</h6>
          </div>
          <a
            href="#!"
            class="dropdown-item">
            <i class="ni ni-single-02"/>
            <span>Mon profil</span>
          </a>
          <a
            href="#!"
            class="dropdown-item">
            <i class="ni ni-settings-gear-65"/>
            <span>Paramètres</span>
          </a>
          <div class="dropdown-divider"/>
          <a
            href="#!"
            class="dropdown-item">
            <i class="ni ni-user-run"/>
            <span>Déconnexion</span>
          </a>
        </div>
      </li>
    </ul>
  </base-nav>
</template>
<script>
import { CollapseTransition } from 'vue2-transitions'
import { BaseNav, Modal } from '@/components'

export default {
  components: {
    CollapseTransition,
    BaseNav,
    Modal
  },
  data () {
    return {
      showProfileDropdown: false,
      showMenu: false,
      searchModalVisible: false,
      searchQuery: ''
    }
  },
  computed: {
    routeName () {
      const { name } = this.$route
      return this.capitalizeFirstLetter(name)
    },
    isRTL () {
      return this.$rtl.isRTL
    }
  },
  methods: {
    capitalizeFirstLetter (string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    },
    toggleProfileDropdown () {
      this.showProfileDropdown = !this.showProfileDropdown
    },
    closeDropDown () {
      this.showProfileDropdown = false
    },
    toggleSidebar () {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar)
    },
    hideSidebar () {
      this.$sidebar.displaySidebar(false)
    }
  }
}
</script>
<style scoped>
.top-navbar {
  top: 0px;
}
</style>
