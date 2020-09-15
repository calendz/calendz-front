<template>
  <card
    :show-footer-line="true"
    class="card-stats">
    <!-- ================================================ -->
    <!-- == Body ======================================== -->
    <!-- ================================================ -->
    <div class="row">
      <div class="col pr-0">
        <slot>
          <h5 class="card-title text-muted mb-1">
            NOMBRE DE NOTES
          </h5>

          <div style="height: 36px !important">
            <div v-show="isLoading">
              <placeholder class="w-100"/>
            </div>
            <div v-show="!isLoading">
              <span class="h2 font-weight-bold mt--1 mr-2 float-left">
                {{ completedGrades.length }} notes
              </span>
              <span class="text-muted">
                (et {{ pendingGrades.length }} en attente)
              </span>
            </div>
          </div>
        </slot>
      </div>

      <div class="col-auto">
        <slot name="icon">
          <div class="icon icon-shape bg-gradient-default text-white rounded-circle shadow">
            <i class="fas fa-graduation-cap"/>
          </div>
        </slot>
      </div>
    </div>

    <!-- ================================================ -->
    <!-- == Footer ====================================== -->
    <!-- ================================================ -->
    <p class="mt-1 mb-0 text-sm">
      <slot name="footer">
        <!-- loading -->
        <span v-show="isLoading">
          <div class="row">
            <div class="col-8 pb-1 pr-1">
              <placeholder class="w-100"/>
            </div>
            <div class="col-4 pl-1 text-right">
              <placeholder class="w-100"/>
            </div>
          </div>
        </span>

        <!-- not loading -->
        <span v-show="!isLoading">
          <span v-if="pendingGrades.length > 0">
            Des notes sont en attentes d'êtres complétées.
          </span>
          <span v-else>
            Aucune action à effectuer, vous êtes à jour.
          </span>
        </span>
      </slot>
    </p>
  </card>
</template>

<script>
import { mapGetters } from 'vuex'
import dateUtilMixin from '@/mixins/dateUtilMixin'

export default {
  mixins: [dateUtilMixin],
  computed: {
    ...mapGetters({
      isLoading: 'grades/isLoading',
      completedGrades: 'grades/completed',
      pendingGrades: 'grades/pending'
    })
  }
}
</script>
