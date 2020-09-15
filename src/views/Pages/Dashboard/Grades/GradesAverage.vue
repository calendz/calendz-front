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
            MOYENNE GLOBALE
          </h5>

          <div style="height: 36px !important">
            <div v-show="isLoading">
              <placeholder class="w-100"/>
            </div>
            <div v-show="!isLoading">
              <span class="h2 font-weight-bold mt--1 mr-2 float-left">
                {{ average() }}/20
              </span>
            </div>
          </div>
        </slot>
      </div>

      <div class="col-auto">
        <slot name="icon">
          <div :class="`icon icon-shape bg-${getColor()} text-white rounded-circle shadow`">
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
          <span>
            Moyenne générale, toutes matières confondues.
          </span>
        </span>
      </slot>
    </p>
  </card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      isLoading: 'grades/isLoading',
      completedGrades: 'grades/completed'
    })
  },
  methods: {
    average () {
      let total = 0
      let count = 0
      const grades = this.completedGrades

      grades.forEach(grade => {
        count += (1 * grade.coefficient)
        total += (grade.value * grade.coefficient)
      })

      return (total / count).toFixed(2)
    },
    getColor () {
      const average = this.average()
      if (average <= 8) return 'danger'
      if (average <= 13) return 'warning'
      return 'success'
    }
  }
}
</script>
