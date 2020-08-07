<template>
  <card
    :show-footer-line="true"
    class="card-stats">
    <div class="row">

      <div class="col">
        <slot>
          <h5 class="card-title text-uppercase text-muted mb-1">DÉCONNECTER LES UTILISATEURS</h5>
          <div class="row mt-2 mb--3">
            <div class="col-12 pr-0">
              <base-button
                type="primary"
                size="sm"
                class="mb-2"
                @click="disconnectAllUsers()">
                Lancer déconnexion
              </base-button>
            </div>
          </div>
        </slot>
      </div>

      <div class="col-auto">
        <slot name="icon">
          <div class="bg-warning icon icon-shape text-white rounded-circle shadow">
            <i class="fas fa-sign-in-alt"/>
          </div>
        </slot>
      </div>
    </div>

    <p class="mt-3 mb-0 text-sm">
      <slot name="footer">
        <span class="text-danger">
          <i class="fas fa-trash-alt mr-1"/>
          Supprime
        </span> tous les refresh-tokens
      </slot>
    </p>
  </card>
</template>

<script>
import swal from 'sweetalert2'
import Card from '@/components/Cards/Card.vue'

export default {
  components: {
    Card
  },
  methods: {
    disconnectAllUsers () {
      swal.fire({
        icon: 'warning',
        title: 'Êtes vous sûr ?',
        text: 'Tous les utilisateurs devront se reconnecter avec leur mot de passe.',
        customClass: {
          confirmButton: 'btn btn-warning',
          cancelButton: 'btn btn-secondary'
        },
        buttonsStyling: false,
        showCancelButton: true,
        cancelButtonText: 'Annuler',
        confirmButtonText: 'Oui !'
      }).then((result) => {
        if (result.value) {
          this.$store.dispatch('sysconf/disconnectAllUsers')
          swal.fire({
            icon: 'success',
            title: 'Les utilisateurs ont bien déconnectés',
            text: 'Vous allez désormais être déconnecté à votre tour.',
            customClass: {
              confirmButton: 'btn btn-primary'
            }
          }).then(() => {
            this.$store.dispatch('account/logout', {})
          })
        }
      })
    }
  }
}
</script>
