<template>
  <div>
    <!-- Header -->
    <div class="header bg-purple py-7 py-lg-8 pt-lg-9">
      <div class="container">
        <div class="header-body text-center mb-5">
          <div class="row justify-content-center">
            <div class="col-xl-5 col-lg-6 col-md-8 px-5">
              <h1 class="text-white">Création d'un compte</h1>
              <p class="text-lead text-white">Inscrivez-vous avec l'adresse mail de votre école afin d'accéder à votre tableau de bord.</p>
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
      <!-- Table -->
      <div class="row justify-content-center">
        <div class="col-lg-6 col-md-8">
          <div class="card bg-secondary border-0">
            <div class="card-header bg-transparent">
              <div class="text-center mt-2 mb-2">Création d'un compte</div>
            </div>
            <div class="card-body px-lg-5 py-lg-5">
              <form
                class="needs-validation"
                @submit.prevent="handleSubmit">

                <base-input
                  v-validate="'required|min:3|max:32'"
                  v-model="registerForm.firstname"
                  :error="getError('prénom')"
                  :valid="isValid('prénom')"
                  name="prénom"
                  class="mb-3"
                  prepend-icon="ni ni-single-02"
                  placeholder="Prénom"/>

                <base-input
                  v-validate="'required|min:3|max:32'"
                  v-model="registerForm.lastname"
                  :error="getError('nom')"
                  :valid="isValid('nom')"
                  name="nom"
                  class="mb-3"
                  prepend-icon="ni ni-single-02"
                  placeholder="Nom"/>

                <base-input
                  :error="getError('classe')"
                  :valid="isValid('classe')"
                  class="mb-3"
                  prepend-icon="ni ni-hat-3"
                >
                  <select
                    v-validate="'required|valid_grade'"
                    v-model="registerForm.grade"
                    name="classe"
                    class="form-control">
                    <option
                      value=""
                      hidden>Séléctionnez votre classe</option>
                    <option>B1</option>
                    <option>B2</option>
                    <option>B3</option>
                    <option>I1</option>
                    <option>I2</option>
                  </select>
                </base-input>

                <GroupsSelect
                  v-model="registerForm.group"
                  :disabled="false"
                  :legacy="true"/>

                <base-input
                  :error="getError('ville')"
                  :valid="isValid('ville')"
                  class="mb-3"
                  prepend-icon="ni ni-hat-3"
                >
                  <select
                    v-validate="'required|valid_city'"
                    v-model="registerForm.city"
                    name="ville"
                    class="form-control">
                    <option
                      value=""
                      hidden>Séléctionnez votre ville</option>
                    <option>Arras</option>
                    <option>Auxerre</option>
                    <option>Bordeaux</option>
                    <option>Brest</option>
                    <option>Grenoble</option>
                    <option>Lille</option>
                    <option>Lyon</option>
                    <option>Montpellier</option>
                    <option>Nantes</option>
                    <option>Paris</option>
                    <option>Dakar</option>
                  </select>
                </base-input>

                <base-input
                  v-validate="'required|email|email_epsi_wis|min:12|max:64'"
                  v-model="registerForm.email"
                  :error="getError('email')"
                  :valid="isValid('email')"
                  name="email"
                  class="mb-3"
                  prepend-icon="ni ni-email-83"
                  placeholder="Adresse mail"/>

                <base-input
                  v-validate="'required|min:6|max:64|contains_one_letter|contains_one_number'"
                  ref="mot de passe"
                  v-model="registerForm.password"
                  :error="getError('mot de passe')"
                  :valid="isValid('mot de passe')"
                  name="mot de passe"
                  class="mb-3"
                  prepend-icon="ni ni-lock-circle-open"
                  placeholder="Mot de passe"
                  type="password"/>

                <base-input
                  v-validate="{ required: true, confirmed: 'mot de passe' }"
                  v-model="registerForm.password2"
                  :error="getError('confirmation du mot de passe')"
                  :valid="isValid('confirmation du mot de passe')"
                  name="confirmation du mot de passe"
                  class="mb-3"
                  prepend-icon="ni ni-lock-circle-open"
                  placeholder="Confirmer le mot de passe"
                  type="password"/>

                <password-strength :password="registerForm.password"/>

                <div class="row my-4">
                  <div class="col-12">
                    <base-checkbox v-model="registerForm.agree">
                      <span class="text-muted">J'ai lu et j'accepte la <a href="#!">Politique de confidentialité</a></span>
                    </base-checkbox>
                    <div
                      v-show="!registerForm.agree && triedSubmit"
                      class="invalid-feedback"
                      style="display: block;">
                      Vous devez accepter les conditions d'utilisation.
                    </div>
                  </div>
                </div>

                <api-errors
                  :multiple-errors="registerErrors"
                  :alert-classes="'py-2 mb-1'"
                  dismissible/>

                <div class="text-center">
                  <base-button
                    :disabled="registering"
                    type="primary"
                    native-type="submit"
                    size="lg"
                    class="mt-4">S'inscrire</base-button>
                </div>
              </form>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-6">
              <router-link
                to="/home"
                class="text-light"><small>Retour à l'accueil</small></router-link>
            </div>
            <div class="col-6 text-right">
              <router-link
                to="/login"
                class="text-light"><small>Vous êtes déjà inscrit ?</small></router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import swal from 'sweetalert2'
import { mapState } from 'vuex'
import GroupsSelect from '@/components/Inputs/custom/GroupsSelect'

export default {
  components: {
    GroupsSelect
  },
  data () {
    return {
      triedSubmit: false,
      registerForm: {
        firstname: '',
        lastname: '',
        grade: '',
        group: '',
        city: '',
        email: '',
        password: '',
        password2: '',
        agree: false
      }
    }
  },
  computed: {
    ...mapState({
      registerErrors: state => state.account.status.registerErrors,
      registering: state => state.account.status.isRegistering
    })
  },
  methods: {
    handleSubmit (e) {
      // vérification validation des champs
      this.$validator.validate().then(valid => {
        if (!this.registerForm.agree) {
          this.triedSubmit = true
        } else if (valid) {
          // envoie de la requête inscription
          this.$store.dispatch('account/register', this.registerForm)
        }
      })
    },
    showAlert (title) {
      swal({
        title,
        buttonsStyling: false,
        confirmButtonClass: 'btn btn-success btn-fill'
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
