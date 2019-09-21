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
          <h6 class="h2 text-white d-inline-block mb-0">Mon Profil</h6>
          <nav
            aria-label="breadcrumb"
            class="d-none d-md-inline-block ml-md-4">
            <route-bread-crumb/>
          </nav>
        </div>
      </div>
    </base-header>

    <div class="container-fluid mt--6 card-wrapper">
      <div class="row">
        <!-- ======================================= -->
        <!-- == Image de profil -->
        <!-- ======================================= -->
        <div class="col-md-3">
          <card type="frame">
            <h3
              slot="header"
              class="mb-0">Photo de profil</h3>
            <div class="text-center">
              <img
                src="img/theme/default-pp.svg"
                alt="Photo de profil"
                width="150px">
              <br>
              <base-button
                class="mt-4 mb-1 mr-0"
                type="primary"
                size="md"
                @click="modal = true">
                <i class="ni ni-image mr-2"/>Éditer
              </base-button>

              <!-- modal -->
              <modal :show.sync="modal">
                <template slot="header">
                  <h5 class="modal-title">Modifier mon image de profil</h5>
                </template>

                <div>
                  <base-alert type="danger">
                    <strong>Attention !</strong> Cette fonctionnalité n'est pas encore disponible.
                  </base-alert>
                  <p class="my-4">Veuillez importer votre photo ci-dessous :</p>
                  <dropzone-file-upload v-model="fileSingle"/>
                </div>

                <template slot="footer">
                  <base-button
                    type="secondary"
                    size="md"
                    @click="modal = false">Fermer</base-button>
                  <base-button
                    size="md"
                    type="primary">Sauvegarder</base-button>
                </template>
              </modal>

            </div>
          </card>
        </div>

        <!-- ======================================= -->
        <!-- == Informations profil -->
        <!-- ======================================= -->
        <div class="col-md-9">
          <card type="frame">

            <div class="row">
              <div class="col-md-6">
                <base-input
                  :value="user.firstname"
                  label="Prénom"
                  placeholder="Votre prénom"
                  disabled/>
              </div>
              <div class="col-md-6">
                <base-input
                  :value="user.lastname"
                  label="Nom de famille"
                  placeholder="Votre nom de famille"
                  disabled/>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <base-input
                  :value="user.email"
                  label="Adresse mail"
                  placeholder="Votre adresse mail"
                  disabled/>
              </div>
              <div class="col-md-6">
                <base-input
                  :value="user.grade"
                  label="Classe"
                  placeholder="Votre classe"
                  disabled/>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <base-input
                  :value="user.bts ? 'Oui' : 'Non'"
                  class="mb-3"
                  label="Option BTS"
                  disabled/>
              </div>
            </div>
          </card>
        </div>
      </div>

      <div class="row">
        <!-- ============================================= -->
        <!-- == Modification du mot de passe -->
        <!-- ============================================= -->
        <div class="col-md-7">
          <card type="frame">
            <h3
              slot="header"
              class="mb-0">Modifier mon mot de passe</h3>
            <form
              class="needs-validation"
              @submit.prevent="handleSubmit">

              <div class="row">
                <div class="col-md-12">
                  <base-input
                    v-validate="'required|min:6|max:64|contains_one_letter|contains_one_number'"
                    ref="mot de passe"
                    v-model="changePasswordForm.password"
                    :error="getError('mot de passe')"
                    :valid="isValid('mot de passe')"
                    name="mot de passe"
                    class="mb-3"
                    prepend-icon="ni ni-lock-circle-open"
                    placeholder="Nouveau mot de passe"
                    type="password"/>
                </div>
              </div>

              <div class="row">
                <div class="col-md-12">
                  <base-input
                    v-validate="{ required: true, confirmed: 'mot de passe' }"
                    v-model="changePasswordForm.password2"
                    :error="getError('confirmation du mot de passe')"
                    :valid="isValid('confirmation du mot de passe')"
                    name="confirmation du mot de passe"
                    class="mb-3"
                    prepend-icon="ni ni-lock-circle-open"
                    placeholder="Confirmez votre mot de passe"
                    type="password"/>
                </div>
              </div>

              <div class="row mt-1">
                <div class="col-md-6">
                  <base-button
                    :disabled="changing"
                    type="primary"
                    class="w-100"
                    size="md"
                    native-type="submit">
                    Confirmer le changement
                  </base-button>
                </div>

                <div class="col-md-6 my-auto text-center">
                  <password-strength
                    :password="changePasswordForm.password"
                    :size="'18px'"
                    class="w-100"/>
                </div>
              </div>

              <api-errors
                :multiple-errors="changePasswordErrors"
                :alert-classes="'py-3 my-4'"/>

            </form>
          </card>
        </div>

        <!-- ============================================= -->
        <!-- == Autres changements -->
        <!-- ============================================= -->
        <div class="col-md-5">
          <card type="frame">
            <h3
              slot="header"
              class="mb-0">Besoin d'une autre modification ?</h3>
            <div style="min-height: 165px">
              <p>Pour tout autres changements concernant votre profil, n'hésitez pas à contacter le support en cliquant sur le bouton ci-dessous.</p>
              <div class="text-center">
                <router-link
                  to="/support"
                  class="btn btn-info mt-4">
                  <i class="ni ni-send mr-2"/>
                  Contacter le support
                </router-link>
              </div>
            </div>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import swal from 'sweetalert2'
import { mapState } from 'vuex'
import { Modal } from '@/components'
import DropzoneFileUpload from '@/components/Inputs/DropzoneFileUpload'

export default {
  components: {
    Modal,
    DropzoneFileUpload
  },
  data () {
    return {
      modal: false,
      fileSingle: [],
      changePasswordForm: {
        password: '',
        password2: ''
      }
    }
  },
  computed: {
    ...mapState({
      user: state => state.account.user,
      changePasswordErrors: state => state.account.status.changePasswordError,
      changing: state => state.account.status.isChanging
    })
  },
  methods: {
    handleSubmit (e) {
      // vérification validation des champs
      this.$validator.validate().then(valid => {
        if (!valid) return

        swal.fire({
          title: 'Êtes-vous sûr de vouloir changer votre mot de passe ?',
          text: 'Vous serez déconnecté du site !',
          type: 'warning',
          customClass: {
            confirmButton: 'btn btn-warning',
            cancelButton: 'btn btn-secondary'
          },
          buttonsStyling: false,
          showCancelButton: true,
          cancelButtonText: 'Annuler',
          confirmButtonText: 'Oui'
        }).then((result) => {
          if (result.value) {
            this.$store.dispatch('account/changePassword', this.changePasswordForm)
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
