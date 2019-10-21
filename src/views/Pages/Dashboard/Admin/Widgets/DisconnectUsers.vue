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
              <span
                class="h2 font-weight-bold mt--1 mb-2 mr-2"
                style="float:left">Cliquez</span>
              <div>
                <base-button
                  :disabled="isDisabled"
                  type="primary"
                  size="sm"
                  class="mt--1 mb-2"
                  @click="disconnectAllUsers($event)">
                  Déconnecter
                </base-button>
              </div>
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
import Card from '@/components/Cards/Card.vue'

export default {
  components: {
    Card
  },
  data () {
    return {
      isDisabled: false
    }
  },
  methods: {
    disconnectAllUsers (element) {
      // disable the button and re-enable it after 5 seconds
      this.isDisabled = true
      setTimeout(() => {
        this.isDisabled = false
      }, 5000)

      this.$store.dispatch('sysconf/disconnectAllUsers')
    }
  }
}
</script>
