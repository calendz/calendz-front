<template>
  <div>
    <card
      :show-footer-line="true"
      class="card-stats bg-gradient-default cursor-pointer"
      @click.native="openModal()">
      <!-- ================================================ -->
      <!-- == Body ======================================== -->
      <!-- ================================================ -->
      <div class="row">
        <div class="col pr-0">
          <slot>
            <h5 class="card-title text-muted mb-1">
              AJOUTER UNE NOTE
            </h5>

            <div style="height: 36px !important">
              <span class="h2 font-weight-bold mt--1 mr-2 float-left text-white">
                Ajouter une note
              </span>
            </div>
          </slot>
        </div>

        <div class="col-auto">
          <slot name="icon">
            <div class="icon icon-shape bg-gradient-primary text-white rounded-circle shadow">
              <i class="fas fa-plus-circle"/>
            </div>
          </slot>
        </div>
      </div>

      <!-- ================================================ -->
      <!-- == Footer ====================================== -->
      <!-- ================================================ -->
      <p class="mt-1 mb-0 text-sm">
        <slot name="footer">
          <span class="text-white">
            <i class="fas fa-external-link-alt mr-1"/>
            Cliquez pour ajouter une note
          </span>
        </slot>
      </p>
    </card>

    <!-- =============================== -->
    <!-- == GRADE CREATION MODAL ======== -->
    <!-- =============================== -->
    <form
      class="needs-validation"
      @submit.prevent>
      <modal
        :show="showModal"
        @close="closeModal()">
        <template slot="header">
          <h5 class="modal-title">Nouvelle note</h5>
        </template>

        <div class="row">
          <base-alert type="secondary">
            <i class="fas fa-lightbulb mr-2"/>
            <strong>Astuce : </strong>
            Lorsque vous venez de passer une évaluation, vous pouvez pré-créer la note et la remplir une fois que vous l'aurez.
          </base-alert>
        </div>

        <div class="row">
          <div class="col-md-6">
            <base-input
              v-validate="'min_value:0|max_value:20'"
              v-model="gradeCreationForm.value"
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
              v-model="gradeCreationForm.coefficient"
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
          <div class="col-md-6">
            <base-input
              :error="getError('matière')"
              :valid="isValid('matière')"
              label="Matière">
              <el-select
                v-validate="'required|min:1|max:50'"
                v-model="gradeCreationForm.subject"
                filterable
                allow-create
                default-first-option
                name="matière"
                placeholder="Nom de la matière">
                <el-option
                  v-for="(subject, index) in subjects"
                  :key="index"
                  :label="subject"
                  :value="subject"/>
              </el-select>
            </base-input>
          </div>

          <div class="col-md-6">
            <base-input
              :error="getError('date')"
              :valid="isValid('date')"
              autocomplete="off"
              label="Date">
              <flat-picker
                slot-scope="{focus, blur}"
                v-model="gradeCreationForm.date"
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
                v-model="gradeCreationForm.description"
                name="description"
                class="form-control"
                rows="4"
                placeholder="Décrivez à quoi correspond cette note..."/>
            </base-input>
          </div>
        </div>

        <template slot="footer">
          <base-button
            size="md"
            type="secondary"
            @click="closeModal()">
            Fermer
          </base-button>
          <base-button
            size="md"
            type="primary"
            @click="handleGradeCreateSubmit()">
            Ajouter
          </base-button>
        </template>
      </modal>
    </form>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import FlatPicker from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import { French } from 'flatpickr/dist/l10n/fr.js'
import dateUtilMixin from '@/mixins/dateUtilMixin'
import { Select, Option } from 'element-ui'

export default {
  components: {
    FlatPicker,
    [Select.name]: Select,
    [Option.name]: Option
  },
  mixins: [dateUtilMixin],
  data () {
    return {
      gradeCreationForm: {},
      flatPickerConfig: {
        allowInput: true,
        locale: French,
        dateFormat: 'd-m-Y'
      }
    }
  },
  computed: {
    ...mapState({
      showModal: state => state.layout.gradeCreationModal.isOpen,
      prefilledSubject: state => state.layout.gradeCreationModal.subject
    }),
    ...mapGetters({
      subjects: 'grades/subjects'
    })
  },
  watch: {
    prefilledSubject: function (newVal) {
      this.gradeCreationForm.subject = newVal
    }
  },
  mounted () {
    this.gradeCreationForm.date = this.dateToDayMonthYear(new Date())
  },
  methods: {
    openModal () {
      this.$store.commit('layout/OPEN_CREATEGRADE_MODAL')
    },
    closeModal () {
      this.$store.commit('layout/CLOSE_CREATEGRADE_MODAL')
    },
    handleGradeCreateSubmit () {
      // vérification validation des champs
      this.$validator.validateAll().then(valid => {
        if (!valid) return
        this.$store.dispatch('grades/create', this.gradeCreationForm).then(response => {
          this.gradeCreationForm = {
            date: this.dateToDayMonthYear(new Date())
          }
          this.closeModal()
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
