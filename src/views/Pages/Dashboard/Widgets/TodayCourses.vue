<template>
  <div class="card">
    <!-- card header -->
    <div class="card-header h3 mb-0">
      <div class="row align-items-center">
        <div class="col-8">
          <h5 class="h3 mb-0">
            Cours d'aujourd'hui
          </h5>
        </div>
        <div class="col-4 text-right">
          <router-link
            to="/calendar"
            class="btn btn-sm btn-primary">Détail</router-link>
        </div>
      </div>
    </div>
    <div class="card-body py-0">
      <div class="list-group list-group-flush">
        <div
          v-for="(course, index) in todayCourses"
          :key="index"
          :style="hasPassed(course.end) ? 'text-decoration: line-through' : ''"
          :class="isBetween(course.start, course.end) ? 'pt-3 pb-1' : 'py-3'"
          class="list-group-item list-group-item-action flex-column align-items-start px-2">
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
            <div class="col-4 pl-1 text-right">
              <p class="text-sm mb-0">{{ course.room }}</p>
            </div>
          </div>

          <base-progress
            v-if="isBetween(course.start, course.end)"
            :height="8"
            :value="getProgress(course.start, course.end)"
            type="primary"
            animated
            striped
            class="mt-3"/>
        </div>
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
  computed: {
    ...mapGetters({
      todayCourses: 'calendar/getTodayCourses'
    })
  },
  methods: {

  }
}
</script>
