<template>
  <div>
    <!-- Header -->
    <div class="header bg-gradient-primary py-1 py-lg-5 pt-lg-8">
      <div class="container">
        <div class="header-body text-center mb-8 mobile-fix">
          <div class="row justify-content-center py-2">
            <div class="col-xl-5 col-lg-6 col-md-8 px-5">
              <h1 class="display-4 text-white">Mot de passe oublié ?</h1>
              <p class="text-lead text-white my-4">Commencez par indiquer l'adresse mail de votre compte, puis nous vous enverrons un lien permettant de réinitialiser votre mot de passe.</p>
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
            <div class="card-header bg-transparent">
              <div class="text-center mt-2">Réinitialisation de votre mot de passe</div>
            </div>
            <div class="card-body px-lg-5 py-lg-5">
              <form
                role="form"
                @submit.prevent="handleSubmit">

                <base-input
                  v-validate="'required|email|email_epsi_wis|min:12|max:64'"
                  v-model="form.email"
                  :error="getError('email')"
                  :valid="isValid('email')"
                  name="email"
                  class="mb-3"
                  prepend-icon="ni ni-email-83"
                  placeholder="Entrez votre adresse mail"/>

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
                    class="my-3">Envoyer l'email de réinitialisation</base-button>
                </div>
              </form>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-6">
              <router-link
                to="/login"
                class="text-light"><small>Retour à la connexion</small></router-link>
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
import axios from 'axios'

export default {
  data () {
    return {
      apiError: '',
      form: {
        email: ''
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

        // request sur l'api
        axios.post('/auth/password-reset/send-mail', this.form).then((res) => {
          this.$notify({ type: 'success', message: 'Le mail a bien été envoyé, veuillez vérifiez vos mails.' })
          this.$router.push('/login')
        // on catch les erreurs
        }).catch((err) => {
          this.apiError = `<strong>Erreur !</strong> ${err.response.data.message}.`
          e.target.disabled = false
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
@media (max-width: 990px) {
  .mobile-fix {
    margin-top: 6rem !important;
  }

  .mobile-fix-2 {
    margin-top: 1rem !important;
  }
}
</style>
