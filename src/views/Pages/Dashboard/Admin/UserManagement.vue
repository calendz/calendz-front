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
              <template v-slot="{row}">
                <div class="d-flex">
                  <base-button
                    class="edit"
                    type="info"
                    size="sm"
                    icon
                    @click="modal = true, modifyForm = editInformations(row)">
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
              </template>
            </el-table-column>

          </el-table>

          <!-- modal -->
          <form
            class="needs-validation"
            @submit.prevent="handleSubmit">
            <modal
              :show.sync="modal"
              @close="editInformationsReverse(modifyForm)">
              <template slot="header">
                <h5 class="modal-title">Modifier les informations de {{ modifyForm.firstname + " " + modifyForm.lastname }}</h5>
              </template>

              <div class="row">
                <div class="col-md-6">
                  <base-input
                    v-validate="'required|min:3|max:32'"
                    v-model="modifyForm.firstname"
                    :error="getError('prénom')"
                    :valid="isValid('prénom')"
                    name="prénom"
                    class="mb-3"
                    prepend-icon="ni ni-single-02"
                    placeholder="Prénom"
                    label="Prénom"/>
                </div>
                <div class="col-md-6">
                  <base-input
                    v-validate="'required|min:3|max:32'"
                    v-model="modifyForm.lastname"
                    :error="getError('nom')"
                    :valid="isValid('nom')"
                    name="nom"
                    class="mb-3"
                    prepend-icon="ni ni-single-02"
                    placeholder="Nom"
                    label="Nom"/>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <base-input
                    v-validate="'required|email|email_epsi_wis|min:12|max:64'"
                    v-model="modifyForm.email"
                    :error="getError('email')"
                    :valid="isValid('email')"
                    name="email"
                    class="mb-3"
                    prepend-icon="ni ni-email-83"
                    placeholder="Adresse mail"
                    label="Adresse mail"/>
                </div>
                <div class="col-md-6">
                  <base-input
                    :error="getError('classe')"
                    :valid="isValid('classe')"
                    class="mb-3"
                    prepend-icon="ni ni-hat-3"
                    label="Classe">
                    <select
                      v-validate="'required|valid_grade'"
                      v-model="modifyForm.grade"
                      name="classe"
                      class="form-control">
                      <option
                        value=""
                        hidden>Séléctionnez la classe</option>
                      <option>B1 G1</option>
                      <option>B1 G2</option>
                      <option>B2 G1</option>
                      <option>B2 G2</option>
                      <option>B3 G1</option>
                      <option>B3 G2</option>
                      <option>B3 G3</option>
                      <option>I4 G1</option>
                      <option>I4 G2</option>
                      <option>I5 G1</option>
                      <option>I5 G2</option>
                    </select>
                  </base-input>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <base-input
                    class="mb-3"
                    label="Option BTS"
                    prepend-icon="ni ni-book-bookmark">
                    <select
                      v-validate="'required|valid_bts_option'"
                      v-model="modifyForm.bts"
                      name="bts"
                      class="form-control">
                      <option
                        value="null"
                        hidden>Selectionner l'option</option>
                      <option>Oui</option>
                      <option>Non</option>
                    </select>
                  </base-input>
                </div>
                <div class="col-md-6">
                  <base-input
                    class="mb-3"
                    label="Actif"
                    prepend-icon="ni ni-check-bold">
                    <select
                      v-validate="'required|valid_active'"
                      v-model="modifyForm.isActive"
                      name="active"
                      class="form-control">
                      <option
                        value="null"
                        hidden>Selectionner l'option</option>
                      <option>Oui</option>
                      <option>Non</option>
                    </select>
                  </base-input>
                </div>
                <div class="col-md-6">
                  <base-input
                    class="mb-3"
                    label="Rôle"
                    prepend-icon="ni ni-single-02">
                    <select
                      v-validate="'required|valid_role'"
                      v-model="modifyForm.permissionLevel"
                      name="permissions"
                      class="form-control">
                      <option
                        value="null"
                        hidden>Selectionner la permission</option>
                      <option>ADMIN</option>
                      <option>MEMBER</option>
                    </select>
                  </base-input>
                </div>
              </div>
              <template slot="footer">
                <base-button
                  type="secondary"
                  size="md"
                  @click="modal = false">Fermer</base-button>
                <base-button
                  size="md"
                  type="primary"
                  native-type="submit">Sauvegarder</base-button>
              </template>
          </modal></form>
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
          <!-- slt -->
        </div>
      </card>
    </div>
  </div>
</template>
<script>
import { BasePagination, Modal } from '@/components'
import { Table, TableColumn, Option, Select } from 'element-ui'
import RouteBreadCrumb from '@/components/Breadcrumb/RouteBreadcrumb'
import clientPaginationMixin from '@/mixins/clientPaginationMixin'
import dateUtilMixin from '@/mixins/dateUtilMixin'
import UserService from '@/services/user.service'
import { mapState } from 'vuex'

export default {
  components: {
    BasePagination,
    RouteBreadCrumb,
    [Option.name]: Option,
    [Select.name]: Select,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    Modal
  },
  mixins: [clientPaginationMixin, dateUtilMixin],
  data () {
    return {
      modal: false,
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
      tableData: [],
      toModify: '',
      modifyForm: {
        firstname: '',
        lastname: '',
        grade: '',
        email: ''
      }
    }
  },
  computed: {
    ...mapState({
      updateErrors: state => state.account.status.reason,
      updating: state => state.account.status.isUpdating
    })
  },
  created () {
    UserService.getAll().then(res => {
      this.tableData = res.users
      this.isFuseSearchReady = true
    })
  },
  methods: {
    getError (name) {
      return this.errors.first(name)
    },
    isValid (name) {
      return this.validated && !this.errors.has(name)
    },
    editInformations (value) {
      if (value.bts === true) {
        value.bts = 'Oui'
      } else {
        value.bts = 'Non'
      }
      if (value.isActive === true) {
        value.isActive = 'Oui'
      } else {
        value.isActive = 'Non'
      }
      return value
    },
    editInformationsReverse (value) {
      if (value.bts === 'Oui') {
        value.bts = true
      } else {
        value.bts = false
      }
      if (value.isActive === 'Oui') {
        value.isActive = true
      } else {
        value.isActive = false
      }
      return value
    },
    handleSubmit (e) {
      // vérification validation des champs
      this.$validator.validate().then(valid => {
        if (valid) {
          this.modifyForm = this.editInformationsReverse(this.modifyForm)
          // envoie de la requête d'actualisation
          this.$store.dispatch('account/update', this.modifyForm).then(response => {
            this.modal = false
          })
        }
      })
    }
  }
}
</script>
