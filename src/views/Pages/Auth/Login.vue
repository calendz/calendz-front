<template>
  <div>
    <!-- Header -->
    <div class="header bg-gradient-primary py-7 py-lg-8 pt-lg-9">
      <div class="container">
        <div class="header-body text-center mb-5">
          <div class="row justify-content-center">
            <div class="col-xl-5 col-lg-6 col-md-8 px-5">
              <h1 class="text-white">Bienvenue !</h1>
              <p class="text-lead text-white">Connectez vous pour accéder au panneau d'administration.</p>
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
    <div class="container mt--8 pb-5">
      <div class="row justify-content-center">
        <div class="col-lg-5 col-md-7">
          <div class="card bg-secondary border-0 mb-0">
            <div class="card-header bg-transparent">
              <div class="text-center mt-2 mb-2">Connectez vous à votre compte</div>
            </div>
            <div class="card-body px-lg-5 py-lg-5">
              <form
                role="form"
                @submit.prevent="handleSubmit">
                <base-input
                  v-validate="'required|email|email_epsi_wis|min:12|max:64'"
                  v-model="loginForm.email"
                  :error="getError('email')"
                  :valid="isValid('email')"
                  name="email"
                  class="mb-3"
                  prepend-icon="ni ni-email-83"
                  placeholder="Adresse mail"/>

                <base-input
                  v-validate="'required|min:6|max:64'"
                  v-model="loginForm.password"
                  :error="getError('mot de passe')"
                  :valid="isValid('mot de passe')"
                  name="mot de passe"
                  class="mb-3"
                  prepend-icon="ni ni-lock-circle-open"
                  type="password"
                  placeholder="Mot de passe"/>

                <base-checkbox v-model="loginForm.rememberMe">Se souvenir de moi</base-checkbox>

                <base-alert
                  v-show="apiError"
                  type="danger"
                  class="mt-4 py-2 mb-1">
                  <span v-html="apiError"/>
                </base-alert>

                <div class="text-center">
                  <base-button
                    type="primary"
                    native-type="submit"
                    size="lg"
                    class="my-4">Se connecter</base-button>
                </div>
              </form>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-6">
              <router-link
                to="/password-reset"
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
// import axios from 'axios'
import swal from 'sweetalert2'
import { UserService } from '../../../services/user.service'

export default {
  data () {
    return {
      tries: 0,
      apiError: '',
      loginForm: {
        email: '',
        password: '',
        rememberMe: false
      }
    }
  },
  methods: {
    handleSubmit (e) {
      // disable le bouton login
      e.target.disabled = true
      this.apiError = ''

      this.$validator.validate().then(valid => {
        if (!valid) {
          e.target.disabled = false
          return
        }

        UserService.login(this.loginForm).then(() => {
          this.$notify({ type: 'success', message: 'Vous êtes désormais connecté.' })
          this.$router.push('/dashboard')
        }).catch((err) => {
          this.apiError = `<strong>Erreur !</strong> ${err.response.data.message || err.message}.`
          e.target.disabled = false

          this.tries++
          if (this.tries >= 3) {
            swal({
              type: 'question',
              title: `Mot de passe oublié ?`,
              text: `Pas de panique, indiquez votre adresse mail et nous vous enverrons un lien afin de réinitialiser votre mot de passe.`,
              buttonsStyling: false,
              focusConfirm: true,
              confirmButtonText: 'Réinitialiser',
              confirmButtonClass: 'btn btn-success btn-fill',
              showCancelButton: true,
              cancelButtonText: 'Annuler',
              cancelButtonClass: 'btn btn-secondary btn-fill'
            }).then((result) => {
              if (result.value) this.$router.push('/password-reset')
            })
          }
        })
      })
    },
    getError (name) {
      return this.errors.first(name)
    },
    isValid (name) {
      return this.validated && !this.errors.has(name)
    }
  }
}
</script>

<style scoped>
</style>
