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
        :pill-amount="notifications.length"
        class="nav-item">
        <div class="px-3 py-3">
          <h6 class="text-sm text-muted text-center m-0">
            <span v-if="notifications.length > 0">
              Vous avez <strong class="text-primary">{{ notifications.length }}</strong> {{ notifications.length > 1 ? 'notifications non-lues' : 'notification non-lue' }}.
            </span>
            <span v-else>
              Vous n'avez aucune notification non-lue !
            </span>
          </h6>
        </div>

        <div
          v-for="(notif, index) in notifications.slice(0, 4)"
          :key="index"
          class="list-group list-group-flush">
          <a
            class="list-group-item list-group-item-action"
            @click.prevent="$store.dispatch('notifications/read', { notifId: notif._id })">
            <div class="row align-items-center">
              <div class="col-auto">
                <i
                  :class="`${notif.icon} bg-${notif.type}`"
                  class="avatar rounded-circle"/>
              </div>
              <div class="col container ml--2">

                <div class="row">
                  <div class="col">
                    <h4 class="mb-0 text-sm">{{ notif.title }}</h4>
                  </div>
                  <div class="col-auto text-right">
                    <small class="text-muted">
                      <i class="fas fa-clock mr-1"/>
                      {{ getFuzzyTime(notif.timestamp) }}
                    </small>
                  </div>
                </div>

                <div class="row mt-1 px-3">
                  <p class="text-sm mb-0">{{ notif.message }}</p>
                </div>
              </div>
            </div>
          </a>
        </div>
        <router-link
          to="/notifications"
          class="dropdown-item text-center text-primary font-weight-bold py-3">Voir tout</router-link>
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
import { mapState, mapGetters } from 'vuex'
import { CollapseTransition } from 'vue2-transitions'
import { BaseNav, Modal } from '@/components'
import dateUtilMixin from '@/mixins/dateUtilMixin'
import stringUtilMixin from '@/mixins/stringUtilMixin'

export default {
  components: {
    CollapseTransition,
    BaseNav,
    Modal
  },
  mixins: [dateUtilMixin, stringUtilMixin],
  data () {
    return {
      showProfileDropdown: false,
      showMenu: false,
      searchModalVisible: false,
      searchQuery: ''
    }
  },
  computed: {
    ...mapState({
      user: state => state.account.user
    }),
    ...mapGetters({
      notifications: 'notifications/notRead'
    }),
    routeName () {
      const { name } = this.$route
      return this.capitalizeFirstLetter(name)
    },
    isRTL () {
      return this.$rtl.isRTL
    }
  },
  mounted () {
    // get all notifications
    this.$store.dispatch('notifications/fetch')

    // get current week
    this.$store.dispatch('calendar/fetchDate', { date: this.toMonthDayYear(new Date()) })
  },
  methods: {
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
