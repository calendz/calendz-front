<template>
  <div>
    <base-nav
      v-model="showMenu"
      :transparent="true"
      type="light"
      menu-classes="justify-content-end"
      class="navbar-horizontal navbar-main"
      expand="lg"
    >
      <div
        slot="brand"
        class="navbar-wrapper">
        <router-link
          class="navbar-brand"
          to="/">
          <img
            src="img/brand/logo-white.svg"
            style="height: 75px; width: 187.5px">
        </router-link>
      </div>

      <template>
        <div class="navbar-collapse-header">
          <div class="row">
            <div class="col-6 collapse-brand">
              <router-link to="/">
                <img src="img/brand/logo-black.svg">
              </router-link>
            </div>
            <div class="col-6 collapse-close">
              <button
                type="button"
                class="navbar-toggler"
                @click="showMenu = false">
                <span/>
                <span/>
              </button>
            </div>
          </div>
        </div>

        <!-- Left side -->
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link
              to="/home"
              class="nav-link">
              <span class="nav-link-inner--text">Accueil</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              to="/dashboard"
              class="nav-link">
              <span class="nav-link-inner--text">Dashboard</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              to="/portfolio"
              class="nav-link">
              <span class="nav-link-inner--text">Portfolio</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              to="/blog"
              class="nav-link">
              <span class="nav-link-inner--text">Blog</span>
            </router-link>
          </li>

        </ul>

        <hr class="d-lg-none">

        <!-- Right side -->
        <ul class="navbar-nav align-items-lg-center ml-lg-auto">
          <li class="nav-item">
            <a
              class="nav-link nav-link-icon"
              href="https://www.instagram.com/"
              target="_blank"
              data-toggle="tooltip"
              data-original-title="Suivez moi sur Instagram">
              <i class="fab fa-instagram"/>
              <span class="nav-link-inner--text d-lg-none">Instagram</span>
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link nav-link-icon"
              href="https://twitter.com/"
              target="_blank"
              data-toggle="tooltip"
              data-original-title="Follow us on Twitter">
              <i class="fab fa-twitter"/>
              <span class="nav-link-inner--text d-lg-none">Twitter</span>
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link nav-link-icon"
              href="https://www.linkedin.com/in/arthur-d-145019132/"
              target="_blank"
              data-toggle="tooltip"
              data-original-title="Rejoignez mon réseau">
              <i class="fab fa-linkedin"/>
              <span class="nav-link-inner--text d-lg-none">LinkedIn</span>
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link nav-link-icon"
              href="https://github.com/Woosy"
              target="_blank"
              data-toggle="tooltip"
              data-original-title="Star me on GitHub">
              <i class="fab fa-github"/>
              <span class="nav-link-inner--text d-lg-none">Github</span>
            </a>
          </li>
          <li class="nav-item d-none d-lg-block ml-lg-4">
            <a
              href="mailto:arthur.dufour@epsi.fr"
              target="_blank"
              class="btn btn-neutral btn-icon">
              <span class="btn-inner--icon">
                <i class="fas fa-envelope mr-2"/>
              </span>
              <span class="nav-link-inner--text">Me contacter</span>
            </a>
          </li>
        </ul>
      </template>
    </base-nav>

    <div class="main-content">
      <zoom-center-transition
        :duration="pageTransitionDuration"
        mode="out-in"
      >
        <router-view/>
      </zoom-center-transition>
    </div>

    <footer
      id="footer-main"
      class="py-5 bg-white">
      <div class="container">
        <div class="row row-grid align-items-center my-md">
          <div class="col-lg-6">
            <h1 class="font-weight-light text-primary mb-2">
              Merci pour votre visite !
            </h1>
            <h2 class="font-weight-light mb-0">
              N'hésitez pas à me contacter via les plateformes suivantes :
            </h2>
          </div>

          <div class="col-lg-6 text-lg-right btn-wrapper">
            <a
              href="mailto:dufourarthur.perso@gmail.com"
              class="btn btn-neutral btn-icon-only btn-mail btn-round btn-lg"
              data-toggle="tooltip"
              data-original-title="Envoyez moi un mail">
              <i class="fas fa-envelope" />
            </a>
            <a
              target="_blank"
              href="https://twitter.com/"
              class="btn btn-neutral btn-icon-only btn-twitter btn-round btn-lg"
              data-toggle="tooltip"
              data-original-title="Suivez-moi">
              <i class="fab fa-twitter" />
            </a>
            <a
              target="_blank"
              href="https://www.linkedin.com/in/arthur-d-145019132/"
              class="btn btn-neutral btn-icon-only btn-linkedin btn-round btn-lg"
              data-toggle="tooltip"
              data-original-title="Contactez-moi">
              <i class="fab fa-linkedin" />
            </a>
            <a
              target="_blank"
              href="https://github.com/Woosy"
              class="btn btn-neutral btn-icon-only btn-github btn-round btn-lg"
              data-toggle="tooltip"
              data-original-title="Mes projets">
              <i class="fab fa-github" />
            </a>
          </div>
        </div>

        <hr>

        <div class="row align-items-center justify-content-md-between">
          <div class="col-md-6">
            <div class="copyright">
              &copy; {{ year }}
              <a
                href="https://www.arthurdufour.com"
                target="_blank">Arthur Dufour</a>.
            </div>
          </div>

          <div class="col-md-6">
            <ul class="nav nav-footer justify-content-end">
              <li class="nav-item">
                <a
                  href="https://choosealicense.com/licenses/mit/"
                  class="nav-link"
                  target="_blank"
                >License MIT</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
<script>
import { BaseNav } from '@/components'
import { ZoomCenterTransition } from 'vue2-transitions'

export default {
  components: {
    BaseNav,
    ZoomCenterTransition
  },
  props: {
    backgroundColor: {
      type: String,
      default: 'black'
    }
  },
  data () {
    return {
      showMenu: false,
      menuTransitionDuration: 250,
      pageTransitionDuration: 200,
      year: new Date().getFullYear(),
      pageClass: 'login-page'
    }
  },
  computed: {
    title () {
      return `${this.$route.name} Page`
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler: function () {
        this.updateBackground()
      }
    }
  },
  beforeDestroy () {
    this.removeBackgroundColor()
  },
  methods: {
    toggleNavbar () {
      document.body.classList.toggle('nav-open')
      this.showMenu = !this.showMenu
    },
    closeMenu () {
      document.body.classList.remove('nav-open')
      this.showMenu = false
    },
    setBackgroundColor () {
      document.body.classList.add('bg-default')
    },
    removeBackgroundColor () {
      document.body.classList.remove('bg-default')
    },
    updateBackground () {
      if (!this.$route.meta.noBodyBackground) {
        this.setBackgroundColor()
      } else {
        this.removeBackgroundColor()
      }
    }
  },
  beforeRouteUpdate (to, from, next) {
    // Close the mobile menu first then transition to next page
    if (this.showMenu) {
      this.closeMenu()
      setTimeout(() => {
        next()
      }, this.menuTransitionDuration)
    } else {
      next()
    }
  }
}
</script>
<style lang="scss">
  $scaleSize: 0.8;
  @keyframes zoomIn8 {
    from {
      opacity: 0;
      transform: scale3d($scaleSize, $scaleSize, $scaleSize);
    }
    100% {
      opacity: 1;
    }
  }

  .main-content .zoomIn {
    animation-name: zoomIn8;
  }

  @keyframes zoomOut8 {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
      transform: scale3d($scaleSize, $scaleSize, $scaleSize);
    }
  }

  .main-content .zoomOut {
    animation-name: zoomOut8;
  }
</style>
