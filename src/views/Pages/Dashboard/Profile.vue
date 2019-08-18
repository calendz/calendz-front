<template>
  <div style="margin-left:15px; margin-top:15px">
    <h1>Mon Profil</h1>
    <div
      class="row"
      style="margin:15px">
      <div class="col-md-4">
        <card type="frame">
          <div style="text-align:center">
            <h3>Image de Profil</h3>
            <img
              src="img/theme/default-pp.svg"
              width="180px"
              style="margin-top:10px">
            <br>
            <base-button
              type="primary"
              style="margin-top:20px"
              size="lg"
              @click="modal0 = true">
              <i class="ni ni-image"/>Editer
            </base-button>
            <modal :show.sync="modal0">
              <template slot="header">
                <h5
                  id="exampleModalLabel"
                  class="modal-title">Modifier mon image de profil</h5>
              </template>
              <div>
                <h5><i style="color:#fb6340">Cette fonctionnalité n'est pas encore disponible</i></h5>
                <br>
                Veuillez importer votre photo ci-dessous :
                <dropzone-file-upload
                  v-model="fileSingle"
                  style="margin-top:10px"/>

              </div>
              <template slot="footer">
                <base-button
                  type="secondary"
                  @click="modal0 = false">Fermer</base-button>
                <base-button type="primary">Sauvegarder</base-button>
              </template>
            </modal>
          </div>
        </card>
      </div>
      <div class="col-md-8">
        <div>
          <card type="frame">
            <div>
              <div class="row">
                <div class="col-md-6">
                  <base-input
                    :value="user.lastname"
                    placeholder="Votre Nom"
                    label="Nom"
                    disabled/>
                </div>
                <div class="col-md-6">
                  <base-input
                    :value="user.firstname"
                    placeholder="Votre Prénom"
                    label="Prénom"
                    disabled/>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <base-input
                    :value="user.email"
                    placeholder="Votre Email"
                    label="Email"
                    disabled/>
                </div>
                <div class="col-md-6">
                  <base-input
                    :value="user.grade"
                    placeholder="Votre Classe"
                    label="Classe"
                    disabled/>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <base-input
                    :value="displayBts(user.bts)"
                    label="Option BTS"
                    disabled/>
                </div>
              </div>
            </div>
          </card>
        </div>
      </div>
    </div>
    <div
      class="row"
      style="margin:15px">
      <div class="col-md-8">
        <div>
          <card type="frame">
            <div>
              <h3 style="text-align:center">Modifier mon Mot de Passe</h3>
              <form
                class="needs-validation"
                @submit.prevent="handleSubmit">
                <div
                  class="row"
                  style="margin-top:20px">
                  <div class="col-md-6">
                    <base-input
                      v-validate="'required|min:6|max:64|contains_one_letter|contains_one_number'"
                      ref="mot de passe"
                      v-model="registerForm.password"
                      :error="getError('mot de passe')"
                      :valid="isValid('mot de passe')"
                      name="mot de passe"
                      class="mb-3"
                      prepend-icon="ni ni-lock-circle-open"
                      placeholder="Nouveau Mot de passe"
                      type="password"/>
                  </div>
                  <div
                    class="col-md-6"
                    style="margin-top:10px">
                    <password-strength :password="registerForm.password"/>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
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
                  </div>
                  <div class="col-md-6">
                    <h5 style="color:#fb6340">Attention : Un changement de mot de passe vous obligera à vous reconnecter au site</h5>
                  </div>
                </div>

                <api-errors
                  :multiple-errors="apiErrors"
                  :alert-classes="'py-3 my-4'"/>

                <base-button
                  type="primary"
                  style="margin-top:20px"
                  size="lg"
                  native-type="submit">
                  Sauvegarder mes changements
                </base-button>
              </form>
            </div>
          </card>
        </div>
      </div>
      <div class="col-md-4">
        <card type="frame">
          <div style="text-align:center">
            <h3>Autre Changement ?</h3>
            <br>
            <h4>Pour tout changement concernant le Nom, Prénom, Email ou Classe, veuillez contacter le support ci-dessous :</h4>
            <base-button
              type="info"
              style="margin-top:20px">
              <i class="ni ni-send"/>Support
            </base-button>
          </div>
        </card>
      </div>
    </div>
  </div>
</template>
<script>
import swal from 'sweetalert2'
import { mapState } from 'vuex'
import { Modal } from '@/components'
import DropzoneFileUpload from '@/components/Inputs/DropzoneFileUpload'
import axios from 'axios'

export default {
  components: {
    Modal,
    DropzoneFileUpload
  },
  data () {
    return {
      apiErrors: [],
      triedSubmit: false,
      modal0: false,
      fileSingle: [],
      registerForm: {
        password: '',
        password2: ''
      }
    }
  },
  computed: {
    ...mapState({
      user: state => state.account.user,
      registerErrors: state => state.account.status.reason,
      registering: state => state.account.status.isRegistering
    })
  },
  methods: {
    handleSubmit (e) {
      this.apiErrors = []

      // vérification validation des champs
      this.$validator.validate().then(valid => {
        if (valid) {
          swal.fire({
            title: 'Êtes vous sûr de bien vouloir changer votre mot de passe ?',
            text: 'Vous serez déconnecté du site !',
            type: 'info',
            customClass: {
              confirmButton: 'btn btn-primary',
              cancelButton: 'btn btn-secondary'
            },
            buttonsStyling: false,
            showCancelButton: true,
            cancelButtonText: 'Annuler',
            confirmButtonText: 'Oui !'
          }).then((result) => {
            if (result.value) {
              // disable le bouton login
              e.target.disabled = true
              // envoie de la requête de modification du mot de passe
              axios.patch('/user/password', this.registerForm).then((res) => {
                this.$notify({ type: 'success', message: 'Votre mot de passe a bien été mis à jour.' })
                this.$store.dispatch('account/logout', {})
                this.$router.push('/login')
                swal.fire({
                  title: 'Votre mot de passe à bien été modifié. Vous avez été déconnecté',
                  type: 'success',
                  customClass: {
                    confirmButton: 'btn btn-primary'
                  }
                })
                // on catch les erreurs
              }).catch((err) => {
                e.target.disabled = false
                if (err.response.data.errors) {
                  this.apiErrors = err.response.data.errors
                } else {
                  this.apiErrors.push(err.response.data.message)
                }
              })
            }
          })
        } else {
          this.triedSubmit = true
        }
      })
    },
    displayBts (bts) {
      if (bts) {
        return 'Oui'
      } else {
        return 'Non'
      }
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
