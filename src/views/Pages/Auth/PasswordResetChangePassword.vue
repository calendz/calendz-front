<template>
  <div>
    <!-- Header -->
    <div class="header bg-gradient-primary py-1 py-lg-5 pt-lg-8">
      <div class="container">
        <div class="header-body text-center mb-8 mobile-fix">
          <div class="row justify-content-center py-2">
            <div class="col-xl-5 col-lg-6 col-md-8 px-5">
              <h1 class="display-4 text-white">Réinitialisation de votre mot de passe</h1>
              <p class="text-lead text-white my-4">Vous pouvez désormais indiquer votre nouveau mot de passe.</p>
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
              <div class="text-center mt-2">Nouveau mot de passe</div>
            </div>
            <div class="card-body px-lg-5 py-lg-5">
              <form
                role="form"
                @submit.prevent="handleSubmit">

                <base-input
                  v-validate="'required|min:6|max:64|contains_one_letter|contains_one_number'"
                  ref="mot de passe"
                  v-model="resetForm.password"
                  :error="getError('mot de passe')"
                  :valid="isValid('mot de passe')"
                  name="mot de passe"
                  class="mb-3"
                  prepend-icon="ni ni-lock-circle-open"
                  placeholder="Mot de passe"
                  type="password"/>

                <base-input
                  v-validate="{ required: true, confirmed: 'mot de passe' }"
                  v-model="resetForm.password2"
                  :error="getError('confirmation du mot de passe')"
                  :valid="isValid('confirmation du mot de passe')"
                  name="confirmation du mot de passe"
                  class="mb-3"
                  prepend-icon="ni ni-lock-circle-open"
                  placeholder="Confirmer le mot de passe"
                  type="password"/>

                <password-strength :password="resetForm.password"/>

                <api-errors
                  :multiple-errors="apiErrors"
                  :alert-classes="'py-3 my-4'"/>

                <div class="text-center">
                  <base-button
                    type="primary"
                    native-type="submit"
                    size="lg"
                    class="my-3">Enregistrer le nouveau mot de passe</base-button>
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
import ApiService from '../../../services/api.service'

export default {
  data () {
    return {
      apiErrors: [],
      resetForm: {
        token: this.$route.params.token,
        password: '',
        password2: ''
      }
    }
  },
  methods: {
    handleSubmit (e) {
      // disable le bouton login
      e.target.disabled = true
      this.apiErrors = []

      this.$validator.validate().then(valid => {
        if (!valid) {
          e.target.disabled = false
          return
        }

        // request sur l'api
        ApiService.post('/user/password-reset', this.resetForm).then((res) => {
          this.$notify({ type: 'success', message: 'Votre mot de passe a bien été mis à jour.' })
          this.$router.push('/login')
        // on catch les erreurs
        }).catch((err) => {
          e.target.disabled = false
          if (err.response.data.errors) {
            this.apiErrors = err.response.data.errors
          } else {
            this.apiErrors.push(err.response.data.message)
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
@media (max-width: 990px) {
  .mobile-fix {
    margin-top: 6rem !important;
  }

  .mobile-fix-2 {
    margin-top: 1rem !important;
  }
}
</style>
