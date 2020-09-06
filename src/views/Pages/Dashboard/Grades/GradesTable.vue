<template>
  <div class="card bg-white shadow">
    <div class="card-header border-0">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0">Gestion des notes</h3>
          <p class="text-sm mb-0">
            Visualisez, éditez et ajoutez des notes...
          </p>
        </div>
      </div>
    </div>
    <div>
      <el-table
        id="gradesTable"
        :data="tableData"
        row-key="id"
        class="table-responsive table-light"
        header-row-class-name="thead-light">

        <!-- icon -->
        <el-table-column
          width="100px"
          min-width="100px"
          class="text-center">
          <!-- <template v-slot="{row}"> -->
          <template>
            <div class="d-flex justify-content-center">
              <!-- TODO: colors depending of the subject's average -->
              <i
                :class="`fas fa-graduation-cap bg-success`"
                class="avatar avatar-sm rounded-circle"/>
            </div>
          </template>
        </el-table-column>

        <!-- matière -->
        <el-table-column
          label="Matière"
          min-width="180px"
          width="180px">
          <template v-slot="{row}">
            <div class="d-flex">
              <div class="col-auto pl-1 pr-0">
                {{ row }}
              </div>
            </div>
          </template>
        </el-table-column>

        <!-- notes + coeffs -->
        <el-table-column
          label="Note"
          prop="row">
          <template v-slot="{row}">
            <div class="d-flex">
              <div class="col-auto pl-1 pr-0">
                <span v-html="formatGrades(row)"/>
              </div>
            </div>
          </template>
        </el-table-column>

        <!-- moyenne -->
        <el-table-column
          label="Moyenne"
          min-width="120px"
          width="120px">
          <template v-slot="{row}">
            <div class="d-flex">
              <div class="col-auto pl-1 pr-0">
                {{ average(row) }}
              </div>
            </div>
          </template>
        </el-table-column>

        <!-- actions -->
        <el-table-column
          label="Actions"
          min-width="140px"
          width="140px"
          align="right">
          <template v-slot="{row}">
            <div class="d-flex">
              <base-button
                class="add"
                type="primary"
                size="sm"
                icon
                @click="addGrade(row)">
                <i class="text-white fas fa-plus"/>
              </base-button>
              <base-button
                class="edit"
                type="info"
                size="sm"
                icon
                @click="detailGrade(row)">
                <i class="text-white ni ni-ruler-pencil"/>
              </base-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { BasePagination } from '@/components'
import { Table, TableColumn, Option } from 'element-ui'
import clientPaginationMixin from '@/mixins/clientPaginationMixin'
import dateUtilMixin from '@/mixins/dateUtilMixin'

export default {
  components: {
    BasePagination,
    [Option.name]: Option,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn
  },
  mixins: [clientPaginationMixin, dateUtilMixin],
  computed: {
    ...mapState({
      grades: state => state.grades.grades
    }),
    tableData () {
      const result = []
      const grades = this.grades

      grades.forEach(grade => {
        if (!result.includes(grade.subject)) {
          result.push(grade.subject)
        }
      })

      return result
    }
  },
  methods: {
    formatGrades (subject) {
      let result = ''
      const grades = this.grades

      const temp = grades.filter(grade => grade.subject === subject)
      temp.forEach(grade => {
        result += `${grade.value}/20 <sub>${grade.coefficient}</sub> — `
      })

      return result.slice(0, -2)
    },
    average (subject) {
      let total = 0
      let count = 0
      const grades = this.grades
      const temp = grades.filter(grade => grade.subject === subject)

      temp.forEach(grade => {
        count += (1 * grade.coefficient)
        total += (grade.value * grade.coefficient)
      })

      return (total / count).toFixed(2)
    },
    addGrade (subject) {
      this.$store.commit('layout/OPEN_CREATEGRADE_MODAL', { subject })
    },
    detailGrade (subject) {
      // TODO: create detail grade modal
      alert('detail grade')
    }
  }
}
</script>
