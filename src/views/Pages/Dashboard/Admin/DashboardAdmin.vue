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
    <div class="container-fluid mt--6">
      <div class="row">
        <div class="col-xl-3 col-md-6">
          <toggle-register/>
        </div>
        <div class="col-xl-3 col-md-6">
          <toggle-login/>
        </div>
        <div class="col-xl-3 col-md-6">
          <disconnect-users/>
        </div>
        <div class="col-xl-3 col-md-6">
          <migrate-users/>
        </div>

        <div class="col-lg-6">
          <create-notifications/>
        </div>

        <div class="col-lg-6">
          <div class="row">
            <div class="col-xl-6 col-md-12">
              <delete-tasks/>
            </div>
            <div class="col-xl-6 col-md-12">
              <delete-grades/>
            </div>
          </div>

          <div class="row">
            <div class="col-12">
              <create-email/>
            </div>
          </div>
        </div>

        <div class="col-xl-3 col-md-6">
          <toggle-edit-group/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ToggleLogin from './Widgets/ToggleLogin'
import ToggleRegister from './Widgets/ToggleRegister'
import DisconnectUsers from './Widgets/DisconnectUsers'
import MigrateUsers from './Widgets/MigrateUsers'
import DeleteTasks from './Widgets/DeleteTasks'
import DeleteGrades from './Widgets/DeleteGrades'
import CreateNotifications from './Widgets/CreateNotifications'
import CreateEmail from './Widgets/CreateEmail'
import ToggleEditGroup from './Widgets/ToggleEditGroup'

export default {
  components: {
    ToggleLogin,
    ToggleRegister,
    DisconnectUsers,
    MigrateUsers,
    DeleteTasks,
    DeleteGrades,
    CreateNotifications,
    CreateEmail,
    ToggleEditGroup
  },
  mounted () {
    this.$store.dispatch('sysconf/fetchSettings')
  }
}
</script>
