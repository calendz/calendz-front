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
          <h6 class="h2 text-white d-inline-block mb-0">Paramètres</h6>
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
                <li
                  :class="active === 3 ? 'bg-primary text-white' : 'bg-white text-primary'"
                  class="list-group-item d-flex justify-content-between align-items-center hover-click"
                  @click="active = 3">
                  Export
                </li>
              </ul>
              <base-button
                size="md"
                type="danger"
                class="mt-4 w-100"
                @click="deleteAccount">
                <i class="fas fa-trash-alt text-white mr-1"/>
                Supprimer le compte
              </base-button>
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
                      <h3
                        v-show="active === 3"
                        class="m-0">Exportez votre calendrier.</h3>
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
                      <i class="fas fa-door-open my-auto"/>
                    </div>

                    <div class="col-lg-8 col-md-8 my-2">
                      <p class="text-justify my-auto">
                        Page par défaut
                        <span style="color: #adb5bd">(page sur laquelle vous arrivez après vous être connecté).</span>
                      </p>
                    </div>

                    <div class="col-lg-3 my-2 d-flex justify-content-center my-auto mx-auto">
                      <el-select
                        v-model="select.target"
                        class="select-danger w-100"
                        @change="handleDefaultPageChange(select.target)">
                        <el-option
                          v-for="(option, index) in select.options"
                          :value="option.value"
                          :label="option.label"
                          :key="index"
                          class="select-danger"/>
                      </el-select>
                    </div>
                  </div>

                  <hr class="my-2">

                  <div class="row mt-3">
                    <div class="col-lg-1 col-md-2 my-2 d-flex justify-content-center">
                      <i class="fas fa-palette my-auto"/>
                    </div>

                    <div class="col-lg-8 col-md-8 my-2">
                      <p class="text-justify my-auto">Modifier la couleur principale de l'emploi du temps.</p>
                    </div>

                    <div class="col-lg-3 my-2 d-flex justify-content-center my-auto">
                      <input
                        v-model="colorInput"
                        type="color"
                        class="col-8 form-control p-1"
                        @change="handleCalendarColorChange($event)">
                      <base-button
                        outline
                        type="primary"
                        class="col-3 ml-3"
                        @click="handleCalendarColorReset()">
                        <i class="fas fa-undo"/>
                      </base-button>
                    </div>
                  </div>

                  <hr class="my-2">

                  <div class="row mt-3">
                    <div class="col-lg-1 col-md-2 my-2 d-flex justify-content-center">
                      <i class="fas fa-moon my-auto"/>
                    </div>

                    <div class="col-lg-8 col-md-8 my-2">
                      <p class="text-justify my-auto">
                        <del>Activer le mode sombre (intégralité du site).</del>
                      </p>
                    </div>

                    <div class="col-lg-3 my-2 d-flex justify-content-center my-auto mx-auto">
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

                  <!-- Mail nouvelle tâche -->
                  <div class="row mt-3">
                    <div class="col-lg-1 col-md-2 my-2 d-flex justify-content-center">
                      <i class="fas fa-tasks my-auto"/>
                    </div>

                    <div class="col-lg-9 col-md-8 my-2">
                      <p class="text-justify my-auto">
                        Recevoir un mail lorsqu'une tâche me concernant est ajoutée.
                      </p>
                    </div>

                    <div class="col-m-2 my-2 d-flex justify-content-center my-auto mx-auto">
                      <base-switch
                        :value="user.settings.mail.taskCreate || false"
                        type="primary"
                        on-text="Oui"
                        off-text="Non"
                        @input="toggleMailTaskCreate($event)"/>
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
                        <del>Recevoir un mail à chaque nouvelle notification.</del>
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

                <!-- ============================== -->
                <!-- == Export calendrier ========= -->
                <!-- ============================== -->

                <div
                  v-show="active === 3"
                  class="container mt--1 mb-3">
                  <div class="row mt-3">
                    <div class="col-lg-12 col-md-12 my-12">
                      <base-input
                        :disabled="true"
                        :value="calendarUrl" />
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
import swal from 'sweetalert2'
import { mapState } from 'vuex'
import { Select, Option } from 'element-ui'

export default {
  name: 'Settings',
  components: {
    [Select.name]: Select,
    [Option.name]: Option
  },
  data () {
    return {
      active: 1,
      select: {
        target: localStorage.getItem('calendz.settings.defaultPage') || '/dashboard',
        options: [
          {
            label: 'Dashboard',
            value: '/dashboard'
          },
          {
            label: 'Calendrier',
            value: '/calendar'
          }
        ]
      },
      colorInput: '#172b4d'
    }
  },
  computed: {
    ...mapState({
      user: state => state.account.user
    }),
    calendarUrl () {
      const firstname = this.user.email.split('@')[0].split('.')[0]
      const lastname = this.user.email.split('@')[0].split('.')[1]

      return `${process.env.VUE_APP_API_CALENDAR_URL}/month?firstname=${firstname}&lastname=${lastname}&format=icalendar`
    }
  },
  mounted () {
    this.colorInput = this.$store.getters['account/user'] ? '#' + this.$store.getters['account/user'].settings.calendarColor : '#172b4d'
  },
  methods: {
    toggleInformationEmails (element) {
      element.disabled = true
      setTimeout(() => {
        element.disabled = false
      }, 2500)

      this.$store.dispatch('account/setInformationMails', { value: element.checked })
    },
    toggleMailTaskCreate (element) {
      element.disabled = true
      setTimeout(() => {
        element.disabled = false
      }, 2500)

      this.$store.dispatch('account/setMailTaskCreate', { value: element.checked })
    },
    handleDefaultPageChange (newPage) {
      localStorage.setItem('calendz.settings.defaultPage', newPage)
    },
    handleCalendarColorChange (event) {
      this.$store.dispatch('account/changeCalendarColor', { value: event.target.value.substr(1) })
    },
    handleCalendarColorReset () {
      this.colorInput = '#172b4d'
      this.$store.dispatch('account/changeCalendarColor', { value: '172b4d' })
    },
    deleteAccount () {
      swal.fire({
        icon: 'warning',
        title: `Êtes-vous sûr de vouloir supprimer votre compte ?`,
        text: 'Vous pourrez toujours vous réinscrire plus tard, mais toutes vos données seront perdues...',
        customClass: {
          confirmButton: 'btn btn-warning mt-2',
          cancelButton: 'btn btn-secondary mt-2'
        },
        buttonsStyling: false,
        showCancelButton: true,
        cancelButtonText: 'Annuler',
        confirmButtonText: 'Confimer'
      }).then((result) => {
        if (result.value) this.$store.dispatch('account/deleteSelf')
      })
    }
  }
}
</script>
