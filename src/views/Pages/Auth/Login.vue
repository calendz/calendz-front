<template>
  <div>
    <!-- Header -->
    <div class="header bg-purple py-7 py-lg-8 pt-lg-9">
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
                  v-validate="'required|email|email_valid_school|min:12|max:64'"
                  v-model="loginForm.email"
                  :error="getError('email')"
                  :valid="isValid('email')"
                  name="email"
                  class="mb-3"
                  prepend-icon="ni ni-email-83"
                  type="email"
                  placeholder="Adresse mail"
                  autocapitalize="none"/>

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

                <api-errors
                  :single-error="loginError"
                  :alert-classes="'mt-4 py-3 mb-1'"/>

                <div
                  v-if="userId"
                  class="mt-3 text-center">
                  <p
                    class="m-0 nav-link font-weight-light"
                    @click="resendEmail()">
                    Vous n'avez pas reçu l'email ?<br>
                    Cliquez ici pour le ré-envoyer.
                  </p>
                </div>

                <div class="text-center">
                  <base-button
                    :disabled="loggingIn"
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
import { mapState } from 'vuex'
import ApiService from '../../../services/api.service'

export default {
  data () {
    return {
      loginForm: {
        email: '',
        password: '',
        rememberMe: false
      }
    }
  },
  computed: {
    ...mapState({
      loginError: state => state.account.status.loginError,
      loggingIn: state => state.account.status.isLoggingIn,
      userId: state => state.account.status.userId
    })
  },
  methods: {
    handleSubmit (e) {
      this.$validator.validate().then(valid => {
        // login form + redirect (if provided)
        const data = { ...this.loginForm }
        if (this.$route.query.redirect) data.redirect = this.$route.query.redirect

        if (valid) this.$store.dispatch('account/login', data)
      })
    },
    resendEmail () {
      if (!this.userId) return
      ApiService.post(`/auth/verify/email/resend/${this.userId}`)
        .then(res => {
          if (res.status === 200) {
            this.$notify({ type: 'success', message: `Un email de confirmation d'inscription vient d'être ré-envoyé !` })
          }
        })
        .catch(err => {
          this.$notify({ type: 'danger', message: `<b>Erreur !</b> ${err.data.message || err} !` })
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
