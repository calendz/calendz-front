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
        <div class="col-xl-3 col-md-5">
          <toggle-register/>
        </div>
        <div class="col-xl-3 col-md-5">
          <toggle-login
            :status="login"
            @input="toggleLogin($event)"/>
        </div>
        <div class="col-lg-5">
          <create-notifications/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ToggleLogin from './Widgets/ToggleLogin'
import ToggleRegister from './Widgets/ToggleRegister'
import CreateNotifications from './Widgets/CreateNotifications'

export default {
  components: {
    ToggleLogin,
    ToggleRegister,
    CreateNotifications
  },
  data () {
    return {
      login: true
    }
  },
  methods: {
    toggleLogin (element) {
      // disable the switch and re-enable it after 5 seconds
      element.disabled = true
      setTimeout(() => {
        element.disabled = false
      }, 5000)

      this.login = !this.login
      console.log(this.login)
      // this.$store.dispatch('system/toggleLogin', { value: element.checked })
    }
  }
}
</script>
