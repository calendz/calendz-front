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
          <h6 class="h2 text-white d-inline-block mb-0">Statistiques</h6>
          <nav
            aria-label="breadcrumb"
            class="d-none d-md-inline-block ml-md-4">
            <route-bread-crumb/>
          </nav>
        </div>
      </div>

      <div class="row">
        <!-- total users  -->
        <div class="col-xl-3 col-md-6">
          <card class="card-stats">
            <div class="row">
              <div class="col">
                <slot>
                  <h5 class="card-title text-uppercase text-muted mb-1">UTILISATEURS</h5>
                  <div class="row mt-2 mb--3">
                    <div class="col-12 pr-0">
                      <div v-if="!stats.users">
                        <placeholder class="w-75"/>
                      </div>

                      <div v-if="stats.users">
                        <span class="h2 font-weight-bold mt--1 mr-2 float-left">
                          {{ stats.users.total }}
                        </span>
                        <span class="text-muted">
                          {{ `(au total)` }}
                        </span>
                      </div>
                    </div>
                  </div>
                </slot>
              </div>

              <div class="col-auto">
                <slot name="icon">
                  <div class="icon icon-shape bg-gradient-success text-white rounded-circle shadow">
                    <i class="fas fa-users"/>
                  </div>
                </slot>
              </div>
            </div>

            <p class="mt-3 mb-0 text-sm">
              <slot name="footer">
                <i class="fas fa-external-link-alt mr-2"/>
                <router-link to="/user-management">
                  <span class="nav-link p-0 d-inline text-nowrap">accéder liste utilisateurs</span>
                </router-link>
              </slot>
            </p>
          </card>
        </div>

        <!-- inactive users -->
        <div class="col-xl-3 col-md-6">
          <card class="card-stats">
            <div class="row">
              <div class="col">
                <slot>
                  <h5 class="card-title text-uppercase text-muted mb-1">UTILISATEURS INACTIFS</h5>
                  <div class="row mt-2 mb--3">
                    <div class="col-12 pr-0">
                      <div v-if="!stats.users">
                        <placeholder class="w-75"/>
                      </div>

                      <div v-if="stats.users">
                        <span class="h2 font-weight-bold mt--1 mr-2 float-left">
                          {{ `${stats.users.inactive}/${stats.users.total}` }}
                        </span>
                        <span class="text-muted">
                          {{ `(${Math.ceil(stats.users.inactive/stats.users.total*100)}%)` }}
                        </span>
                      </div>
                    </div>
                  </div>
                </slot>
              </div>

              <div class="col-auto">
                <slot name="icon">
                  <div class="icon icon-shape bg-gradient-warning text-white rounded-circle shadow">
                    <i class="fas fa-users"/>
                  </div>
                </slot>
              </div>
            </div>

            <p class="mt-3 mb-0 text-sm">
              <slot name="footer">
                <i class="fas fa-external-link-alt mr-2"/>
                <router-link to="/user-management">
                  <span class="nav-link p-0 d-inline text-nowrap">accéder liste utilisateurs</span>
                </router-link>
              </slot>
            </p>
          </card>
        </div>

        <!-- users that are accepting mails -->
        <div class="col-xl-3 col-md-6">
          <card class="card-stats">
            <div class="row">
              <div class="col">
                <slot>
                  <h5 class="card-title text-uppercase text-muted mb-1">MAILING LIST</h5>
                  <div class="row mt-2 mb--3">
                    <div class="col-12 pr-0">
                      <div v-if="!stats.users">
                        <placeholder class="w-75"/>
                      </div>

                      <div v-if="stats.users">
                        <span class="h2 font-weight-bold mt--1 mr-2 float-left">
                          {{ `${stats.users.mailing}/${stats.users.total}` }}
                        </span>
                        <span class="text-muted">
                          {{ `(${Math.ceil(stats.users.mailing/stats.users.total*100)}%)` }}
                        </span>
                      </div>
                    </div>
                  </div>
                </slot>
              </div>

              <div class="col-auto">
                <slot name="icon">
                  <div class="icon icon-shape bg-gradient-info text-white rounded-circle shadow">
                    <i class="fas fa-users"/>
                  </div>
                </slot>
              </div>
            </div>

            <p class="mt-3 mb-0 text-sm">
              <slot name="footer">
                <i class="fas fa-external-link-alt mr-2"/>
                <router-link to="/user-management">
                  <span class="nav-link p-0 d-inline text-nowrap">accéder liste utilisateurs</span>
                </router-link>
              </slot>
            </p>
          </card>
        </div>

        <!-- users doing bts -->
        <div class="col-xl-3 col-md-6">
          <card class="card-stats">
            <div class="row">
              <div class="col">
                <slot>
                  <h5 class="card-title text-uppercase text-muted mb-1">INSCRITS EN BTS</h5>
                  <div class="row mt-2 mb--3">
                    <div class="col-12 pr-0">
                      <div v-if="!stats.users">
                        <placeholder class="w-75"/>
                      </div>

                      <div v-if="stats.users">
                        <span class="h2 font-weight-bold mt--1 mr-2 float-left">
                          {{ `${stats.users.bts}/${stats.users.total}` }}
                        </span>
                        <span class="text-muted">
                          {{ `(${Math.ceil(stats.users.bts/stats.users.total*100)}%)` }}
                        </span>
                      </div>
                    </div>
                  </div>
                </slot>
              </div>

              <div class="col-auto">
                <slot name="icon">
                  <div class="icon icon-shape bg-gradient-purple text-white rounded-circle shadow">
                    <i class="fas fa-users"/>
                  </div>
                </slot>
              </div>
            </div>

            <p class="mt-3 mb-0 text-sm">
              <slot name="footer">
                <i class="fas fa-external-link-alt mr-2"/>
                <router-link to="/user-management">
                  <span class="nav-link p-0 d-inline text-nowrap">accéder liste utilisateurs</span>
                </router-link>
              </slot>
            </p>
          </card>
        </div>
      </div>
    </base-header>

    <!-- ======================================= -->
    <!-- == Main =============================== -->
    <!-- ======================================= -->
    <div class="container-fluid mt--6 card-wrapper">
      <div class="row">

        <!-- grades repartition -->
        <div class="col-xl-4">
          <card>
            <template slot="header">
              <h6 class="surtitle">UTILISATEURS</h6>
              <h5 class="h3 mb-0">Répartition des classes</h5>
            </template>
            <div class="chart">
              <pie-chart
                :height="350"
                :chart-data="pieChart.chartData"
                :extra-options="pieChart.extraOptions"
              />
            </div>
          </card>
        </div>

        <!-- campus + grade repartition -->
        <div class="col-xl-8">
          <card>
            <template slot="header">
              <h6 class="surtitle">UTILISATEURS</h6>
              <h5 class="h3 mb-0">Répartion des campus (et des classes)</h5>
            </template>
            <div class="chart-area">
              <bar-chart
                :height="350"
                :chart-data="barChartStacked.chartData"
                :extra-options="barChartStacked.extraOptions"
              />
            </div>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import BarChart from '@/components/Charts/BarChart'
