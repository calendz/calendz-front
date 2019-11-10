<template>
  <card
    :show-footer-line="true"
    class="card-stats">
    <div class="row">

      <div class="col pr-0">
        <slot>
          <h5 class="card-title text-muted mb-1">
            PROCHAIN COURS
          </h5>

          <div style="height: 36px !important">
            <span v-show="calendarLoading">
              <placeholder class="w-100"/>
            </span>
            <p
              v-show="!calendarLoading"
              class="h3 mb-0 my-auto"
              style="line-height: 18px">
              {{ nextCourse ? nextCourse.title : 'Aucun cours à venir...' }}
              <!-- LE LANGAGE DE PROGRAMMATION PY -->
            </p>
          </div>
        </slot>
      </div>

      <div class="col-auto">
        <slot name="icon">
          <router-link
            :to="nextCourse ? `/calendar?date=${dateToDayMonthYear(nextCourse.start)}` : '/calendar'">
            <div class="icon icon-shape bg-gradient-red text-white rounded-circle shadow">
              <i class="fas fa-calendar-week"/>
            </div>
          </router-link>
        </slot>
      </div>
    </div>

    <p class="mt-1 mb-0 text-sm">
      <slot name="footer">
        <router-link
          :to="nextCourse ? `/calendar?date=${dateToDayMonthYear(nextCourse.start)}` : '/calendar'"
          class="nav-link p-0">

          <!-- loading -->
          <span v-show="calendarLoading">
            <div class="row">
              <div class="col-8 pb-1 pr-1">
                <placeholder class="w-100"/>
              </div>
              <div class="col-4 pl-1 text-right">
                <placeholder class="w-100"/>
              </div>
            </div>
          </span>

          <!-- not loading -->
          <span v-show="!calendarLoading">
            <!-- next course -->
            <div
              v-if="nextCourse"
              class="row">
              <div class="col-8 pr-0">
                <i class="fas fa-clock mr-1"/>
                {{ `${dateToShortFullString(nextCourse.start)} - ${dateToTimeString(nextCourse.start, 'h').slice(0, -5)}` }}
              </div>
              <div class="col-4 pl-0 text-right">
                <i class="fas fa-door-open text-primary"/>
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
