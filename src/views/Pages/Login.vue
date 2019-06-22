<template>
  <div>
    <!-- Header -->
    <div class="header bg-gradient-primary py-1 py-lg-5 pt-lg-8">
      <div class="container">
        <div class="header-body text-center mb-8 mobile-fix">
          <div class="row justify-content-center py-2">
            <div class="col-xl-5 col-lg-6 col-md-8 px-5">
              <h1 class="display-4 text-white">Bienvenue !</h1>
              <p class="text-lead text-white my-4">Connectez vous pour accéder au panneau d'administration.</p>
            </div>
          </div>
        </div>
      </div>
      <div class="separator separator-bottom separator-skew zindex-100">
        <svg
          x="0"
          y="0"
          viewBox="0 0 2560 100"
          preserveAspectRatio="none"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg">
          <polygon
            class="fill-default"
            points="2560 0 2560 100 0 100"/>
        </svg>
      </div>
    </div>
    <!-- Page content -->
    <div class="container mt--9 pb-7">
      <div class="row justify-content-center">
        <div class="col-lg-5 col-md-7">
          <div class="card bg-secondary border-0 mb-0 mobile-fix-2">
            <div class="card-header bg-transparent pb-5">
              <div class="text-muted text-center mt-2 mb-3"><small>Se connecter via</small></div>
              <div class="btn-wrapper text-center">
                <a
                  href="#"
                  class="btn btn-neutral btn-icon"
                  @click="showAlert('Cette fonctionnalité n\'est pas disponible...')">
                  <span class="btn-inner--icon"><img src="img/icons/common/github.svg"></span>
                  <span class="btn-inner--text">Github</span>
                </a>
                <a
                  href="#"
                  class="btn btn-neutral btn-icon"
                  @click="showAlert('Cette fonctionnalité n\'est pas disponible...')">
                  <span class="btn-inner--icon"><img src="img/icons/common/google.svg"></span>
                  <span class="btn-inner--text">Google</span>
                </a>
              </div>
            </div>
            <div class="card-body px-lg-5 py-lg-5">
              <div class="text-center text-muted mb-4">
                <small>Ou avec vos identifiants</small>
              </div>
              <form role="form">
                <base-input
                  v-model="model.email"
                  alternative
                  class="mb-3"
                  prepend-icon="ni ni-email-83"
                  placeholder="Adresse mail"/>

                <base-input
                  v-model="model.password"
                  alternative
                  class="mb-3"
                  prepend-icon="ni ni-lock-circle-open"
                  type="password"
                  placeholder="Mot de passe"/>

                <base-checkbox v-model="model.rememberMe">Se souvenir de moi</base-checkbox>
                <div class="text-center">
                  <base-button
                    type="primary"
                    size="lg"
                    class="my-4">Se connecter</base-button>
                </div>
              </form>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-6">
              <router-link
                to="/dashboard"
                class="text-light"><small>Mot de passe oublié ?</small></router-link>
            </div>
            <div class="col-6 text-right">
              <router-link
                to="/register"
                class="text-light"><small>Créer un compte</small></router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import swal from 'sweetalert2'

export default {
  data () {
    return {
      model: {
        email: '',
        password: '',
        rememberMe: false
      }
    }
  },
  methods: {
    showAlert (title) {
      swal({
        title,
        buttonsStyling: false,
        confirmButtonClass: 'btn btn-success btn-fill'
      })
    }
  }
}
</script>

<style scoped>
@media (max-width: 990px) {
  .mobile-fix {
    margin-top: 6rem !important;
  }

  .mobile-fix-2 {
    margin-top: 1rem !important;
  }
}
</style>
