<template>
  <card
    :show-footer-line="true"
    class="card-stats">
    <div class="row">

      <div class="col">
        <slot>
          <h5 class="card-title text-uppercase text-muted mb-1">TOGGLE MODIFICATION GROUPE</h5>
          <div class="row mt-2 mb--3">
            <div class="col-12 pr-0">
              <span
                class="h2 font-weight-bold mt--1 mr-2"
                style="float:left">Statut :</span>
              <div>
                <base-switch
                  :value="settings.editGroupEnabled"
                  type="primary"
                  on-text="On"
                  off-text="Off"
                  @input="toggleEditGroup($event)"/>
              </div>
            </div>
          </div>
        </slot>
      </div>

      <div class="col-auto">
        <slot name="icon">
          <div
            :class="settings.editGroupEnabled ? 'bg-success' : 'bg-danger'"
            class="icon icon-shape text-white rounded-circle shadow">
            <i
              :class="settings.editGroupEnabled ? 'fa-toggle-on' : 'fa-toggle-off'"
              class="fas"/>
          </div>
        </slot>
      </div>
    </div>

    <p class="mt-3 mb-0 text-sm">
      <slot name="footer">
        <i
          :class="settings.editGroupEnabled ? 'fa-toggle-on' : 'fa-toggle-off'"
          class="fas  mr-1"/>
        État actuel :
        <span :class="settings.editGroupEnabled ? 'text-success' : 'text-danger'" >
          {{ settings.editGroupEnabled ? 'activé' : 'désactivé' }}
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
  mounted () {
    console.log(this.settings)
  },
  methods: {
    toggleEditGroup (element) {
      // disable the switch and re-enable it after 5 seconds
      element.disabled = true
      setTimeout(() => {
        element.disabled = false
      }, 5000)

      this.$store.dispatch('sysconf/toggleEditGroup', { value: element.checked })
    }
  }
}
</script>
