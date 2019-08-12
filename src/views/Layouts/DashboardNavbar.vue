<template>
  <base-nav
    :class="$route.meta.navbarClasses ? $route.meta.navbarClasses : 'bg-primary navbar-dark'"
    container-classes="container-fluid px-4"
    class="navbar-top border-bottom navbar-expand"
    type="">

    <!-- ========================================================== -->
    <!-- == Search form =========================================== -->
    <!-- ========================================================== -->

    <!-- TODO: rechercher des devoirs, ou autre chose  -->
    <form
      id="navbar-search-main"
      :class="$route.meta.searchClasses ? $route.meta.searchClasses : 'navbar-search-light'"
      class="navbar-search form-inline mr-sm-3"
      @submit.prevent>
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

      <!-- Notifications -->
      <base-dropdown
        :tag="'li'"
        :icon="'ni ni-bell-55'"
        :title-tag="'a'"
        :title-classes="'nav-link dropdown-toggle'"
        :menu-on-right="true"
        :menu-classes="'dropdown-menu dropdown-menu-xl py-0 overflow-hidden'"
        :pill-amount="notReadNotifications.length"
        class="nav-item">
        <div class="px-3 py-3">
          <h6 class="text-sm text-muted text-center m-0">
            <span v-if="notReadNotifications.length > 0">
              Vous avez <strong class="text-primary">{{ notReadNotifications.length }}</strong> {{ notReadNotifications.length > 1 ? 'notifications non-lues' : 'notification non-lue' }}.
            </span>
            <span v-else>
              Vous n'avez aucune notification non-lue !
            </span>
          </h6>
        </div>

        <div
          v-for="(notif, index) in notReadNotifications.slice(0, 4)"
          :key="index"
          class="list-group list-group-flush">
          <a
            class="list-group-item list-group-item-action"
            @click.prevent="readNotification(notif)">
            <div class="row align-items-center">
              <div class="col-auto">
                <i
                  :class="notif.icon"
                  class="avatar rounded-circle"/>
              </div>
              <div class="col ml--2">
                <div class="d-flex justify-content-between align-items-center">
                  <div>
                    <h4 class="mb-0 text-sm">{{ notif.title }}</h4>
                  </div>
                  <div class="text-right text-muted">
                    <small>il y a {{ formatDate(notif.timestamp) }}</small>
                  </div>
                </div>
                <p class="text-sm mb-0">{{ notif.message }}</p>
              </div>
            </div>
          </a>
        </div>
        <a
          href="#!"
          class="dropdown-item text-center text-primary font-weight-bold py-3"><del>Voir tout</del></a>
      </base-dropdown>

      <!-- Shortcuts -->
      <base-dropdown
        :tag="'li'"
        :icon="'ni ni-ungroup'"
        :title-tag="'a'"
        :title-classes="'nav-link dropdown-toggle'"
        :menu-on-right="true"
        :menu-classes="'dropdown-menu dropdown-menu-lg dropdown-menu-dark bg-default'"
        class="nav-item">
        <div class="row shortcuts px-4">
          <!-- calendar -->
          <router-link
            to="calendar"
            class="col-4 shortcut-item">
            <span class="shortcut-media avatar rounded-circle bg-gradient-info">
              <i class="ni ni-calendar-grid-58"/>
            </span>
            <small>Calendrier</small>
          </router-link>

          <!-- homeworks -->
          <router-link
            to="homeworks"
            class="col-4 shortcut-item">
            <span class="shortcut-media avatar rounded-circle bg-gradient-orange">
              <i class="fas fa-book"/>
            </span>
            <small>Devoirs</small>
          </router-link>

          <!-- beecome -->
          <a
            target="_blank"
            href="https://www.beecome.io/dashboard"
            class="col-4 shortcut-item">
            <span class="shortcut-media avatar rounded-circle bg-gradient-red">
              <i class="fas fa-bold"/>
            </span>
            <small>Beecome</small>
          </a>

          <!-- Email (outlook) -->
          <a
            target="_blank"
            href="https://outlook.office365.com/mail/inbox"
            class="col-4 shortcut-item">
            <span class="shortcut-media avatar rounded-circle bg-gradient-green">
              <i class="fas fa-envelope"/>
            </span>
            <small>Boîte mail</small>
          </a>

          <!-- MyLearningBox -->
          <a
            target="_blank"
            href="https://mylearningbox.reseau-cd.fr/"
            class="col-4 shortcut-item">
            <span class="shortcut-media avatar rounded-circle bg-gradient-purple">
              <i class="fas fa-box-open"/>
            </span>
            <small>MyLearBox</small>
          </a>

          <!-- Calendrier officiel -->
          <a
            :href="`https://edtmobiliteng.wigorservices.net//WebPsDyn.aspx?action=posEDTBEECOME&serverid=C&Tel=${user ? user.email.split('@')[0] : 'error'}&date=${getDate()}`"
            target="_blank"
            class="col-4 shortcut-item">
            <span class="shortcut-media avatar rounded-circle bg-gradient-yellow">
              <i class="ni ni-calendar-grid-58"/>
            </span>
            <small>EDT officiel</small>
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
              <span class="mb-0 text-sm font-weight-bold">{{ user ? user.firstname : 'Prénom' }}</span>
            </div>
          </div>
        </a>
        <div
          :class="showProfileDropdown ? 'show' : ''"
          class="dropdown-menu dropdown-menu-right">
          <div class="dropdown-header noti-title">
            <h6 class="text-overflow m-0">{{ `Hello ${user ? user.firstname : 'Prénom'} ${user ? user.lastname : 'Nom'}` }} !</h6>
          </div>
          <router-link
            to="/profile"
            class="dropdown-item">
            <i class="ni ni-single-02"/>
            <span>Mon profil</span>
          </router-link>
          <router-link
            to="/settings"
            class="dropdown-item">
            <i class="ni ni-settings-gear-65"/>
            <span>Paramètres</span>
          </router-link>
          <div class="dropdown-divider"/>
          <a
            class="dropdown-item"
            @click.prevent="logout">
            <i class="ni ni-user-run"/>
            <span>Déconnexion</span>
          </a>
        </div>
      </li>
    </ul>
  </base-nav>
