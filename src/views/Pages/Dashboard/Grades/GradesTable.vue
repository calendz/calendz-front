<template>
  <div class="card bg-white shadow">
    <!-- ==================================================== -->
    <!-- == HEADER ========================================== -->
    <!-- ==================================================== -->
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

    <!-- ==================================================== -->
    <!-- == MAIN TABLE ====================================== -->
    <!-- ==================================================== -->
    <div>
      <el-table
        id="gradesTable"
        :data="tableData"
        row-key="id"
        class="table-responsive table-light"
        header-row-class-name="thead-light">

        <!-- icon -->
        <el-table-column
          width="90px"
          min-width="90px"
          class="text-center">
          <template v-slot="{row}">
            <div class="d-flex justify-content-center">
              <i
                :class="`fas fa-graduation-cap bg-${getColor(average(row))}`"
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
          min-width="180px">
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
          min-width="108px"
          width="108px">
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
          min-width="180px"
          width="180px"
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
              <base-button
                class="remove btn-link"
                type="danger"
                size="sm"
                icon
                @click="openDeleteModal(row)">
                <i class="text-white fas fa-trash"/>
              </base-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- ==================================================== -->
    <!-- == EDIT MODAL ====================================== -->
    <!-- ==================================================== -->
    <form
      class="needs-validation"
      @submit.prevent>
      <modal
        :show.sync="showEditModal"
        @close="closeEditModal()">
        <template slot="header">
          <h5 class="modal-title">{{ selectedSubject }}  : cliquez sur la note à modifier</h5>
        </template>

        <div
          v-if="!editGrade"
          class="row">
          <div
            v-for="(grade, index) in subjectGrades(selectedSubject)"
            :key="index"
            class="mx-auto text-center">
            <el-tooltip
              :content="dateToFullString(timestampToDate(grade.date))"
              placement="top">
              <div
                class="col-auto mx-auto my-2 cursor-pointer"
                @click="assignEditGrade(grade)">
                <i
                  :class="`fas fa-graduation-cap bg-${getColor(grade.value)}`"
                  class="avatar avatar-sm rounded-circle mb-2"/><br>
                <span>
                  {{ grade.value }}/20 <sub>{{ grade.coefficient }}</sub>
                </span>
              </div>
            </el-tooltip>
          </div>
        </div>

        <div v-else>
          <div class="row">
            <div class="col-md-6">
              <base-input
                v-validate="'min_value:0|max_value:20'"
                v-model="editGrade.value"
                :error="getError('note')"
                :valid="isValid('note')"
                type="number"
                min="0"
                max="20"
                name="note"
                label="Note (facultatif)"
                placeholder="Votre note (sur 20)"/>
            </div>

            <div class="col-md-6">
              <base-input
                v-validate="'min_value:0|max_value:10'"
                v-model="editGrade.coefficient"
                :error="getError('coefficient')"
                :valid="isValid('coefficient')"
                type="number"
                min="0"
                max="10"
                name="coefficient"
                label="Coefficient (facultatif)"
                placeholder="Coefficient (1 par défaut)"/>
            </div>
          </div>

          <div class="row">
            <div class="col-md-12">
              <base-input
                :error="getError('date')"
                :valid="isValid('date')"
                autocomplete="off"
                label="Date">
                <flat-picker
                  slot-scope="{focus, blur}"
                  v-model="editGrade.date"
                  :config="flatPickerConfig"
                  name="date"
                  class="form-control datepicker"
                  @on-open="focus"
                  @on-close="blur"/>
              </base-input>
            </div>
          </div>

          <div class="row">
            <div class="col-md-12">
              <base-input
                :error="getError('description')"
                :valid="isValid('description')"
                class="w-100"
                label="Description (facultatif)">
                <textarea
                  v-validate="'max:250'"
                  v-model="editGrade.description"
                  name="description"
                  class="form-control"
                  rows="4"
                  placeholder="Décrivez à quoi correspond cette note..."/>
              </base-input>
            </div>
          </div>
        </div>

        <template slot="footer">
          <base-button
            size="md"
            type="secondary"
            @click="closeEditModal()">
            Fermer
          </base-button>
          <base-button
            v-show="editGrade"
            size="md"
            type="primary"
            @click="handleEditFormSubmit()">
            Enregistrer
          </base-button>
        </template>
      </modal>
    </form>

    <!-- ==================================================== -->
    <!-- == DELETE MODAL ==================================== -->
    <!-- ==================================================== -->
    <modal
      :show.sync="showDeleteModal"
      @close="closeDeleteModal()">
      <template slot="header">
        <h5 class="modal-title">{{ selectedSubject }} : cliquez sur la note à supprimer</h5>
      </template>

      <div class="row">
        <div
          v-for="(grade, index) in subjectGrades(selectedSubject)"
          :key="index"
          class="mx-auto text-center">
          <el-tooltip
            :content="dateToFullString(timestampToDate(grade.date))"
            placement="top">
            <div
              class="col-auto mx-auto my-2 cursor-pointer"
              @click="deleteGrade(grade._id)">
              <i
                :class="`fas fa-graduation-cap bg-${getColor(grade.value)}`"
                class="avatar avatar-sm rounded-circle mb-2"/><br>
              <span>
                {{ grade.value }}/20 <sub>{{ grade.coefficient }}</sub>
              </span>
            </div>
          </el-tooltip>
        </div>
      </div>

      <template slot="footer">
        <base-button
          size="md"
          type="secondary"
          @click="closeDeleteModal()">
          Fermer
        </base-button>
      </template>
    </modal>
  </div>
