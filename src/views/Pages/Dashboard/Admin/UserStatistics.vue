<template>
  <div>
    <!-- ======================================= -->
    <!-- == SMALL CARDS ======================== -->
    <!-- ======================================= -->
    <base-header
      type="primary"
      class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Statistiques (utilisateurs)</h6>
          <nav
            aria-label="breadcrumb"
            class="d-none d-md-inline-block ml-md-4">
            <route-bread-crumb/>
          </nav>
        </div>
      </div>
    </base-header>

    <div class="container-fluid mt--6">

      <div class="row">
        <div class="col-xl-9">
          <div class="row">
            <div class="col-xl-4 col-md-6">
              <!-- total users  -->
              <total-users :users="stats.users"/>
              <!-- active users -->
              <active-users :users="stats.users"/>
              <!-- epsi / wis repartition -->
              <repartition-users :users="stats.users"/>
            </div>

            <div class="col-xl-4 col-md-6">
              <!-- inactive users -->
              <inactive-users :users="stats.users"/>
              <!-- new users -->
              <new-users :users="stats.users"/>
              <!-- users doing bts -->
              <bts-users :users="stats.users"/>
            </div>

            <div class="col-xl-4 col-md-12">
              <!-- migrated users -->
              <migrated-users :users="stats.users"/>
              <!-- old accounts, will never be migrated (old i2) -->
              <old-users :users="stats.users"/>
              <!-- users that are accepting mails -->
              <mail-users :users="stats.users"/>
            </div>
          </div>
          <div >
            <!-- campus + grade repartition -->
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

        <div class="col-xl-3">
          <!-- derniers utilisateurs inscrits -->
          <last-registers :users="stats.users"/>
          <!-- grades repartition -->
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
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import TotalUsers from './Widgets/Stats/TotalUsers'
import InactiveUsers from './Widgets/Stats/InactiveUsers'
import MigratedUsers from './Widgets/Stats/MigratedUsers'
import OldUsers from './Widgets/Stats/OldUsers'
import ActiveUsers from './Widgets/Stats/ActiveUsers'
import NewUsers from './Widgets/Stats/NewUsers'
import RepartitionUsers from './Widgets/Stats/RepartitionUsers'
import BtsUsers from './Widgets/Stats/BtsUsers'
import MailUsers from './Widgets/Stats/MailUsers'
import LastRegisters from './Widgets/Stats/LastRegisters'

import BarChart from '@/components/Charts/BarChart'
import PieChart from '@/components/Charts/PieChart'
import { Charts } from '@/components/Charts/config'

export default {
  components: {
    BarChart,
    PieChart,
    TotalUsers,
    InactiveUsers,
    MigratedUsers,
    OldUsers,
    ActiveUsers,
    NewUsers,
    RepartitionUsers,
    BtsUsers,
    MailUsers,
    LastRegisters
  },
  computed: {
    ...mapGetters({
      stats: 'sysconf/getUsersStats'
    }),
    pieChart () {
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
    barChartStacked () {
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
  created () {
    this.$store.dispatch('sysconf/fetchStats')
  }
}
</script>
