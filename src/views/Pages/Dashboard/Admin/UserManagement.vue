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
    <!-- == Main =============================== -->
    <!-- ======================================= -->
    <div class="container-fluid mt--6 card-wrapper">
      <card
        class="no-border-card"
        body-classes="px-0 pb-1"
        footer-classes="pb-2">
        <template slot="header">
          <h3 class="mb-0">Gestion des utilisateurs</h3>
          <p class="text-sm mb-0">
            Recherchez, modifiez, ou encore supprimez n'importe quel utilisateur du site.
          </p>
        </template>
        <div>
          <div class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap">
            <el-select
              v-model="pagination.perPage"
              class="select-primary pagination-select"
              placeholder="Par page">
              <el-option
                v-for="item in pagination.perPageOptions"
                :key="item"
                :label="item"
                :value="item"
                class="select-primary"
              />
            </el-select>

            <div>
              <base-input
                v-model="searchQuery"
                prepend-icon="fas fa-search"
                placeholder="Rechercher..."/>
            </div>
          </div>
          <el-table
            :data="queriedData"
            row-key="id"
            header-row-class-name="thead-light"
            @sort-change="sortChange">

            <!-- profile picture -->
            <el-table-column
              width="85px"
              min-width="85px"
              class="text-center">
              <template v-slot="{row}">
                <div class="d-flex justify-content-center">
                  <img
                    src="img/theme/default-pp.svg"
                    alt="Photo de profil"
                    class="avatar avatar-sm rounded-circle">
                </div>
              </template>
            </el-table-column>

            <el-table-column
              v-for="column in tableColumns"
              :key="column.label"
              v-bind="column"
            />

            <!-- bts -->
            <el-table-column
              label="BTS"
              width="100px"
              min-width="100px"
              class="text-center"
              prop="row.bts"
              sortable>
              <template v-slot="{row}">
                <div class="d-flex">
                  <div class="col-auto text-center pl-1 pr-0">
                    {{ row.bts ? 'Oui' : 'Non' }}
                  </div>
                </div>
              </template>
            </el-table-column>

            <!-- permissionLevel -->
            <el-table-column
              label="Rôle"
              width="110px"
              min-width="110px"
              class="text-center"
              prop="row.permissionLevel"
              sortable>
              <template v-slot="{row}">
                <div class="d-flex">
                  <div class="col-auto text-center pl-1 pr-0">
                    {{ row.permissionLevel }}
                  </div>
                </div>
              </template>
            </el-table-column>

            <!-- register date -->
            <el-table-column
              label="Inscription"
              width="150px"
              min-width="150px"
              class="text-center"
              prop="row.creationDate"
              sortable>
              <template v-slot="{row}">
                <div class="d-flex">
                  <div class="col-auto text-center pl-1 pr-0">
                    {{ timestampToDate(row.creationDate) }}
                  </div>
                </div>
              </template>
            </el-table-column>

            <!-- isActive -->
            <el-table-column
              label="Actif"
              width="105px"
              min-width="105px"
              class="text-center"
              prop="row.isActive"
              sortable>
              <template v-slot="{row}">
                <div class="d-flex">
                  <div class="col-auto text-center pl-1 pr-0">
                    {{ row.isActive ? 'Oui' : 'Non' }}
                  </div>
                </div>
              </template>
            </el-table-column>

            <!-- actions -->
            <el-table-column
              min-width="130px"
              width="130px"
              align="right"
              label="Actions">
              <div class="d-flex">
                <base-button
                  class="edit"
                  type="info"
                  size="sm"
                  icon>
                  <i class="text-white ni ni-ruler-pencil"/>
                </base-button>
                <base-button
                  class="remove btn-link"
                  type="danger"
                  size="sm"
                  icon>
                  <i class="text-white fas fa-trash"/>
                </base-button>
              </div>
            </el-table-column>

          </el-table>
        </div>
        <div
          slot="footer"
          class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap">
          <div class="">
            <p class="card-category">
              Affichage de  {{ from + 1 }} à {{ to }} d'un total de {{ total }} entrées
            </p>

          </div>
          <base-pagination
            v-model="pagination.currentPage"
            :per-page="pagination.perPage"
            :total="total"
            class="pagination-no-border"
          />
        </div>
      </card>
    </div>
  </div>
</template>
<script>
import { BasePagination } from '@/components'
import { Table, TableColumn, Option, Select } from 'element-ui'
import RouteBreadCrumb from '@/components/Breadcrumb/RouteBreadcrumb'
import clientPaginationMixin from '@/mixins/clientPaginationMixin'
import dateUtilMixin from '@/mixins/dateUtilMixin'
import UserService from '@/services/user.service'

export default {
  components: {
    BasePagination,
    RouteBreadCrumb,
    [Option.name]: Option,
    [Select.name]: Select,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn
  },
  mixins: [clientPaginationMixin, dateUtilMixin],
  data () {
    return {
      propsToSearch: ['firstname', 'lastname', 'grade', 'email', 'permissionLevel'],
      tableColumns: [
        {
          prop: 'firstname',
          label: 'Prénom',
          minWidth: 125,
          sortable: true
        },
        {
          prop: 'lastname',
          label: 'Nom',
          minWidth: 120,
          sortable: true
        },
        {
          prop: 'grade',
          label: 'Classe',
          minWidth: 100,
          sortable: true
        },
        {
          prop: 'email',
          label: 'Adresse mail',
          minWidth: 120,
          sortable: true
        }
      ],
      tableData: []
    }
  },
  created () {
    UserService.getAll().then(res => {
      this.tableData = res.users
      this.isFuseSearchReady = true
    })
  }
}
</script>
