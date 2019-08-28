<template>
  <div>
    <!-- Header -->
    <div class="header bg-gradient-primary py-1 py-lg-5 pt-lg-8">
      <div class="container">
        <div class="header-body text-center mb-8 mobile-fix">
          <div class="row justify-content-center py-2">
            <div class="col-xl-5 col-lg-6 col-md-8 px-5">
              <h1 class="display-4 text-white">Nous vérifions actuellement votre adresse mail</h1>
              <p class="text-lead text-white my-4">Vérification en cours, merci de patienter.</p>
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
              <div class="text-center mt-2">Vérification de votre adresse mail</div>
            </div>
            <div class="card-body px-lg-5 py-lg-5">
              <div
                v-show="isLoading"
                class="text-center">
                <h2 class="text-default">Vérification en cours</h2>
                <ClipLoader
                  :loading="isLoading"
                  :size="40"
                  class="mt-3"
                  size-unit="px"
                />
              </div>

              <div
                v-show="!isLoading"
                class="text-center">

                <api-errors :single-error="apiError"/>

                <div v-show="!apiError">
                  <base-alert type="success">
                    <span class="alert-inner--icon"><i class="ni ni-like-2"/></span>
                    <span class="alert-inner--text"><strong> Succès !</strong> Votre mail a bien été validé.</span>
                  </base-alert>

                  <router-link
                    to="/login"
                    class="btn btn-primary btn-icon btn-lg mt-4">
                    <span class="btn-inner--icon">
                      <i class="fas fa-sign-in-alt mr-2"/>
                    </span>
                    <span class="nav-link-inner--text">Se connecter</span>
                  </router-link>
                </div>
              </div>
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
      isLoading: true,
      apiError: ''
    }
  },
  mounted () {
    const token = this.$route.params.token

    axios.post('auth/verify/email', { token }).then((res) => {
      this.isLoading = false
    }).catch((err) => {
      this.apiError = err.response.data.message
      this.isLoading = false
    })
  },
  methods: {
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
