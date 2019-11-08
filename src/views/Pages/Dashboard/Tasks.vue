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
          <h6 class="h2 text-white d-inline-block mb-0">Devoirs</h6>
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
    <div class="container-fluid mt--6 card-wrapper">
      <div class="card mb-4">

        <div class="container-fluid mt-4">
          <div class="row">

            <!-- =============================== -->
            <!-- == MENU ======================= -->
            <!-- =============================== -->
            <div class="col-lg-2 mb-4">
              <ul class="list-group">
                <li
                  :class="active === 1 ? 'bg-primary text-white' : 'bg-white text-primary'"
                  class="list-group-item d-flex justify-content-between align-items-center hover-click"
                  @click="active = 1">
                  À faire
                  <badge
                    type="primary"
                    pill>
                    {{ todoTasks.length || 0 }}
                  </badge>
                </li>
                <li
                  :class="active === 2 ? 'bg-primary text-white' : 'bg-white text-primary'"
                  class="list-group-item d-flex justify-content-between align-items-center hover-click"
                  @click="active = 2">
                  Faits
                  <badge
                    type="primary"
                    pill>
                    {{ doneTasks.length || 0 }}
                  </badge>
                </li>
                <li
                  :class="active === 3 ? 'bg-primary text-white' : 'bg-white text-primary'"
                  class="list-group-item d-flex justify-content-between align-items-center hover-click"
                  @click="active = 3">
                  Oubliés
                  <badge
                    type="primary"
                    pill>
                    {{ notdoneTasks.length || 0 }}
                  </badge>
                </li>
                <li
                  :class="active === 4 ? 'bg-primary text-white' : 'bg-white text-primary'"
                  class="list-group-item d-flex justify-content-between align-items-center hover-click"
                  @click="active = 4">
                  Tous
                  <badge
                    type="primary"
                    pill>
                    {{ allTasks.length || 0 }}
                  </badge>
                </li>
              </ul>

              <base-button
                size="md"
                type="primary"
                class="mt-4 w-100"
                @click="showTaskCreationModal = true">
                <i class="fas fa-plus-circle text-white mr-1"/>
                Ajouter un devoirs
              </base-button>
            </div>

            <!-- =============================== -->
            <!-- == CONTENT ==================== -->
            <!-- =============================== -->
            <div class="col-lg-10">
              <div class="card bg-white shadow">

                <!-- table header -->
                <div class="card-header border-0">
                  <div class="row align-items-center">
                    <div class="col-lg-7">
                      <h3
                        :class=" active !== 4 ? 'my-2' : ''"
                        class="mb-0">Gérez vos devoirs & autres tâches...</h3>
                    </div>
                    <div class="col-lg-5">
                      <base-input
                        v-if="active === 4"
                        v-model="searchQuery"
                        prepend-icon="fas fa-search"
                        placeholder="Rechercher..."
                        class="my-auto w-100"/>
                    </div>
                  </div>
                </div>

                <!-- table content -->
                <div>
                  <el-table
                    id="tasksTable"
                    :data="queriedData"
                    row-key="id"
                    class="table-responsive table-light"
                    header-row-class-name="thead-light"
                    @sort-change="sortChange">

                    <!-- type -->
                    <el-table-column
                      prop="row.type"
                      width="62px"
                      min-width="62px"
                      class="text-center">
                      <template v-slot="{row}">
                        <div class="d-flex justify-content-center">
                          <task-type :task="row"/>
                        </div>
                      </template>
                    </el-table-column>

                    <!-- title, author, description & subject -->
                    <el-table-column
                      prop="row.title"
                      label="Titre et description"
                      min-width="250px">
                      <template v-slot="{row}">
                        <task-core
                          :task="row"
                          class="mb-3"/>
                      </template>
                    </el-table-column>

                    <!-- date -->
                    <el-table-column
                      sortable
                      prop="row.date"
                      label="Date de rendu"
                      width="170px"
                      min-width="170px"
                      align="center">
                      <template v-slot="{row}">
                        {{ dateToFullString(timestampToDate(row.date)) }}
                      </template>
                    </el-table-column>

                    <!-- target -->
                    <el-table-column
                      width="70px"
                      min-width="70px"
                      align="center">
                      <template v-slot="{row}">
                        <!-- whole class -->
                        <div v-if="row.city && row.grade && row.group">
                          <el-tooltip
                            :content="`${row.grade} ${row.group}`"
                            placement="top"
                            class="avatar avatar-sm rounded-circle bg-warning">
                            <i class="fas fa-users"/>
                          </el-tooltip>
                        </div>

                        <!-- multiple users -->
                        <span v-if="!row.city && !row.grade && !row.group">
                          <div class="avatar-group">
                            <span
                              v-for="(target, index) in row.targets"
                              :key="index"
                              :class="row.targets.length < 3 ? 'avatar-sm' : 'avatar-xs'"
                              class="avatar rounded-circle">
                              <el-tooltip
                                :content="`${target.firstname} ${target.lastname}`"
                                placement="top">
                                <img
                                  :src="target.avatarUrl || 'img/theme/default-pp.png'"
                                  alt="Photo de profil"
                                  class="rounded-circle">
                              </el-tooltip>
                            </span>
                          </div>
                        </span>
                      </template>
                    </el-table-column>

                    <!-- actions -->
                    <el-table-column
                      label="Actions"
                      width="172px"
                      min-width="172px">
                      <template v-slot="{row}">
                        <div class="d-flex">

                          <el-tooltip
                            :content="isDone(row._id) ? 'Marquer comme non fait' : 'Marquer comme fait'"
                            placement="top">
                            <base-button
                              :outline="!isDone(row._id)"
                              :class="isDone(row._id) ? 'text-white' : 'text-success'"
                              size="sm"
                              type="success"
                              class="is-done-checkbox"
                              @click="toggleDone(row._id)">
                              <i class="fas fa-check"/>
                            </base-button>
                          </el-tooltip>

                          <el-tooltip
                            content="Modifier"
                            placement="top">
                            <base-button
                              size="sm"
                              type="info"
                              @click="showTaskModificationModal = true, taskModificationForm = {...row, date: timestampToDate(row.date)}">
                              <i class="text-white ni ni-ruler-pencil"/>
                            </base-button>
                          </el-tooltip>

                          <el-tooltip
                            content="Supprimer"
                            placement="top">
                            <base-button
                              size="sm"
                              type="danger"
                              class="remove btn-link"
                              @click="deleteTask(row._id)">
                              <i class="text-white fas fa-trash"/>
                            </base-button>
                          </el-tooltip>
                        </div>
                      </template>
                    </el-table-column>

                  </el-table>
                </div>

                <!-- table footer -->
                <div
                  slot="footer"
                  class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap pt-4 pb-2">
                  <div>
                    <p class="card-category text-sm mt-2 mb-3">
                      Affichage de  {{ from + 1 }} à {{ to }} d'un total de {{ total }} entrées
                    </p>
                  </div>
                  <base-pagination
                    v-model="pagination.currentPage"
                    :per-page="pagination.perPage"
                    :total="total"
                    class="pagination-no-border"/>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>

    <!-- =============================== -->
    <!-- == TASK CREATION MODAL ======== -->
    <!-- =============================== -->
    <form
      class="needs-validation"
      data-vv-scope="creation-form"
      @submit.prevent="handleTaskCreateSubmit">
      <modal :show.sync="showTaskCreationModal">
        <template slot="header">
          <h5 class="modal-title">Créer une tâche</h5>
        </template>

        <div class="row">
          <div class="col-md-6">
            <base-input
              v-validate="'required|min:2|max:50'"
              v-model="taskCreationForm.title"
              :error="getError('titre')"
              :valid="isValid('titre')"
              name="titre"
              label="Titre"
              placeholder="Titre"/>
          </div>

          <div class="col-md-6">
            <base-input
              :error="getError('type')"
              :valid="isValid('type')"
              label="Type">
              <select
                v-validate="'required|valid_task_type'"
                v-model="taskCreationForm.type"
                name="type"
                class="form-control">
                <option
                  value=""
                  hidden>Séléctionnez un type</option>
                <option value="homework">Devoirs</option>
                <option value="DS">Contrôle</option>
                <option value="task">Tâche</option>
              </select>
            </base-input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <base-input
              v-validate="'min:2|max:50'"
              v-model="taskCreationForm.subject"
              :error="getError('matière')"
              :valid="isValid('matière')"
              name="matière"
              label="Matière (facultatif)"
              placeholder="Matière"/>
          </div>

          <div class="col-md-6">
            <base-input
              :error="getError('date')"
              :valid="isValid('date')"
              label="Date de rendu">
              <flat-picker
                slot-scope="{focus, blur}"
                v-model="taskCreationForm.date"
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
                v-validate="'min:2|max:1000'"
                v-model="taskCreationForm.description"
                name="description"
                class="form-control"
                rows="3"
                resize="none"
                placeholder="Entrez la description de la tâche..."/>
            </base-input>
          </div>
        </div>

        <template slot="footer">
          <base-button
            size="md"
            type="secondary"
            @click="showTaskCreationModal = false">
            Fermer
          </base-button>
          <base-button
            size="md"
            type="primary"
            native-type="submit">
            Ajouter
          </base-button>
        </template>
      </modal>
    </form>

    <!-- =============================== -->
    <!-- == TASK MODIFICATION MODAL ==== -->
    <!-- =============================== -->
    <form
      class="needs-validation"
      data-vv-scope="modification-form"
      @submit.prevent="handleTaskModifySubmit">
      <modal :show.sync="showTaskModificationModal">
        <template slot="header">
          <h5 class="modal-title">Modification</h5>
        </template>

        <div class="row">
          <div class="col-md-6">
            <base-input
              v-validate="'required|min:2|max:50'"
              v-model="taskModificationForm.title"
              :error="getError('titre')"
              :valid="isValid('titre')"
              name="titre"
              label="Titre"
              placeholder="Titre"/>
          </div>

          <div class="col-md-6">
            <base-input
              :error="getError('type')"
              :valid="isValid('type')"
              label="Type">
              <select
                v-validate="'required|valid_task_type'"
                v-model="taskModificationForm.type"
                name="type"
                class="form-control">
                <option
                  value=""
                  hidden>Séléctionnez un type</option>
                <option value="homework">Devoirs</option>
                <option value="DS">Contrôle</option>
                <option value="task">Tâche</option>
              </select>
            </base-input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <base-input
              v-validate="'min:2|max:50'"
              v-model="taskModificationForm.subject"
              :error="getError('matière')"
              :valid="isValid('matière')"
              name="matière"
              label="Matière (facultatif)"
              placeholder="Matière"/>
          </div>

          <div class="col-md-6">
            <base-input
              :error="getError('date')"
              :valid="isValid('date')"
              label="Date de rendu">
              <flat-picker
                slot-scope="{focus, blur}"
                v-model="taskModificationForm.date"
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
                v-validate="'min:2|max:1000'"
                v-model="taskModificationForm.description"
                name="description"
                class="form-control"
                rows="3"
                resize="none"
                placeholder="Entrez la description de la tâche..."/>
            </base-input>
          </div>
        </div>

        <template slot="footer">
          <base-button
            size="md"
            type="secondary"
            @click="showTaskModificationModal = false">
            Fermer
          </base-button>
          <base-button
            size="md"
            type="primary"
            native-type="submit">
            Modifier
          </base-button>
        </template>
      </modal>
    </form>

  </div>
