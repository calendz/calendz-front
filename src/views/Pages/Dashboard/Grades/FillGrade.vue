<template>
  <div class="card">
    <div class="card-header border-0">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0">Notes en attente</h3>
        </div>
        <!-- <div class="col text-right">
          <base-button
            size="sm"
            type="primary">See all</base-button>
        </div> -->
      </div>
    </div>

    <div class="table-responsive">
      <el-table
        :data="grades"
        class="table-responsive table"
        header-row-class-name="thead-light">
        <el-table-column
          label="Matière"
          width="160px"
          min-width="160px"
          prop="subject">
          <template v-slot="{row}">
            <div class="font-weight-600">{{ row.subject }}</div>
          </template>
        </el-table-column>

        <el-table-column
          label="Date"
          width="120px"
          min-width="120px"
          prop="date">
          <template v-slot="{row}">
            {{ dateToDayMonthYear(timestampToDate(row.date)) }}
          </template>
        </el-table-column>

        <el-table-column
          min-width="250px"
          label="Description"
          prop="description">
          <template v-slot="{row}">
            {{ row.description || 'Aucune description...' }}
          </template>
        </el-table-column>

        <el-table-column
          label="Note"
          width="115px"
          min-width="115px">
          <template v-slot="{row}">
            <base-button
              type="primary"
              @click="addValue(row)">
              Ajouter
            </base-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- ============================================== -->
    <!-- == ADD VALUE MODAL =========================== -->
    <!-- ============================================== -->
    <form
      v-if="currentGrade"
      class="needs-validation"
      @submit.prevent>
      <modal
        :show="showModal"
        @close="closeModal()">
        <template slot="header">
          <h5 class="modal-title">
            Note de {{ currentGrade.subject }} du {{ dateToDayMonthYear(timestampToDate(currentGrade.date)) }}
          </h5>
        </template>

        <base-input
          v-validate="'required|min_value:0|max_value:20'"
          v-model="currentGrade.value"
          :error="getError('note')"
          :valid="isValid('note')"
          type="number"
          required
          min="0"
          max="20"
          name="note"
          label="Votre note (sur 20)"
          placeholder="0"/>

        <template slot="footer">
          <base-button
            size="md"
            type="secondary"
            @click="closeModal()">
            Annuler
          </base-button>
          <base-button
            size="md"
            type="primary"
            @click="save()">
            Enregistrer
          </base-button>
        </template>
      </modal>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { BaseProgress } from '@/components'
import { Table, TableColumn, DropdownMenu, DropdownItem, Dropdown } from 'element-ui'
import dateUtilMixin from '@/mixins/dateUtilMixin'

export default {
  components: {
    BaseProgress,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Dropdown.name]: Dropdown,
    [DropdownItem.name]: DropdownItem,
    [DropdownMenu.name]: DropdownMenu
  },
  mixins: [dateUtilMixin],
  data () {
    return {
      showModal: false,
      currentGrade: null
    }
  },
  computed: {
    ...mapGetters({
      grades: 'grades/pending'
    })
  },
  methods: {
    addValue (grade) {
      this.$validator.resume()
      this.currentGrade = Object.assign({}, grade)
      this.showModal = true
    },
    save () {
      this.$validator.validateAll().then(valid => {
        if (!valid) return
        this.$store.dispatch('grades/fill', this.currentGrade).then(() => {
          this.closeModal()
        })
      })
    },
    closeModal () {
      this.$validator.pause()
      this.showModal = false
      this.currentGrade = null
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
