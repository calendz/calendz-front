<template>
  <div class="card">
    <!-- ======================================= -->
    <!-- == CARD HEADER ======================== -->
    <!-- ======================================= -->
    <div class="card-header border-0">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0">Moyennes</h3>
        </div>
        <div class="col text-right">
          <router-link to="/grades">
            <base-button
              size="sm"
              type="primary">Détail</base-button>
          </router-link>
        </div>
      </div>
    </div>

    <!-- ======================================= -->
    <!-- == BODY (table) ======================= -->
    <!-- ======================================= -->
    <div class="table-responsive">
      <el-table
        id="gradesAverageTable"
        :data="subjects"
        class="table-responsive table"
        header-row-class-name="thead-light">
        <!-- matière -->
        <el-table-column
          label="Matière"
          min-width="180px">
          <template v-slot="{row}">
            <div class="d-flex">
              <div class="col-auto pl-1 pr-0">
                {{ row }}
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column
          label="Notes"
          width="40px"
          min-width="40px">
          <template v-slot="{row}">
            <div class="text-center">
              {{ amount(row) }}
            </div>
          </template>
        </el-table-column>

        <el-table-column
          width="215px"
          min-width="215px"
          prop="progress">
          <template v-slot="{row}">
            <div class="d-flex align-items-center">
              <span class="mr-2">{{ average(row) }}/20</span>
              <base-progress
                :value="average(row) * 5"
                :type="getColor(average(row))"
              />
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { BaseProgress } from '@/components'
import { Table, TableColumn, DropdownMenu, DropdownItem, Dropdown } from 'element-ui'

export default {
  components: {
    BaseProgress,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Dropdown.name]: Dropdown,
    [DropdownItem.name]: DropdownItem,
    [DropdownMenu.name]: DropdownMenu
  },
  computed: {
    ...mapGetters({
      grades: 'grades/completed',
      subjects: 'grades/subjects'
    })
  },
  methods: {
    amount (subject) {
      const array = this.grades
      return array.filter(grade => grade.subject === subject).length
    },
    average (subject) {
      let total = 0
      let count = 0
      const grades = this.grades
      const temp = grades.filter(grade => grade.subject === subject)

      temp.forEach(grade => {
        if (!grade.value) return
        count += (1 * grade.coefficient)
        total += (grade.value * grade.coefficient)
      })

      const average = (total / count).toFixed(0)
      if (isNaN(average)) return '?'

      return average < 10 ? ('0' + average) : average
    },
    getColor (average) {
      if (average < 10) return 'danger'
      if (average < 14) return 'warning'
      else return 'success'
    }
  }
}
</script>

<style lang="scss">
  #gradesAverageTable {
    // subject
    table tr td:first-child { padding-right: 0 !important }

    // count
    table tr td:nth-child(2) { padding: 0 !important }
    table tr th:nth-child(2) { padding: 0 !important }
  }
</style>
