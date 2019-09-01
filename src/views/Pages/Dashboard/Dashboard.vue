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
        <!-- <div class="col-lg-6 col-5 text-right">
          <base-button
            size="sm"
            type="neutral">New</base-button>
          <base-button
            size="sm"
            type="neutral">Filters</base-button>
        </div> -->
      </div>
      <!-- Card stats -->
      <div class="row">
        <div class="col-xl-3 col-md-6">
          <stats-card
            title="Total traffic"
            type="gradient-red"
            sub-title="350,897"
            icon="ni ni-active-40">

            <template slot="footer">
              <span class="text-success mr-2"><i class="fa fa-arrow-up"/> 3.48%</span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </div>
        <div class="col-xl-3 col-md-6">
          <stats-card
            title="Total traffic"
            type="gradient-orange"
            sub-title="2,356"
            icon="ni ni-chart-pie-35">

            <template slot="footer">
              <span class="text-success mr-2"><i class="fa fa-arrow-up"/> 12.18%</span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </div>
        <div class="col-xl-3 col-md-6">
          <a
            class="nav-link p-0"
            target="_blank"
            href="https://www.beecome.io/dashboard">
            <stats-card
              title="ACCÈS DIRECT À"
              type="gradient-blue"
              sub-title="beecome"
              icon="fas fa-bold">

              <template slot="footer">
                <span class="text-nowrap">cliquez pour accéder</span>
              </template>
            </stats-card>
          </a>

        </div>
        <div class="col-xl-3 col-md-6">
          <stats-card class="bg-gradient-default">
            <div class="row">
              <div class="col">
                <h5 class="card-title text-uppercase text-muted mb-0 text-white">DATE & HEURE</h5>
                <span class="h2 font-weight-bold mb-0 text-white">{{ currentTime }}</span>
              </div>
              <div class="col-auto">
                <div class="icon icon-shape bg-white text-dark rounded-circle shadow">
                  <i class="fas fa-clock"/>
                </div>
              </div>
            </div>
            <template slot="footer">
              <span class="text-nowrap text-white">{{ currentDate }}</span>
            </template>
          </stats-card>
        </div>
      </div>
    </base-header>

    <!-- ======================================= -->
    <!-- == Main =============================== -->
    <!-- ======================================= -->
    <div class="container-fluid mt--6">
      <div class="row">
        <div class="col-lg-4">
          <latest-notifications/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import LatestNotifications from './Widgets/LatestNotifications'
import RouteBreadCrumb from '@/components/Breadcrumb/RouteBreadcrumb'

export default {
  components: {
    RouteBreadCrumb,
    LatestNotifications
  },
  data () {
    return {
      currentTime: '--:--:--',
      currentDate: '----- -- ------'
    }
  },
  created () {
    this.updateDate()
    setInterval(() => {
      this.updateDate()
    }, 1000)
  },
  methods: {
    updateDate: function () {
      const date = new Date()
      this.currentTime = `${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}:${('0' + date.getSeconds()).slice(-2)}`

      const j = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche']
      const m = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']
      this.currentDate = `${j[date.getDay() - 1]} ${('0' + date.getDate()).slice(-2)} ${m[date.getMonth()]}`
    }
  }
}
</script>