</template>
<script>
import swal from 'sweetalert2'
import { mapState } from 'vuex'
import { CollapseTransition } from 'vue2-transitions'
import { BaseNav, Modal } from '@/components'
import ApiService from '../../services/api.service'

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
      searchQuery: '',
      allNotifications: []
    }
  },
  computed: {
    ...mapState({
      user: state => state.account.user
    }),
    notReadNotifications () {
      return this.allNotifications.filter(notif => notif.isRead === false)
    },
    routeName () {
      const { name } = this.$route
      return this.capitalizeFirstLetter(name)
    },
    isRTL () {
      return this.$rtl.isRTL
    }
  },
  mounted () {
    ApiService.get(`/notifications/${this.user._id}`)
      .then(res => {
        if (res) this.allNotifications = res.data.notifications
      })
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
    },
    logout () {
      swal.fire({
        title: 'Êtes vous sûr ?',
        text: 'Vous serez déconnecté du site !',
        type: 'info',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-secondary'
        },
        buttonsStyling: false,
        showCancelButton: true,
        cancelButtonText: 'Annuler',
        confirmButtonText: 'Oui !'
      }).then((result) => {
        if (result.value) {
          this.$store.dispatch('account/logout', {})
          swal.fire({
            title: 'Vous avez été déconnecté',
            type: 'success',
            customClass: {
              confirmButton: 'btn btn-primary'
            }
          })
        }
      })
    },
    formatDate (timestamp) {
      const seconds = Math.floor(new Date().getTime() / 1000 - timestamp / 1000)
      if (seconds > 2 * 24 * 3600) return Math.floor(seconds / 3600 / 24) + 'j'
      if (seconds > 24 * 3600) return 'hier'
      if (seconds > 3600) return Math.floor(seconds / 3600) + 'h'
      if (seconds > 60) return Math.floor(seconds / 60) + 'm'
      if (seconds > 1) return seconds + 's'
      return '?? secondes'
    },
    readNotification (notification) {
      ApiService.patch(`/notifications/${this.user._id}/read/${notification._id}`)
        .then(res => {
          const index = this.allNotifications.findIndex(notif => notif._id === notification._id)
          this.allNotifications[index].isRead = true
        })
    },
    getFirstnameAndLastname (email) {
      return email.split('@')[0]
    },
    getDate () {
      let date = new Date()
      if (date.getDay() === 0) {
        date = this.addDays(date, 1)
      }
      const day = date.getDate()
      const month = date.getMonth() + 1
      const year = date.getFullYear()

      return month + '/' + day + '/' + year
    },
    addDays (date, days) {
      var result = new Date(date)
      result.setDate(result.getDate() + days)
      return result
    }
  }
}
</script>
<style scoped>
.top-navbar {
  top: 0px;
}
</style>
