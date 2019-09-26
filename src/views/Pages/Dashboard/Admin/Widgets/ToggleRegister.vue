<template>
  <card
    :show-footer-line="true"
    class="card-stats">
    <div class="row">

      <div class="col">
        <slot>
          <h5 class="card-title text-uppercase text-muted mb-0">TOGGLE INSCRIPTION</h5>
          <div class="row mt-2 mb--3">
            <div class="col-4 pr-0">
              <span class="h2 font-weight-bold mb-0">Statut :</span>
            </div>
            <div class="col-8 my-auto pl-0">
              <base-switch
                :value="false"
                type="primary"
                on-text="On"
                off-text="Off"
                class="mt-1"/>
            </div>
          </div>
        </slot>
      </div>

      <div class="col-auto">
        <slot name="icon">
          <div class="bg-danger icon icon-shape text-white rounded-circle shadow">
            <i class="fas fa-sign-in-alt"/>
          </div>
        </slot>
      </div>
    </div>

    <p class="mt-3 mb-0 text-sm">
      <slot name="footer">
        <i class="fas fa-toggle-on mr-1"/> État actuel : désactivé
      </slot>
    </p>
  </card>
</template>

<script>
import Card from '@/components/Cards/Card.vue'

export default {
  components: {
    Card
  }
}
</script>
