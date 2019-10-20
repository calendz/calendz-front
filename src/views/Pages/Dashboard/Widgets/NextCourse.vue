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
            <span v-show="calendarLoading">
              Chargement en cours
            </span>
            <span v-show="!calendarLoading">
              {{ nextCourse ? nextCourse.title : 'Aucun cours à venir...' }}
            </span>
          </span>
        </slot>
      </div>

      <div class="col-auto">
        <slot name="icon">
          <div class="icon icon-shape bg-gradient-info text-white rounded-circle shadow">
            <i class="fas fa-calendar-week"/>
          </div>
        </slot>
      </div>
    </div>

    <p class="mt-3 mb-0 text-sm">
      <slot name="footer">
        <router-link
          to="/calendar"
          class="nav-link p-0">

          <!-- loading -->
          <span v-show="calendarLoading">
            <div class="row">
              <div class="col-8 pr-1">
                <i class="fas fa-clock mr-1 text-default"/>
                --------- -- --------- - --h--
              </div>
              <div class="col-4 pl-1 text-right">
                <i class="fas fa-door-open mr-2 text-primary"/>
                ------
              </div>
            </div>
          </span>

          <!-- not loading -->
          <span v-show="!calendarLoading">
            <!-- next course -->
            <div
              v-if="nextCourse"
              class="row">
              <div class="col-8 pr-1">
                <i class="fas fa-clock mr-1 text-default"/>
                {{ `${dateToFullString(nextCourse.start)} - ${dateToTimeString(nextCourse.start, 'h').slice(0, -3)}` }}
              </div>
              <div class="col-4 pl-1 text-right">
                <i class="fas fa-door-open mr-2 text-primary"/>
                {{ nextCourse.room }}
              </div>
            </div>
            <!-- no next course -->
            <span v-if="!nextCourse">
              cliquez pour accéder aux détails
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
