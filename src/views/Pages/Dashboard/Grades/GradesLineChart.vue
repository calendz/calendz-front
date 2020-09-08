<template>
  <card>
    <template slot="header">
      <div class="row align-items-center">
        <div class="col-sm-8 text-left my-1">
          <!-- Subtitle -->
          <h6 class="surtitle">Statistiques</h6>
          <!-- Title -->
          <h5 class="h3 mb-0">Évolutions de mes notes</h5>
        </div>
        <div class="col-sm-4 text-right my-1">
          <el-select
            v-model="selectedSubject"
            placeholder="Toutes les matières"
            class="select-danger w-100">
            <el-option
              v-for="(subject, index) in subjects"
              :value="subject"
              :label="subject"
              :key="index"
              class="select-danger"/>
          </el-select>
        </div>
      </div>
    </template>
    <div class="chart">
      <line-chart
        :height="350"
        :chart-data="chart.chartData"
        :extra-options="chart.extraOptions"/>
    </div>
  </card>
</template>

<script>
import { mapGetters } from 'vuex'
import dateUtilMixin from '@/mixins/dateUtilMixin'
import LineChart from '@/components/Charts/LineChart'
import * as chartConfigs from '@/components/Charts/config'
import { Select, Option } from 'element-ui'

export default {
  components: {
    LineChart,
    [Select.name]: Select,
    [Option.name]: Option
  },
  mixins: [dateUtilMixin],
  data () {
    return {
      selectedSubject: 'Toutes les matières'
    }
  },
  computed: {
    ...mapGetters({
      isLoading: 'grades/isLoading',
      subjects: 'grades/subjects',
      grades: 'grades/completed',
      gradesValues: 'grades/completedValues',
      gradesDates: 'grades/completedDates'
    }),
    chart () {
      return {
        chartData: {
          datasets: [
            {
              label: 'Note (/20)',
              data: this.selectedSubject === 'Toutes les matières'
                ? [...this.gradesValues]
                : this.gradeValuesOf(this.selectedSubject)
            }
          ],
          labels: this.selectedSubject === 'Toutes les matières'
            ? this.gradesDates
            : this.gradeDatesOf(this.selectedSubject)
        },
        extraOptions: chartConfigs.blueChartOptions
      }
    }
  },
  methods: {
    gradeValuesOf (subject) {
      const result = []
      const grades = this.grades.filter(grade => grade.subject === subject)
      grades.forEach(grade => {
        result.push(grade.value)
      })
      return result
    },
    gradeDatesOf (subject) {
      const result = []
      const grades = this.grades.filter(grade => grade.subject === subject)
      grades.forEach(grade => {
        let date = this.timestampToDate(grade.date)
        result.push(this.dateToTinyString(date))
      })
      return result
    }
  }
}
</script>
