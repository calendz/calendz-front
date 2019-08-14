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
          <h6 class="h2 text-white d-inline-block mb-0">Dashboard</h6>
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

            <!-- menu -->
            <div class="col-sm-2">
              <ul class="list-group">
                <li
                  :class="active === 1 ? 'bg-primary text-white' : 'bg-white text-primary'"
                  class="list-group-item d-flex justify-content-between align-items-center"
                  @click="active = 1">
                  Non-lues
                  <badge
                    type="primary"
                    pill>
                    {{ notReadNotifications.length || 0 }}
                  </badge>
                </li>
                <li
                  :class="active === 2 ? 'bg-primary text-white' : 'bg-white text-primary'"
                  class="list-group-item d-flex justify-content-between align-items-center"
                  @click="active = 2">
                  Lues
                  <badge
                    type="primary"
                    pill>
                    {{ readNotifications.length || 0 }}
                  </badge>
                </li>
                <li
                  :class="active === 3 ? 'bg-primary text-white' : 'bg-white text-primary'"
                  class="list-group-item d-flex justify-content-between align-items-center"
                  @click="active = 3">
                  Toutes
                  <badge
                    type="primary"
                    pill>
                    {{ allNotifications.length || 0 }}
                  </badge>
                </li>
              </ul>
            </div>

            <!-- content -->
            <div class="col-sm-10">
              <div class="card bg-white shadow">
                <div class="card-header border-0">
                  <div class="row align-items-center">
                    <div class="col">
                      <h3 class="mb-0">Gérez vos notifications</h3>
                    </div>
                    <div class="col text-right">
                      <base-button
                        :disabled="active === 2 || notReadNotifications.length < 1"
                        type="primary"
                        size="sm"
                        @click="readAllNotifications()">
                        Tout lire
                      </base-button>
                    </div>
                  </div>
                </div>
                <div>
                  <el-table
                    :data="queriedData"
                    row-key="id"
                    class="table-responsive table-light"
                    header-row-class-name="thead-light">

                    <!-- icon -->
                    <el-table-column
                      width="100px"
                      min-width="100px"
                      class="text-center">
                      <template v-slot="{row}">
                        <div class="d-flex justify-content-center">
                          <i
                            :class="row.icon"
                            class="avatar rounded-circle"/>
                        </div>
                      </template>
                    </el-table-column>

                    <!-- other columns -->
                    <el-table-column
                      v-for="column in tableColumns"
                      :key="column.label"
                      v-bind="column"
                    />

                    <!-- timestamp -->
                    <el-table-column
                      label="Date"
                      width="100px"
                      min-width="100px"
                      class="text-center">
                      <template v-slot="{row}">
                        <div class="d-flex">
                          <div class="col-auto text-left pl-1 pr-0">
                            <i class="fas fa-clock mr-1"/>
                            {{ formatDate(row.timestamp) }}
                          </div>
                        </div>
                      </template>
                    </el-table-column>

                    <!-- read/notread -->
                    <el-table-column
                      width="120px"
                      min-width="120px"
                      class="text-center">
                      <template v-slot="{row}">
                        <div class="d-flex justify-content-center">
                          <base-switch
                            :value="row.isRead"
                            on-text="Lue"
                            off-text="Lue"/>
                        </div>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
                <div
                  slot="footer"
                  class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap pt-4 pb-2">
                  <div>
                    <p class="card-category text-sm mb-0">
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
import RouteBreadCrumb from '@/components/Breadcrumb/RouteBreadcrumb'
import clientPaginationMixin from '../../../../mixins/clientPaginationMixin'

export default {
  name: 'Settings',
  components: {
    BasePagination,
    RouteBreadCrumb,
    [Option.name]: Option,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn
  },
  mixins: [clientPaginationMixin],
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
      allNotifications: 'notifications/all',
      notReadNotifications: 'notifications/notRead',
      readNotifications: 'notifications/read'
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
      this.tableData = this.notReadNotifications
    }, 100)
  },
  methods: {
    readAllNotifications () {
      this.$store.dispatch('notifications/readAll').then(() => {
        setTimeout(() => {
          this.active = 2
        }, 100)
      })
    },
    formatDate (timestamp) {
      const seconds = Math.floor(new Date().getTime() / 1000 - timestamp / 1000)
      if (seconds > 2 * 24 * 3600) return Math.floor(seconds / 3600 / 24) + 'j'
      if (seconds > 24 * 3600) return 'hier'
      if (seconds > 3600) return Math.floor(seconds / 3600) + 'h'
      if (seconds > 60) return Math.floor(seconds / 60) + 'm'
      if (seconds > 1) return seconds + 's'
      return '?? secondes'
    }
  }
}
</script>
