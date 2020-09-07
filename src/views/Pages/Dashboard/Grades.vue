<template>
  <div>
    <!-- ======================================= -->
    <!-- == "Base header" ====================== -->
    <!-- ======================================= -->
    <base-header
      type="primary"
      class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Gestion des notes</h6>
          <nav
            aria-label="breadcrumb"
            class="d-none d-md-inline-block ml-md-4">
            <route-bread-crumb/>
          </nav>
        </div>
      </div>
    </base-header>

    <!-- ======================================= -->
    <!-- == Main container ===================== -->
    <!-- ======================================= -->
    <div class="container-fluid mt--6">
      <div class="row">
        <div class="col-xl-3 col-md-6">
          <create-grade/>
        </div>
        <div class="col-xl-3 col-md-6">
          <grades-average/>
        </div>
        <div class="col-xl-3 col-md-6">
          <grades-catchup/>
        </div>
        <div class="col-xl-3 col-md-6">
          <total-number/>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <grades-table/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CreateGrade from './Grades/CreateGrade.vue'
import GradesAverage from './Grades/GradesAverage.vue'
import TotalNumber from './Grades/TotalNumber.vue'
import GradesCatchup from './Grades/GradesCatchup.vue'
import GradesTable from './Grades/GradesTable.vue'

export default {
  components: {
    CreateGrade,
    GradesAverage,
    TotalNumber,
    GradesCatchup,
    GradesTable
  }
}
</script>
