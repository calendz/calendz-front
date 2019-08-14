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
              <!-- <div
                v-for="(item, index) in menu"
                :key="index"
                class="mb-2">
                <base-button
                  :type="item.isActive ? 'primary' : 'white'"
                  size="m"
                  class="w-100"
                  @click="setActive(index)">
                  {{ item.title }}
                </base-button>
              </div> -->
              <ul class="list-group">
                <li
                  v-for="(item, index) in menu"
                  :key="index"
                  :class="item.isActive ? 'bg-primary text-white' : 'bg-white text-primary'"
                  class="list-group-item d-flex justify-content-between align-items-center"
                  @click="setActive(index)">
                  {{ item.title }}
                  <badge
                    type="primary"
                    pill>
                    {{ item.amount || 0 }}
                  </badge>
                </li>
              </ul>
            </div>

            <!-- content -->
            <div class="col-sm-10">
              <div class="card bg-white shadow">
                <div class="card-header border-0">
                  <h3 class="mb-0">Gérez vos notifications</h3>
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
      menu: [
        {
          title: 'Non-lues',
          isActive: true,
          amount: '?'
        },
        {
          title: 'Lues',
          isActive: false,
          amount: '?'
        },
        {
          title: 'Toutes',
          isActive: false,
          amount: '?'
        }
      ],
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
  mounted () {
    // load default table (besoin du timeout pcq vuex prend tu temps à s'actualiser)
    setTimeout(() => {
      this.setActive(0)
      this.menu = [
        {
          title: 'Non-lues',
          isActive: true,
          amount: this.notReadNotifications.length
        },
        {
          title: 'Lues',
          isActive: false,
          amount: this.readNotifications.length
        },
        {
          title: 'Toutes',
          isActive: false,
          amount: this.allNotifications.length
        }
      ]
    }, 50)
  },
  methods: {
    setActive (index) {
      this.menu.forEach(element => { element.isActive = false })
      this.menu[index].isActive = true

      switch (this.menu[index].title) {
        case 'Non-lues': this.tableData = this.notReadNotifications; break
        case 'Lues': this.tableData = this.readNotifications; break
        case 'Toutes': this.tableData = this.allNotifications; break
      }
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
