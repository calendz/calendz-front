<template>
  <div>
    <!-- ======================================= -->
    <!-- == "Base header" ====================== -->
    <!-- ======================================= -->
    <base-header
      type="primary"
      className="pb-6">
      <div className="row align-items-center py-4">
        <div className="col-lg-6 col-7">
          <h6 className="h2 text-white d-inline-block mb-0">Statistiques (tâches)</h6>
          <nav
            aria-label="breadcrumb"
            className="d-none d-md-inline-block ml-md-4">
            <route-bread-crumb/>
          </nav>
        </div>
      </div>

      <div className="row">
        <!-- total tasks  -->
        <div className="col-xl-3 col-md-6">
          <card class="card-stats">
            <div className="row">
              <div className="col">
                <slot>
                  <h5 className="card-title text-uppercase text-muted mb-1">TÂCHES</h5>
                  <div className="row mt-2 mb--3">
                    <div className="col-12 pr-0">
                      <div v-if="!stats.tasks">
                        <placeholder className="w-75"/>
                      </div>

                      <div v-if="stats.tasks">
                        <span className="h2 font-weight-bold mt--1 mr-2 float-left">
                          {{ stats.tasks.total }}
                        </span>
                        <span className="text-muted">
                          {{ `(au total)` }}
                        </span>
                      </div>
                    </div>
                  </div>
                </slot>
              </div>

              <div className="col-auto">
                <slot name="icon">
                  <div className="icon icon-shape bg-gradient-success text-white rounded-circle shadow">
                    <i className="fas fa-users"/>
                  </div>
                </slot>
              </div>
            </div>

            <p className="mt-3 mb-0 text-sm">
              <slot name="footer">
                <i className="fas fa-external-link-alt mr-2"/>
                <router-link to="/user-management">
                  <span className="nav-link p-0 d-inline text-nowrap">accéder liste utilisateurs</span>
                </router-link>
              </slot>
            </p>
          </card>
        </div>

        <!-- total future tasks  -->
        <div className="col-xl-3 col-md-6">
          <card class="card-stats">
            <div className="row">
              <div className="col">
                <slot>
                  <h5 className="card-title text-uppercase text-muted mb-1">TÂCHES À VENIR</h5>
                  <div className="row mt-2 mb--3">
                    <div className="col-12 pr-0">
                      <div v-if="!stats.tasks">
                        <placeholder className="w-75"/>
                      </div>

                      <div v-if="stats.tasks">
                        <span className="h2 font-weight-bold mt--1 mr-2 float-left">
                          {{ stats.tasks.upcoming }}
                        </span>
                        <span className="text-muted">
                          {{ `(${Math.ceil(stats.tasks.upcoming / stats.tasks.total * 100)}%)` }}
                        </span>
                      </div>
                    </div>
                  </div>
                </slot>
              </div>

              <div className="col-auto">
                <slot name="icon">
                  <div className="icon icon-shape bg-gradient-success text-white rounded-circle shadow">
                    <i className="fas fa-users"/>
                  </div>
                </slot>
              </div>
            </div>

            <p className="mt-3 mb-0 text-sm">
              <slot name="footer">
                <i className="fas fa-external-link-alt mr-2"/>
                <router-link to="/user-management">
                  <span className="nav-link p-0 d-inline text-nowrap">accéder liste utilisateurs</span>
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
    <div className="container-fluid mt--6 card-wrapper">
      <div className="row">
        <!-- grades repartition -->
        <div className="col-xl-4">
          <card>
            <template slot="header">
              <h6 className="surtitle">TÂCHES</h6>
              <h5 className="h3 mb-0">Répartition par classes</h5>
            </template>
            <div className="chart">
              <pie-chart
                :height="350"
                :chart-data="pieChart.chartData"
                :extra-options="pieChart.extraOptions"
              />
            </div>
          </card>
        </div>

        <!-- campus + grade repartition -->
        <div className="col-xl-8">
          <card>
            <template slot="header">
              <h6 className="surtitle">TÂCHES</h6>
              <h5 className="h3 mb-0">Répartion par campus (et classes)</h5>
            </template>
            <div className="chart-area">
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
import {mapGetters} from 'vuex'
import BarChart from '@/components/Charts/BarChart'
import PieChart from '@/components/Charts/PieChart'
import {Charts} from '@/components/Charts/config'