</template>

<script>
import swal from 'sweetalert2'
import { mapGetters } from 'vuex'
import { BasePagination } from '@/components'
import { Table, TableColumn, Option, Select } from 'element-ui'
import FlatPicker from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import { French } from 'flatpickr/dist/l10n/fr.js'

import clientPaginationMixin from '@/mixins/clientPaginationMixin'
import dateUtilMixin from '@/mixins/dateUtilMixin'
import stringUtilMixin from '@/mixins/stringUtilMixin'

export default {
  name: 'Settings',
  components: {
    FlatPicker,
    BasePagination,
    [Option.name]: Option,
    [Select.name]: Select,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn
  },
  mixins: [clientPaginationMixin, dateUtilMixin, stringUtilMixin],
  data () {
    return {
      active: 1,
      tableData: [],
      propsToSearch: ['type', 'title', 'description', 'subject', 'author.firstname', 'author.lastname'],
      taskCreationForm: {
        type: '',
        date: new Date()
      },
      taskModificationForm: {
        type: '',
        date: new Date()
      },
      showTaskCreationModal: false,
      showTaskModificationModal: false,
      flatPickerConfig: {
        allowInput: true,
        locale: French,
        dateFormat: 'd-m-Y'
      }
    }
  },
  computed: {
    ...mapGetters({
      todoTasks: 'tasks/getTodo',
      doneTasks: 'tasks/getDone',
      notdoneTasks: 'tasks/getNotDone',
      allTasks: 'tasks/getAll'
    })
  },
  watch: {
    active: function (newActive) {
      this.searchQuery = ''
      switch (newActive) {
        case 1: this.tableData = this.todoTasks; break
        case 2: this.tableData = this.doneTasks; break
        case 3: this.tableData = this.notdoneTasks; break
        case 4: this.tableData = this.allTasks; break
      }
    }
  },
  mounted () {
    // load default table
    this.reloadTable()
  },
  methods: {
    getError (name) {
      return this.errors.first(name)
    },
    isValid (name) {
      return this.validated && !this.errors.has(name)
    },
    isDone (taskId) {
      return this.doneTasks.some(task => task._id === taskId)
    },
    reloadTable (page = 1) {
      setTimeout(() => {
        this.active = page
        switch (page) {
          case 1: this.tableData = this.todoTasks; break
          case 2: this.tableData = this.doneTasks; break
          case 3: this.tableData = this.notdoneTasks; break
          case 4: this.tableData = this.allTasks; break
        }
        this.initFuseSearch(this.allTasks)
      }, 100)
    },
    handleTaskCreateSubmit (scope) {
      // vérification validation des champs
      this.$validator.validateAll(scope).then(valid => {
        if (!valid) return

        this.$store.dispatch('tasks/create', this.taskCreationForm).then(response => {
          // reset the form
          this.taskCreationForm = { type: '', date: new Date() }
          // close the modal
          this.showTaskCreationModal = false

          this.reloadTable()
        })
      })
    },
    handleTaskModifySubmit (scope) {
      // vérification validation des champs
      this.$validator.validateAll(scope).then(valid => {
        if (!valid) return

        this.$store.dispatch('tasks/modify', this.taskModificationForm).then(response => {
          // reset the form
          this.taskModificationForm = { type: '', date: new Date() }
          // close the modal
          this.showTaskModificationModal = false

          this.reloadTable()
        })
      })
    },
    toggleDone (taskId) {
      if (this.isDone(taskId)) {
        this.$store.dispatch('account/setTaskNotDone', { taskId }).then(() => {
          this.reloadTable(2)
        })
      } else {
        this.$store.dispatch('account/setTaskDone', { taskId }).then(() => {
          this.reloadTable()
        })
      }
    },
    deleteTask (taskId) {
      swal.fire({
        title: `Êtes-vous sûr de vouloir supprimer cette tâche ?`,
        text: 'Elle ne sera plus visible pour aucun des utilisateurs qui lui sont associés.',
        type: 'warning',
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
        this.$store.dispatch('tasks/delete', { taskId }).then(() => {
          this.reloadTable()
        })
      })
    }
  }
}
</script>

<style lang="scss">
  #tasksTable {
    table tr td:first-child {
      padding-right: 0 !important;
    }

    table tr td:nth-child(2) {
      padding-bottom: 0 !important;
    }

    table tr td:nth-child(3) {
      padding-left: 0 !important;
      padding-right: 0 !important;
    }

    table tr td:nth-child(4) {
      padding-left: 0 !important;
      padding-right: 0 !important;
    }
  }

  .is-done-checkbox:hover {
    color: white !important;
  }
</style>
