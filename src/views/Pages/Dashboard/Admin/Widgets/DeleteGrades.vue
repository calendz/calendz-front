<template>
  <card
    :show-footer-line="true"
    class="card-stats">
    <div class="row">

      <div class="col">
        <slot>
          <h5 class="card-title text-uppercase text-muted mb-1">SUPPRIMER NOTES</h5>
          <div class="row mt-2 mb--3">
            <div class="col-12 pr-0">
              <base-button
                type="primary"
                size="sm"
                class="mb-2"
                @click="deleteAllGrades()">
                Démarrer suppression
              </base-button>
            </div>
          </div>
        </slot>
      </div>

      <div class="col-auto">
        <slot name="icon">
          <div class="bg-warning icon icon-shape text-white rounded-circle shadow">
            <i class="fas fa-trash-alt"/>
          </div>
        </slot>
      </div>
    </div>

    <p class="mt-3 mb-0 text-sm">
      <slot name="footer">
        <span class="text-danger">
          <i class="fas fa-trash-alt mr-1"/>
          Supprime
        </span> toutes les notes
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
    deleteAllGrades () {
      swal.fire({
        icon: 'warning',
        title: 'Êtes vous sûr ?',
        text: 'Toutes les notes de tous les utilisateurs seront supprimées définitivement',
        customClass: {
          confirmButton: 'btn btn-warning',
          cancelButton: 'btn btn-secondary'
        },
        buttonsStyling: false,
        showCancelButton: true,
        cancelButtonText: 'Annuler',
        confirmButtonText: 'Confirmer'
      }).then((result) => {
        if (result.value) {
          this.$store.dispatch('sysconf/deleteAllGrades')
          swal.fire({
            icon: 'success',
            title: 'Succès',
            text: 'Les notes ont bien été supprimées.',
            customClass: {
              confirmButton: 'btn btn-primary'
            }
          })
        }
      })
    }
  }
}
</script>
