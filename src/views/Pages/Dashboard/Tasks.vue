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
                  Non-faits
                  <badge
                    type="primary"
                    pill>
                    0
                    <!-- {{ notReadNotifications.length || 0 }} -->
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
                    0
                    <!-- {{ readNotifications.length || 0 }} -->
                  </badge>
                </li>
                <li
                  :class="active === 3 ? 'bg-primary text-white' : 'bg-white text-primary'"
                  class="list-group-item d-flex justify-content-between align-items-center hover-click"
                  @click="active = 3">
                  Tous
                  <badge
                    type="primary"
                    pill>
                    0
                    <!-- {{ allNotifications.length || 0 }} -->
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
                      width="85px"
                      min-width="85px"
                      class="text-center">
                      <template v-slot="{row}">
                        <div class="d-flex justify-content-center">
                          <i class="fas fa-book bg-primary avatar avatar-sm rounded-circle"/>
                        </div>
                      </template>
                    </el-table-column>

                    <!-- title -->
                    <el-table-column
                      label="Titre"
                      min-width="120px"
                      class="text-center">
                      <template v-slot="{row}">
                        <div class="d-flex">
                          <div class="col-auto text-left pl-1 pr-0">
                            <span v-html="row.title"/>
                          </div>
                        </div>
                      </template>
                    </el-table-column>

                    <!-- message -->
                    <el-table-column
                      label="Message"
                      min-width="200px"
                      class="text-center">
                      <template v-slot="{row}">
                        <div class="d-flex">
                          <div class="col-auto text-left pl-1 pr-0">
                            <span v-html="row.message"/>
                          </div>
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
      tableColumns: [
        {
          prop: 'title',
          label: 'Titre',
          minWidth: 120,
          sortable: false
        },
        {
          prop: 'message',
          label: 'Message',
          minWidth: 220,
          sortable: false
        }
      ],
      tableData: []
    }
  },
  computed: {
    ...mapGetters({
    })
  },
  watch: {
    active: function (newActive) {
      switch (newActive) {
        case 1: this.tableData = this.notReadNotifications; break
        case 2: this.tableData = this.readNotifications; break
        case 3: this.tableData = this.allNotifications; break
      }
    }
  },
  mounted () {
    // load default table (besoin du timeout pcq vuex prend tu temps à s'actualiser)
    setTimeout(() => {
      // this.tableData = this.notReadNotifications
    }, 100)
  },
  methods: {
  }
}
</script>
