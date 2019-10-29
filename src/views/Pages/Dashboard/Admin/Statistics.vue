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
                      <span class="h2 font-weight-bold mt--1 mr-2 float-left">
                        {{ users }}
                      </span>
                      <span class="text-muted">
                        {{ `(au total)` }}
                      </span>
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
                      <span class="h2 font-weight-bold mt--1 mr-2 float-left">
                        {{ `${inactiveUsers}/${users}` }}
                      </span>
                      <span class="text-muted">
                        {{ `(${Math.ceil(inactiveUsers/users*100)}%)` }}
                      </span>
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
                      <span class="h2 font-weight-bold mt--1 mr-2 float-left">
                        {{ `${usersWithMailing}/${users}` }}
                      </span>
                      <span class="text-muted">
                        {{ `(${Math.ceil(usersWithMailing/users*100)}%)` }}
                      </span>
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
                      <span class="h2 font-weight-bold mt--1 mr-2 float-left">
                        {{ `${usersWithBTS}/${users}` }}
                      </span>
                      <span class="text-muted">
                        {{ `(${Math.ceil(usersWithBTS/users*100)}%)` }}
                      </span>
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
import BarChart from '@/components/Charts/BarChart'
import PieChart from '@/components/Charts/PieChart'
import { Charts } from '@/components/Charts/config'

function randomScalingFactor () {
  return Math.round(Math.random() * 100)
}

export default {
  components: {
    BarChart,
    PieChart
  },
  data () {
    return {
      users: '124',
      inactiveUsers: '2',
      usersWithMailing: '89',
      usersWithBTS: '12',
      pieChart: {
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
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor()
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
      },
      barChartStacked: {
        chartData: {
          labels: ['Arras', 'Auxerre', 'Bordeaux', 'Brest', 'Grenoble', 'Lille', 'Lyon', 'Montpellier', 'Nantes', 'Paris', 'Dakar'],
          datasets: [{
            label: 'B1',
            backgroundColor: Charts.colors.theme['info'],
            data: [
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor()
            ]
          }, {
            label: 'B2',
            backgroundColor: Charts.colors.theme['primary'],
            data: [
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor()
            ]
          }, {
            label: 'B3',
            backgroundColor: Charts.colors.theme['success'],
            data: [
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor()
            ]
          }, {
            label: 'I1 ',
            backgroundColor: Charts.colors.theme['warning'],
            data: [
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor()
            ]
          }, {
            label: 'I2 ',
            backgroundColor: Charts.colors.theme['danger'],
            data: [
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor()
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
  }
}
</script>
