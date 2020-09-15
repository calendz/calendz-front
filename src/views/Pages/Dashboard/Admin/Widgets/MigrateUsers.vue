<template>
  <card
    :show-footer-line="true"
    class="card-stats">
    <div class="row">

      <div class="col">
        <slot>
          <h5 class="card-title text-uppercase text-muted mb-1">DÉMARRER MIGRATION</h5>
          <div class="row mt-2 mb--3">
            <div class="col-12 pr-0">
              <base-button
                type="primary"
                size="sm"
                class="mb-2"
                @click="migrateAllUsers()">
                Lancer migration
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
          <i class="fas fa-exclamation-circle mr-1"/>
          Migre
        </span> tous les comptes utilisateurs
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
    migrateAllUsers () {
      swal.fire({
        icon: 'warning',
        title: 'Êtes vous sûr ?',
        text: 'Tous les comptes seront désactivés et nécessiteront une mise-à-jour, et toutes les tâches seront supprimées.',
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
          this.$store.dispatch('sysconf/migrateAllUsers')
          swal.fire({
            icon: 'success',
            title: 'La migration a bien été lancée',
            text: 'Vous allez désormais être déconnecté pour pouvoir effectuer la migration de votre compte.',
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
