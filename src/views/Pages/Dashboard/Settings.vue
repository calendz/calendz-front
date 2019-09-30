<template>
  <div>
    <!-- ======================================= -->
    <!-- == "Base header" ====================== -->
    <!-- ======================================= -->
    <base-header
      type="primary"
      class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Dashboard</h6>
          <nav
            aria-label="breadcrumb"
            class="d-none d-md-inline-block ml-md-4">
            <route-bread-crumb/>
          </nav>
        </div>
      </div>
    </base-header>

    <!-- ======================================= -->
    <!-- == Main container ===================== -->
    <!-- ======================================= -->
    <div class="container-fluid mt--6 card-wrapper">
      <div class="card mb-4">

        <div class="container-fluid mt-4">
          <div class="row">

            <!-- ======================================= -->
            <!-- == Menu =============================== -->
            <!-- ======================================= -->
            <div class="col-lg-2 mb-4">
              <ul class="list-group">
                <li
                  :class="active === 1 ? 'bg-primary text-white' : 'bg-white text-primary'"
                  class="list-group-item d-flex justify-content-between align-items-center hover-click"
                  @click="active = 1">
                  Thème
                </li>
                <li
                  :class="active === 2 ? 'bg-primary text-white' : 'bg-white text-primary'"
                  class="list-group-item d-flex justify-content-between align-items-center hover-click"
                  @click="active = 2">
                  Emails
                </li>
              </ul>
            </div>

            <!-- ======================================= -->
            <!-- == Content ============================ -->
            <!-- ======================================= -->
            <div class="col-lg-10">
              <div class="card bg-white shadow">

                <!-- header -->
                <div class="card-header">
                  <div class="row align-items-center">
                    <div class="col">
                      <h3
                        v-show="active === 1"
                        class="m-0">Personnalisez l'interface de Calendz à votre goût.</h3>
                      <h3
                        v-show="active === 2"
                        class="m-0">Définissez vos préférences en matière de communication.</h3>
                    </div>
                  </div>
                </div>

                <!-- ============================== -->
                <!-- == Thème ===================== -->
                <!-- ============================== -->
                <div
                  v-show="active === 1"
                  class="container mt--1 mb-3">

                  <div class="row mt-3">
                    <div class="col-lg-1 col-md-2 my-2 d-flex justify-content-center">
                      <i class="fas fa-moon my-auto"/>
                    </div>

                    <div class="col-lg-9 col-md-8 my-2">
                      <p class="text-justify my-auto">
                        <del>Activer le mode sombre (intégralité du site).</del>
                      </p>
                    </div>

                    <div class="col-m-2 my-2 d-flex justify-content-center my-auto mx-auto">
                      <el-tooltip
                        content="Cette fonctionnalité n'est pas encore disponible !"
                        placement="top">
                        <base-switch
                          :value="false"
                          type="primary"
                          on-text="Oui"
                          off-text="Non"
                          disabled/>
                      </el-tooltip>
                    </div>
                  </div>

                  <hr class="my-2">

                  <div class="row mt-3">
                    <div class="col-lg-1 col-md-2 my-2 d-flex justify-content-center">
                      <i class="fas fa-palette my-auto"/>
                    </div>

                    <div class="col-lg-9 col-md-8 my-2">
                      <p class="text-justify my-auto">
                        <del>Modifier les couleurs de l'emploi du temps.</del>
                      </p>
                    </div>

                    <div class="col-m-2 d-flex justify-content-center my-auto mx-auto">
                      <el-tooltip
                        content="Cette fonctionnalité n'est pas encore disponible !"
                        placement="top">
                        <base-switch
                          :value="false"
                          type="primary"
                          on-text="Oui"
                          off-text="Non"
                          disabled/>
                      </el-tooltip>
                    </div>
                  </div>
                </div>

                <!-- ============================== -->
                <!-- == Préférences mails ========= -->
                <!-- ============================== -->
                <div
                  v-show="active === 2"
                  class="container mt--1 mb-3">

                  <!-- Emails d'informations -->
                  <div class="row mt-3">
                    <div class="col-lg-1 col-md-2 my-2 d-flex justify-content-center">
                      <i class="fas fa-newspaper my-auto"/>
                    </div>

                    <div class="col-lg-9 col-md-8 my-2">
                      <p class="text-justify my-auto">
                        Mails d'informations concernant les nouveautés et autres...
                      </p>
                    </div>

                    <div class="col-m-2 my-2 d-flex justify-content-center my-auto mx-auto">
                      <base-switch
                        :value="user.hasInformationMails || false"
                        type="primary"
                        on-text="Oui"
                        off-text="Non"
                        @input="toggleInformationEmails($event)"/>
                    </div>
                  </div>

                  <hr class="my-2">

                  <!-- Nouvelles notifications -->
                  <div class="row mt-3">
                    <div class="col-lg-1 col-md-2 my-2 d-flex justify-content-center">
                      <i class="fas fa-bell my-auto"/>
                    </div>

                    <div class="col-lg-9 col-md-8 my-2">
                      <p class="text-justify my-auto">
                        Recevoir un mail à chaque nouvelle notification.
                      </p>
                    </div>

                    <div class="col-m-2 d-flex justify-content-center my-auto mx-auto">
                      <el-tooltip
                        content="Cette fonctionnalité n'est pas encore disponible !"
                        placement="top">
                        <base-switch
                          :value="false"
                          type="primary"
                          on-text="Oui"
                          off-text="Non"
                          disabled/>
                      </el-tooltip>
                    </div>
                  </div>

                  <hr class="my-2">

                  <!-- Rappels des devoirs -->
                  <div class="row mt-3">
                    <div class="col-lg-1 col-md-2 my-2 d-flex justify-content-center">
                      <i class="fas fa-history my-auto"/>
                    </div>

                    <div class="col-lg-9 col-md-8 my-2">
                      <p class="text-justify my-auto">
                        <del>Rappel des devoirs à faire (à J-1).</del>
                      </p>
                    </div>

                    <div class="col-m-2 my-2 d-flex justify-content-center my-auto mx-auto">
                      <el-tooltip
                        content="Cette fonctionnalité n'est pas encore disponible !"
                        placement="top">
                        <base-switch
                          :value="false"
                          type="primary"
                          on-text="Oui"
                          off-text="Non"
                          disabled/>
                      </el-tooltip>
                    </div>
                  </div>

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
import { mapState } from 'vuex'

export default {
  name: 'Settings',
  data () {
    return {
      active: 1
    }
  },
  computed: {
    ...mapState({
      user: state => state.account.user
    })
  },
  methods: {
    toggleInformationEmails (element) {
      // disable the switch and re-enable it after 5 seconds
      element.disabled = true
      setTimeout(() => {
        element.disabled = false
      }, 5000)

      this.$store.dispatch('account/setInformationMails', { value: element.checked })
    }
  }
}
</script>
