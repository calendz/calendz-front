<template>
  <card
    :show-footer-line="true"
    class="card-stats">
    <div class="row">

      <div class="col">
        <slot>
          <h5 class="card-title text-uppercase text-muted mb-1">
            PROCHAIN COURS
          </h5>

          <span class="h3">
            <span v-if="calendarLoading">
              Chargement en cours
            </span>
            <span v-if="!calendarLoading">
              {{ nextCourse ? nextCourse.title : 'Aucun cours à venir...' }}
            </span>
          </span>
        </slot>
      </div>

      <div class="col-auto">
        <slot name="icon">
          <div class="icon icon-shape bg-gradient-info text-white rounded-circle shadow">
            <i
              :class="calendarLoading ? 'fa-circle-notch fa-spin' : 'fa-calendar-week'"
              class="fas"/>
          </div>
        </slot>
      </div>
    </div>

    <p class="mt-3 mb-0 text-sm">
      <slot name="footer">
        <router-link
          to="/calendar"
          class="nav-link p-0">
          <i class="fas fa-clock mr-1 text-default"/>
          <span class="text-nowrap">
            <span v-show="calendarLoading">
              ------- -- ------- - --h--
            </span>
            <span v-show="!calendarLoading">
              <span v-if="nextCourse">
                {{ `${dateToFullString(nextCourse.start)} - ${dateToTimeString(nextCourse.start, 'h').slice(0, -3)}` }}
                <i class="fas fa-door-open mx-2 text-primary"/>
                {{ nextCourse.room }}
              </span>
              <span v-if="!nextCourse">
                cliquez pour accéder
              </span>
            </span>
          </span>
        </router-link>
      </slot>
    </p>
  </card>
</template>

<script>
import { mapGetters } from 'vuex'
import dateUtilMixin from '@/mixins/dateUtilMixin'

export default {
  mixins: [dateUtilMixin],
  computed: {
    ...mapGetters({
      calendarLoading: 'calendar/isLoading',
      nextCourse: 'calendar/getNextCourse'
    })
  }
}
</script>
