<template>
  <div class="card">

    <!-- card header -->
    <div class="card-header h3 mb-0">
      <div class="row align-items-center">
        <div class="col-8 pr-0">
          <h5 class="h3 mb-0">
            {{ headerText }}
          </h5>
        </div>
        <div class="col-4 text-right">
          <router-link
            to="/calendar"
            class="btn btn-sm btn-primary">Détail</router-link>
        </div>
      </div>
    </div>

    <!-- card body - loading-->
    <div
      v-show="calendarLoading"
      class="card-body py-1">
      <div class="list-group list-group-flush">
        <div
          v-for="(number, index) in [1, 2, 3]"
          :key="index"
          class="list-group-item flex-column align-items-start px-2">
          <div class="row">
            <div class="col-8 pr-1">
              <placeholder class="w-100"/>
            </div>
            <div class="col-4 pl-0 text-right">
              <h4 class="text-sm mb-0">
                <placeholder class="w-100"/>
              </h4>
            </div>
          </div>

          <div class="row mt-2">
            <div class="col-8 pr-1 text-left">
              <placeholder class="w-100 mb-0"/>
            </div>
            <div class="col-4 pl-0 text-right">
              <placeholder class="w-100 mb-0"/>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- card body - not loading-->
    <div
      v-show="!calendarLoading"
      class="card-body py-1">
      <!-- show next day courses -->
      <div
        v-if="courses.length > 0"
        class="list-group list-group-flush">
        <div
          v-for="(course, index) in courses"
          :key="index"
          :style="hasPassed(course.end) ? 'text-decoration: line-through' : ''"
          :class="isBetween(course.start, course.end) ? 'pt-3 pb-1' : 'py-3'"
          class="list-group-item flex-column align-items-start px-2">
          <div class="row">
            <div class="col-8 pr-1">
              <h4>{{ course.title }}</h4>
            </div>
            <div class="col-4 pl-0 text-right">
              <h4 class="text-sm mb-0">
                {{ `${timeToHour(course.start, 'h').slice(0, -2)} - ${timeToHour(course.end, 'h').slice(0, -2)}` }}
              </h4>
            </div>
          </div>

          <div class="row">
            <div class="col-8 pr-1 text-left">
              <p class="text-sm mb-0">{{ capitalizeFirstLetterEachWords(course.professor) }}</p>
            </div>
            <div class="col-4 pl-0 text-right">
              <p class="text-sm mb-0">{{ course.room }}</p>
            </div>
          </div>

          <base-progress
            v-if="currentCourse && isBetween(course.start, course.end)"
            :height="8"
            :value="currentCourseProgress"
            type="primary"
            animated
            striped
            class="mt-3"/>
        </div>
      </div>

      <!-- if no courses -->
      <div
        v-if="courses.length === 0"
        class="my-4 text-center">
        <h4 class="text-muted">Aucun cours à venir</h4>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import dateUtilMixin from '@/mixins/dateUtilMixin'
import stringUtilMixin from '@/mixins/stringUtilMixin'

export default {
  mixins: [dateUtilMixin, stringUtilMixin],
  data () {
    return {
      ticker: Date.now()
    }
  },
  computed: {
    ...mapGetters({
      calendarLoading: 'calendar/isLoading',
      currentCourse: 'calendar/getCurrentCourse',
      todayCourses: 'calendar/getTodayCourses',
      nextDayCourses: 'calendar/getNextDayCourses'
    }),
    courses () {
      if (this.todayCourses.length !== 0) return this.todayCourses
      if (this.nextDayCourses.length !== 0) return this.nextDayCourses
      return []
    },
    headerText () {
      let day = this.courses[0]
      if (!day) return `Aucun cours à afficher`

      day = this.dateToShortFullString(day.start)
      const today = this.dateToDayMonthYear(new Date(), '/')

      if (today === day) return `Cours d'aujourd'hui`
      else return `Cours du ${day}`
    },
    currentCourseProgress () {
      // eslint-disable-next-line no-unused-vars
      const dummyTicker = this.$data.ticker

      const progress = this.getProgress(this.currentCourse.start, this.currentCourse.end)
      if (progress === 100) return 0
      else return progress
    }
  },
  beforeCreate () {
    this.$options.interval = setInterval(() => { this.ticker = Date.now() }, 1000 * 60)
  },
  beforeDestroy () {
    clearInterval(this.$options.interval)
  }
}
</script>