export default {
  components: {
    BarChart,
    PieChart
  },
  computed: {
    ...mapGetters({
      stats: 'sysconf/getTasksStats'
    }),
    pieChart() {
      return {
        chartData: {
          labels: [
            'SN1',
            'SN2',
            'B3',
            'I1',
            'I2'
          ],
          datasets: [{
            data: [
              this.stats.grades ? this.stats.grades.sn1 : 0,
              this.stats.grades ? this.stats.grades.sn2 : 0,
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
    barChartStacked() {
      return {
        chartData: {
          labels: ['Arras', 'Auxerre', 'Bordeaux', 'Brest', 'Grenoble', 'Lille', 'Lyon', 'Montpellier', 'Nantes', 'Rennes', 'Toulouse', 'Paris', 'Dakar'],
          datasets: [{
            label: 'SN1',
            maxBarThickness: 10,
            backgroundColor: Charts.colors.theme['info'],
            data: [
              this.stats.cities ? this.stats.cities.arras.sn1 : 0,
              this.stats.cities ? this.stats.cities.auxerre.sn1 : 0,
              this.stats.cities ? this.stats.cities.bordeaux.sn1 : 0,
              this.stats.cities ? this.stats.cities.brest.sn1 : 0,
              this.stats.cities ? this.stats.cities.grenoble.sn1 : 0,
              this.stats.cities ? this.stats.cities.lille.sn1 : 0,
              this.stats.cities ? this.stats.cities.lyon.sn1 : 0,
              this.stats.cities ? this.stats.cities.montpellier.sn1 : 0,
              this.stats.cities ? this.stats.cities.nantes.sn1 : 0,
              this.stats.cities ? this.stats.cities.rennes.sn1 : 0,
              this.stats.cities ? this.stats.cities.toulouse.sn1 : 0,
              this.stats.cities ? this.stats.cities.paris.sn1 : 0,
              this.stats.cities ? this.stats.cities.dakar.sn1 : 0
            ]
          }, {
            label: 'SN2',
            maxBarThickness: 10,
            backgroundColor: Charts.colors.theme['primary'],
            data: [
              this.stats.cities ? this.stats.cities.arras.sn2 : 0,
              this.stats.cities ? this.stats.cities.auxerre.sn2 : 0,
              this.stats.cities ? this.stats.cities.bordeaux.sn2 : 0,
              this.stats.cities ? this.stats.cities.brest.sn2 : 0,
              this.stats.cities ? this.stats.cities.grenoble.sn2 : 0,
              this.stats.cities ? this.stats.cities.lille.sn2 : 0,
              this.stats.cities ? this.stats.cities.lyon.sn2 : 0,
              this.stats.cities ? this.stats.cities.montpellier.sn2 : 0,
              this.stats.cities ? this.stats.cities.nantes.sn2 : 0,
              this.stats.cities ? this.stats.cities.rennes.sn2 : 0,
              this.stats.cities ? this.stats.cities.toulouse.sn2 : 0,
              this.stats.cities ? this.stats.cities.paris.sn2 : 0,
              this.stats.cities ? this.stats.cities.dakar.sn2 : 0
            ]
          }, {
            label: 'B3',
            maxBarThickness: 10,
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
              this.stats.cities ? this.stats.cities.rennes.b3 : 0,
              this.stats.cities ? this.stats.cities.toulouse.b3 : 0,
              this.stats.cities ? this.stats.cities.paris.b3 : 0,
              this.stats.cities ? this.stats.cities.dakar.b3 : 0
            ]
          }, {
            label: 'I1 ',
            maxBarThickness: 10,
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
              this.stats.cities ? this.stats.cities.rennes.i1 : 0,
              this.stats.cities ? this.stats.cities.toulouse.i1 : 0,
              this.stats.cities ? this.stats.cities.paris.i1 : 0,
              this.stats.cities ? this.stats.cities.dakar.i1 : 0
            ]
          }, {
            label: 'I2 ',
            maxBarThickness: 10,
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
              this.stats.cities ? this.stats.cities.rennes.i2 : 0,
              this.stats.cities ? this.stats.cities.toulouse.i2 : 0,
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
  created() {
    this.$store.dispatch('sysconf/fetchStats')
  }
}
</script>
