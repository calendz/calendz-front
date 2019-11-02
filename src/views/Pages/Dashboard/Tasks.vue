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
                      <h3 class="mb-0">Gérez vos devoirs & autres tâches...</h3>
                    </div>
                    <div class="col-lg-5">
                      <base-input
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
                    :data="queriedData"
                    row-key="id"
                    class="table-responsive table-light"
                    header-row-class-name="thead-light">

                    <!-- type -->
                    <el-table-column
                      width="62px"
                      min-width="62px"
                      class="text-center">
                      <template v-slot="{row}">
                        <div class="d-flex justify-content-center">
                          <el-tooltip
                            :content="row.type === 'homework'
                              ? 'Devoirs'
                              : row.type === 'task'
                                ? 'Tâche'
                                : 'Contrôle'
                            "
                            placement="top">
                            <i
                              :class="row.type === 'homework'
                                ? 'fa-book bg-primary'
                                : row.type === 'task'
                                  ? 'fa-tasks bg-info'
                                  : 'fa-graduation-cap bg-warning'
                              "
                              class="fas avatar avatar-sm rounded-circle"/>
                          </el-tooltip>
                        </div>
                      </template>
                    </el-table-column>

                    <!-- title, author, description & subject -->
                    <el-table-column
                      label="Titre et description"
                      min-width="250px">
                      <template v-slot="{row}">
                        <div class="container p-0">
                          <!-- title -->
                          <span
                            class="h4 text-sm"
                            v-html="row.title"/>
                          <!-- author -->
                          <span class="text-muted mr-1"> par</span>
                          <el-tooltip
                            :content="`${row.author.firstname} ${row.author.lastname}`"
                            placement="top"
                            class="avatar avatar-sm rounded-circle bg-warning">
                            <img
                              :src="row.author.avatarUrl || 'img/theme/default-pp.png'"
                              alt="Photo de profil"
                              class="rounded-circle avatar rounded-circle"
                              style="width: 20px; height: 20px;">
                          </el-tooltip>
                          <br>
                          <!-- description -->
                          <blockquote class="blockquote mb-3">
                            <p
                              class="mb-0 text-sm"
                              v-html="row.description || `<span class='text-muted'>Aucune description...</span>`"/>
                            <footer
                              v-show="row.subject"
                              class="blockquote-footer text-sm">
                              {{ capitalizeFirstLetter(row.subject.toLowerCase()) }}
                            </footer>
                          </blockquote>
                        </div>
                      </template>
                    </el-table-column>

                    <!-- date -->
                    <el-table-column
                      label="Date de rendu"
                      width="160px"
                      min-width="160px"
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
                            content="Marquer comme fait"
                            placement="top">
                            <base-button
                              :disabled="isDone(row._id)"
                              :outline="!isDone(row._id)"
                              :class="isDone(row._id) ? 'text-white' : 'text-success'"
                              size="sm"
                              type="success"
                              class="is-done-checkbox">
                              <i class="fas fa-check"/>
                            </base-button>
                          </el-tooltip>

                          <el-tooltip
                            content="Modifier"
                            placement="top">
                            <base-button
                              size="sm"
                              type="info">
                              <i class="text-white ni ni-ruler-pencil"/>
                            </base-button>
                          </el-tooltip>

                          <el-tooltip
                            content="Supprimer"
                            placement="top">
                            <base-button
                              size="sm"
                              type="danger"
                              class="remove btn-link">
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { BasePagination } from '@/components'
import { Table, TableColumn, Option } from 'element-ui'
import clientPaginationMixin from '@/mixins/clientPaginationMixin'
import dateUtilMixin from '@/mixins/dateUtilMixin'
import stringUtilMixin from '@/mixins/stringUtilMixin'

export default {
  name: 'Settings',
  components: {
    BasePagination,
    [Option.name]: Option,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn
  },
  mixins: [clientPaginationMixin, dateUtilMixin, stringUtilMixin],
  data () {
    return {
      active: 1,
      tableData: []
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
    // (besoin du timeout pcq vuex prend tu temps à s'actualiser)
    setTimeout(() => {
      this.tableData = this.todoTasks
    }, 100)
  },
  methods: {
    isDone (taskId) {
      return this.doneTasks.some(task => task._id === taskId)
    }
  }
}
</script>

<style lang="scss">
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

  .is-done-checkbox:hover {
    color: white !important;
  }
</style>
