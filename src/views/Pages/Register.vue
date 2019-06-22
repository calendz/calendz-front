<template>
  <div>
    <!-- Header -->
    <div class="header bg-gradient-primary py-1 py-lg-5 pt-lg-8">
      <div class="container">
        <div class="header-body text-center mb-7 mobile-fix">
          <!-- <div class="row justify-content-center py-2">
            <div class="col-lg-6 col-md-8">
              <h1 class="text-white">Création d'un compte</h1>
              <p class="text-lead text-white my-4">La création d'un compte permet d'accéder au tableau de bord de mes projets. Cet accès est évidement restreint, raison pour laquelle ce dernier sera vide pour les invités.</p>
            </div>
          </div> -->
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
            <div class="card-header bg-transparent pb-5">
              <div class="text-muted text-center mt-2 mb-4"><small>S'inscrire via</small></div>
              <div class="text-center">
                <a
                  href="#"
                  class="btn btn-neutral btn-icon mr-4"
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
                <small>Ou en créant de nouveaux identifiants</small>
              </div>
              <form role="form">
                <base-input
                  v-model="model.name"
                  alternative
                  class="mb-3"
                  prepend-icon="ni ni-hat-3"
                  placeholder="Pseudo"/>

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
                  placeholder="Mot de passe"
                  type="password"/>

                <base-input
                  v-model="model.password2"
                  alternative
                  class="mb-3"
                  prepend-icon="ni ni-lock-circle-open"
                  placeholder="Confirmer le mot de passe"
                  type="password"/>
                <div class="text-muted font-italic"><small>Force du mot de passe : <span class="text-success font-weight-700">fort</span></small></div>
                <div class="row my-4">
                  <div class="col-12">
                    <base-checkbox v-model="model.agree">
                      <span class="text-muted">J'ai lu et j'accepte la <a href="#!">Politique de confidentialité</a></span>
                    </base-checkbox>
                  </div>
                </div>
                <div class="text-center">
                  <button
                    type="button"
                    class="btn btn-primary mt-4">S'inscrire</button>
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
                class="text-light"><small>Vous avez déjà un compte ?</small></router-link>
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
  name: 'Register',
  data () {
    return {
      model: {
        name: '',
        email: '',
        password: '',
        password2: '',
        agree: false
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
    margin-top: 15rem !important;
  }
}
</style>