</template>

<script>
import swal from 'sweetalert2'
import { mapState } from 'vuex'
import { BasePagination } from '@/components'
import { Table, TableColumn, Option } from 'element-ui'
import dateUtilMixin from '@/mixins/dateUtilMixin'
import FlatPicker from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import { French } from 'flatpickr/dist/l10n/fr.js'
import { FadeTransition } from 'vue2-transitions'

export default {
  components: {
    BasePagination,
    [Option.name]: Option,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    FadeTransition,
    FlatPicker
  },
  mixins: [dateUtilMixin],
  data () {
    return {
      showEditModal: false,
      showDeleteModal: false,
      selectedSubject: '',
      editGrade: null,
      flatPickerConfig: {
        allowInput: true,
        locale: French,
        dateFormat: 'd-m-Y'
      }
    }
  },
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
      this.selectedSubject = subject
      this.$validator.resume()

      const grades = this.subjectGrades(subject)
      if (grades.length === 1) {
        this.assignEditGrade(grades[0])
      }

      this.showEditModal = true
    },
    assignEditGrade (grade) {
      this.editGrade = Object.assign({}, grade)
      this.editGrade.date = this.timestampToDate(grade.date)
    },
    subjectGrades (subject) {
      const grades = this.grades
      const result = grades.filter(grade => grade.subject === subject)
      return result
    },
    getColor (grade) {
      if (grade <= 8) return 'danger'
      if (grade <= 13) return 'warning'
      return 'success'
    },
    closeEditModal () {
      this.$validator.pause()
      this.editGrade = null
      this.showEditModal = false
    },
    openDeleteModal (subject) {
      const grades = this.subjectGrades(subject)
      if (grades.length === 1) {
        this.deleteGrade(grades[0]._id)
      } else {
        this.selectedSubject = subject
        this.showDeleteModal = true
      }
    },
    closeDeleteModal () {
      this.showDeleteModal = false
      this.selectedSubject = null
    },
    deleteGrade (gradeId) {
      swal.fire({
        icon: 'warning',
        title: `Êtes-vous sûr de vouloir supprimer cette note ?`,
        text: 'La suppression est définitive, et la mise-à-jour de vos moyennes se fera automatiquement.',
        customClass: {
          confirmButton: 'btn btn-warning mt-2',
          cancelButton: 'btn btn-secondary mt-2'
        },
        buttonsStyling: false,
        showCancelButton: true,
        cancelButtonText: 'Annuler',
        confirmButtonText: 'Confimer'
      }).then((result) => {
        if (!result.value) return
        this.$store.dispatch('grades/delete', { gradeId }).then(() => {
          this.closeDeleteModal()
        })
      })
    },
    handleEditFormSubmit () {
      // vérification validation des champs
      this.$validator.validateAll().then(valid => {
        if (!valid) return
        this.$store.dispatch('grades/update', this.editGrade).then(response => {
          this.closeEditModal()
        })
      })
    },
    getError (name) {
      return this.errors.first(name)
    },
    isValid (name) {
      return this.validated && !this.errors.has(name)
    }
  }
}
</script>
