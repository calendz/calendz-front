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
          <h6 class="h2 text-white d-inline-block mb-0">Paramètres</h6>
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
      <div
        class="row"
        style="margin:15px">
        <div class="col-md-5">
          <card type="frame">
            <div>
              <h3 class="text-center">Mes paramètres</h3>
              <br>
              <div class="row">
                <div class="col-md-8">
                  <h5>Je souhaite recevoir des mails de la part de Calendz</h5>
                </div>
                <div class="col-md-2">
                  <base-switch
                    :value="user.isSubMail"
                    on-text="Oui"
                    off-text="Non"
                    @input="toggleRead($event, user._id)"/>
                </div>
              </div>
              <div class="row mt-2">
                <div class="col-md-8">
                  <h5>Dark-Mode</h5>
                </div>
                <div class="col-md-2">
                  <base-switch
                    v-model="switcheDarkMode.off"
                    disabled
                    on-text="Oui"
                    off-text="Non"/>
                </div>
              </div>
            </div>
          </card>
        </div>
      </div>
      <div
        class="row"
        style="margin:15px"/>
    </div>
  </div>
</template>
<script>
import RouteBreadCrumb from '@/components/Breadcrumb/RouteBreadcrumb'
import { mapState } from 'vuex'

export default {
  name: 'Settings',
  components: {
    RouteBreadCrumb
  },
  data () {
    return {
      switcheMail: {
        off: false,
        on: true
      },
      switcheDarkMode: {
        off: false,
        on: true
      }
    }
  },
  computed: {
    ...mapState({
      user: state => state.account.user
    })
  },
  methods: {
    toggleRead (element, userId) {
      // disable the switch and re-enable it after 5 seconds
      element.disabled = true
      setTimeout(() => {
        element.disabled = false
      }, 5000)

      let isSubMail
      if (element.checked) {
        isSubMail = true
      } else {
        isSubMail = false
      }
      this.$store.dispatch('account/isSubMail', { isSubMail })
    }
  }
}
</script>