import PieChart from '@/components/Charts/PieChart'
import { Charts } from '@/components/Charts/config'

export default {
  components: {
    BarChart,
    PieChart
  },
  computed: {
    ...mapGetters({
      stats: 'sysconf/getStats'
    }),
    pieChart () {
      return {
        chartData: {
          labels: [
            'B1',
            'B2',
            'B3',
            'I1',
            'I2'
          ],
          datasets: [{
            data: [
              this.stats.grades ? this.stats.grades.b1 : 0,
              this.stats.grades ? this.stats.grades.b2 : 0,
              this.stats.grades ? this.stats.grades.b3 : 0,
              this.stats.grades ? this.stats.grades.i1 : 0,
              this.stats.grades ? this.stats.grades.i2 : 0
            ],
            backgroundColor: [
              Charts.colors.theme['info'],
              Charts.colors.theme['primary'],
              Charts.colors.theme['success'],
              Charts.colors.theme['warning'],
              Charts.colors.theme['danger']
            ]
          }]
        },
        extraOptions: {
          responsive: true,
          animation: {
            animateScale: true,
            animateRotate: true
          }
        }
      }
    },
    barChartStacked () {
      return {
        chartData: {
          labels: ['Arras', 'Auxerre', 'Bordeaux', 'Brest', 'Grenoble', 'Lille', 'Lyon', 'Montpellier', 'Nantes', 'Paris', 'Dakar'],
          datasets: [{
            label: 'B1',
            backgroundColor: Charts.colors.theme['info'],
            data: [
              this.stats.cities ? this.stats.cities.arras.b1 : 0,
              this.stats.cities ? this.stats.cities.auxerre.b1 : 0,
              this.stats.cities ? this.stats.cities.bordeaux.b1 : 0,
              this.stats.cities ? this.stats.cities.brest.b1 : 0,
              this.stats.cities ? this.stats.cities.grenoble.b1 : 0,
              this.stats.cities ? this.stats.cities.lille.b1 : 0,
              this.stats.cities ? this.stats.cities.lyon.b1 : 0,
              this.stats.cities ? this.stats.cities.montpellier.b1 : 0,
              this.stats.cities ? this.stats.cities.nantes.b1 : 0,
              this.stats.cities ? this.stats.cities.paris.b1 : 0,
              this.stats.cities ? this.stats.cities.dakar.b1 : 0
            ]
          }, {
            label: 'B2',
            backgroundColor: Charts.colors.theme['primary'],
            data: [
              this.stats.cities ? this.stats.cities.arras.b2 : 0,
              this.stats.cities ? this.stats.cities.auxerre.b2 : 0,
              this.stats.cities ? this.stats.cities.bordeaux.b2 : 0,
              this.stats.cities ? this.stats.cities.brest.b2 : 0,
              this.stats.cities ? this.stats.cities.grenoble.b2 : 0,
              this.stats.cities ? this.stats.cities.lille.b2 : 0,
              this.stats.cities ? this.stats.cities.lyon.b2 : 0,
              this.stats.cities ? this.stats.cities.montpellier.b2 : 0,
              this.stats.cities ? this.stats.cities.nantes.b2 : 0,
              this.stats.cities ? this.stats.cities.paris.b2 : 0,
              this.stats.cities ? this.stats.cities.dakar.b2 : 0
            ]
          }, {
            label: 'B3',
            backgroundColor: Charts.colors.theme['success'],
            data: [
              this.stats.cities ? this.stats.cities.arras.b3 : 0,
              this.stats.cities ? this.stats.cities.auxerre.b3 : 0,
              this.stats.cities ? this.stats.cities.bordeaux.b3 : 0,
              this.stats.cities ? this.stats.cities.brest.b3 : 0,
              this.stats.cities ? this.stats.cities.grenoble.b3 : 0,
              this.stats.cities ? this.stats.cities.lille.b3 : 0,
              this.stats.cities ? this.stats.cities.lyon.b3 : 0,
              this.stats.cities ? this.stats.cities.montpellier.b3 : 0,
              this.stats.cities ? this.stats.cities.nantes.b3 : 0,
              this.stats.cities ? this.stats.cities.paris.b3 : 0,
              this.stats.cities ? this.stats.cities.dakar.b3 : 0
            ]
          }, {
            label: 'I1 ',
            backgroundColor: Charts.colors.theme['warning'],
            data: [
              this.stats.cities ? this.stats.cities.arras.i1 : 0,
              this.stats.cities ? this.stats.cities.auxerre.i1 : 0,
              this.stats.cities ? this.stats.cities.bordeaux.i1 : 0,
              this.stats.cities ? this.stats.cities.brest.i1 : 0,
              this.stats.cities ? this.stats.cities.grenoble.i1 : 0,
              this.stats.cities ? this.stats.cities.lille.i1 : 0,
              this.stats.cities ? this.stats.cities.lyon.i1 : 0,
              this.stats.cities ? this.stats.cities.montpellier.i1 : 0,
              this.stats.cities ? this.stats.cities.nantes.i1 : 0,
              this.stats.cities ? this.stats.cities.paris.i1 : 0,
              this.stats.cities ? this.stats.cities.dakar.i1 : 0
            ]
          }, {
            label: 'I2 ',
            backgroundColor: Charts.colors.theme['danger'],
            data: [
              this.stats.cities ? this.stats.cities.arras.i2 : 0,
              this.stats.cities ? this.stats.cities.auxerre.i2 : 0,
              this.stats.cities ? this.stats.cities.bordeaux.i2 : 0,
              this.stats.cities ? this.stats.cities.brest.i2 : 0,
              this.stats.cities ? this.stats.cities.grenoble.i2 : 0,
              this.stats.cities ? this.stats.cities.lille.i2 : 0,
              this.stats.cities ? this.stats.cities.lyon.i2 : 0,
              this.stats.cities ? this.stats.cities.montpellier.i2 : 0,
              this.stats.cities ? this.stats.cities.nantes.i2 : 0,
              this.stats.cities ? this.stats.cities.paris.i2 : 0,
              this.stats.cities ? this.stats.cities.dakar.i2 : 0
            ]
          }]

        },
        extraOptions: {
          tooltips: {
            mode: 'index',
            intersect: false
          },
          responsive: true,
          scales: {
            xAxes: [{
              stacked: true
            }],
            yAxes: [{
              stacked: true
            }]
          }
        }
      }
    }
  },
  created () {
    this.$store.dispatch('sysconf/fetchStats')
  }
}
</script>
