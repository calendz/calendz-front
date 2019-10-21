<template>
  <card
    :show-footer-line="true"
    class="card-stats">
    <div class="row">

      <div class="col">
        <slot>
          <h5 class="card-title text-uppercase text-muted mb-1">TOGGLE CONNEXION</h5>
          <div class="row mt-2 mb--3">
            <div class="col-12 pr-0">
              <span
                class="h2 font-weight-bold mt--1 mr-2"
                style="float:left">Statut :</span>
              <div>
                <base-switch
                  :value="settings.loginEnabled"
                  type="primary"
                  on-text="On"
                  off-text="Off"
                  @input="toggleLogin($event)"/>
              </div>
            </div>
          </div>
        </slot>
      </div>

      <div class="col-auto">
        <slot name="icon">
          <div
            :class="settings.loginEnabled ? 'bg-success' : 'bg-danger'"
            class="icon icon-shape text-white rounded-circle shadow">
            <i class="fas fa-sign-in-alt"/>
          </div>
        </slot>
      </div>
    </div>

    <p class="mt-3 mb-0 text-sm">
      <slot name="footer">
        <i
          :class="settings.loginEnabled ? 'fa-toggle-on' : 'fa-toggle-off'"
          class="fas  mr-1"/>
        État actuel :
        <span :class="settings.loginEnabled ? 'text-success' : 'text-danger'" >
          {{ settings.loginEnabled ? 'activé' : 'désactivé' }}
        </span>
      </slot>
    </p>
  </card>
</template>

<script>
import { mapGetters } from 'vuex'
import Card from '@/components/Cards/Card.vue'

export default {
  components: {
    Card
  },
  computed: {
    ...mapGetters({
      settings: 'sysconf/getSettings'
    })
  },
  methods: {
    toggleLogin (element) {
      // disable the switch and re-enable it after 5 seconds
      element.disabled = true
      setTimeout(() => {
        element.disabled = false
      }, 5000)

      this.$store.dispatch('sysconf/toggleLogin', { value: element.checked })
    }
  }
}
</script>
