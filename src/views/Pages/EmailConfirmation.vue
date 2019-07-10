<template>
  <div>
    <!-- Header -->
    <div class="header bg-gradient-primary py-1 py-lg-5 pt-lg-10">
      <div class="container">
        <div class="header-body text-center mb-7 mobile-fix"/>
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
                <div class="lds-ellipsis"><div/><div/><div/><div/></div>
              </div>

              <div
                v-show="!isLoading"
                class="text-center">
                <div v-show="apiError">
                  <base-alert type="danger">
                    <span class="alert-inner--icon"><i class="ni ni-like-2"/></span>
                    <span class="alert-inner--text"><strong> Erreur !</strong> {{ apiError }}.</span>
                  </base-alert>
                </div>

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

    axios.post(`${this.$apiUrl}/auth/verify/email`, { token }).then((res) => {
      console.log(res)
      this.isLoading = false
    }).catch((err) => {
      this.apiError = err.response.data.message
      console.error(err)
      this.isLoading = false
    })
  },
  methods: {
  }
}
</script>

<style scoped>
.lds-ellipsis {
  display: inline-block;
  position: relative;
  width: 64px;
  height: 64px;
}
.lds-ellipsis div {
  position: absolute;
  top: 27px;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: #000;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.lds-ellipsis div:nth-child(1) {
  left: 6px;
  animation: lds-ellipsis1 0.6s infinite;
}
.lds-ellipsis div:nth-child(2) {
  left: 6px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(3) {
  left: 26px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(4) {
  left: 45px;
  animation: lds-ellipsis3 0.6s infinite;
}
@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(19px, 0);
  }
}

@media (min-width: 990px) {
  .pt-lg-10 {
    padding-top: 15rem !important;
  }
}

@media (max-width: 990px) {
  .mobile-fix {
    margin-top: 20rem !important;
  }

  .mobile-fix-2 {
    margin-top: 1rem !important;
  }
}
</style>
