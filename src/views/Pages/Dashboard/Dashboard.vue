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
        <div class="col-lg-6 col-5 text-right">
          <base-button
            class="my-1 mr-0"
            size="sm"
            type="default"
            @click="addGrade()">
            <span class="d-none d-sm-block">
              Ajouter une note
            </span>
            <span class="d-block d-sm-none">
              <i class="fas fa-plus-square mr-1"/>
              Note
            </span>
          </base-button>
          <base-button
            class="my-1 ml-2"
            size="sm"
            type="default"
            @click="addTask()">
            <span class="d-none d-sm-block">
              Ajouter une tâche
            </span>
            <span class="d-block d-sm-none">
              <i class="fas fa-plus-square mr-1"/>
              Tâche
            </span>
          </base-button>
        </div>
      </div>

      <!-- Card stats -->
      <div class="row">
        <div class="col-xl-3 col-md-6">
          <next-course/>
        </div>

        <div class="col-xl-3 col-md-6">
          <NextHomework/>
        </div>

        <div class="col-xl-3 col-md-6">
          <a
            class="nav-link p-0"
            target="_blank"
            href="https://epsi.360learning.com/">
            <stats-card
              title="ACCÈS DIRECT À"
              type="gradient-blue"
              sub-title="360learning"
              icon="fa-sharp fa-solid fa-360-degrees">

              <template slot="footer">
                <i class="fas fa-external-link-alt mr-2"/>
                <span class="text-nowrap">cliquez pour y accéder</span>
              </template>
            </stats-card>
          </a>
        </div>

        <div class="col-xl-3 col-md-6">
          <clock/>
        </div>
      </div>
    </base-header>

    <!-- ======================================= -->
    <!-- == Main =============================== -->
    <!-- ======================================= -->
    <div class="container-fluid mt--6">
      <div class="row">
        <div class="col-xl-4 col-md-6">
          <today-courses/>
          <latest-homeworks/>
        </div>
        <div class="col-xl-4 col-md-6">
          <grades-average/>
          <latest-notifications/>
        </div>
        <div class="col-xl-4 col-md-6 order-first order-xl-last">
          <teams-links/>
          <calendar-custom/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Clock from './Widgets/Clock'
import NextCourse from './Widgets/NextCourse'
import NextHomework from './Widgets/NextHomework'
import TodayCourses from './Widgets/TodayCourses'
import LatestHomeworks from './Widgets/LatestHomeworks'
import CalendarCustom from './Widgets/CalendarCustom'
import LatestNotifications from './Widgets/LatestNotifications'
import GradesAverage from './Widgets/GradesAverage'
import TeamsLinks from './Widgets/TeamsLinks'

export default {
  components: {
    Clock,
    NextCourse,
    NextHomework,
    TodayCourses,
    LatestHomeworks,
    CalendarCustom,
    LatestNotifications,
    GradesAverage,
    TeamsLinks
  },
  beforeCreate () {
    localStorage.removeItem('calendz.calendar.searchInput')
  },
  methods: {
    addGrade () {
      this.$router.push('/grades?action=add')
    },
    addTask () {
      this.$router.push(`/tasks?date=`) // default is Date.now()
    }
  }
}
</script>
