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
                  Non-faits
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
                    <div class="col">
                      <h3 class="mb-0">Gérez vos devoirs & autres tâches...</h3>
                    </div>
                    <div class="col">
                      <base-input
                        v-model="searchQuery"
                        prepend-icon="fas fa-search"
                        placeholder="Rechercher..."
                        class="my-auto"/>
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
                          <i class="fas fa-book bg-primary avatar avatar-sm rounded-circle"/>
                        </div>
                      </template>
                    </el-table-column>

                    <!-- title & description -->
                    <el-table-column
                      label="Titre et description"
                      min-width="250px"
                      class="text-center">
                      <template v-slot="{row}">
                        <div class="d-flex">
                          <div class="col-auto text-left px-0">
                            <span
                              class="h4"
                              v-html="row.title"/>
                            <br>
                            <span
                              v-html="row.description || 'Aucune description...'"/>
                          </div>
                        </div>
                      </template>
                    </el-table-column>

                    <!-- date -->
                    <el-table-column
                      label="Date"
                      width="200px"
                      min-width="200px"
                      class="text-center">
                      <template v-slot="{row}">
                        <span class="text-left">
                          {{ dateToFullString(timestampToDate(row.date)) }}
                        </span>
                      </template>
                    </el-table-column>

                    <!-- target -->
                    <el-table-column
                      label=""
                      width="120px"
                      min-width="120px"
                      class="text-center">
                      <template v-slot="{row}">
                        <!-- <span
                          v-if="row.city && row.grade && row.group"
                          class="text-left">
                          {{ `${row.grade} ${row.group}` }}
                        </span>
                        <span v-else> -->
                        <div class="avatar-group">
                          <el-tooltip
                            placement="top"
                            content="Jessica Rowland"
                            class="avatar avatar-xs rounded-circle">
                            <img
                              alt="Image placeholder"
                              src="img/theme/default-pp.png">
                          </el-tooltip>

                          <el-tooltip
                            placement="top"
                            content="Audrey Love"
                            class="avatar avatar-xs rounded-circle">
                            <img
                              alt="Image placeholder"
                              src="img/theme/default-pp.png">
                          </el-tooltip>

                          <el-tooltip
                            placement="top"
                            content="Michael Lewis"
                            class="avatar avatar-xs rounded-circle">
                            <img
                              alt="Image placeholder"
                              src="img/theme/default-pp.png">
                          </el-tooltip>
                        </div>
                        <!-- </span> -->
                      </template>
                    </el-table-column>

                    <!-- actions -->
                    <el-table-column
                      width="172px"
                      min-width="172px"
                      align="right"
                      label="Actions">
                      <template v-slot="{row}">
                        <div class="d-flex">

                          <el-tooltip
                            content="Marquer comme fait"
                            placement="top">
                            <base-button
                              :disabled="isDone(row._id)"
                              size="sm"
                              type="success">
                              <i class="text-white fas fa-check"/>
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

export default {
  name: 'Settings',
  components: {
    BasePagination,
    [Option.name]: Option,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn
  },
  mixins: [clientPaginationMixin, dateUtilMixin],
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
</style>
