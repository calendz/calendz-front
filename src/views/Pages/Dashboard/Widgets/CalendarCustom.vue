<template>
  <div class="card widget-calendar">
    <div class="card-header">
      <div class="row align-items-center">
        <div class="col-8">
          <h5 class="h3 mb-0">
            Calendrier (à venir...)
          </h5>
        </div>
        <div class="col-4 text-right">
          <router-link
            to="/dashboard"
            class="btn btn-sm btn-primary disabled">Ajouter</router-link>
        </div>
      </div>
    </div>

    <div class="card-body blur">
      <full-calendar
        ref="fullCalendar"
        :events="events"
        :plugins="calendarPlugins"
        :theme="false"
        :default-view="defaultView"
        default-date="2018-12-01"
        content-height="auto"/>
    </div>
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import dateUtilMixin from '@/mixins/dateUtilMixin'

export default {
  components: {
    FullCalendar
  },
  mixins: [dateUtilMixin],
  data () {
    return {
      calendarPlugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      defaultView: 'dayGridMonth',
      events: [
        {
          title: 'Dentiste',
          start: '2018-11-27',
          end: '2018-11-27',
          className: 'bg-green'
        },
        {
          title: 'JPO',
          start: '2018-12-01',
          end: '2018-12-01',
          className: 'bg-yellow'
        },
        {
          title: 'Workshop',
          start: '2018-12-03',
          end: '2018-12-08',
          className: 'bg-blue'
        },

        {
          title: 'BDE',
          start: '2018-12-13',
          end: '2018-12-13',
          className: 'bg-purple'
        },
        {
          title: 'Congés Ski',
          start: '2018-12-20',
          end: '2018-12-24',
          className: 'bg-warning'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
  @import "~@fullcalendar/core/main.css";
  @import "~@/assets/sass/core/vendors/fullcalendar";

  .blur {
    filter:blur(3px);
    -webkit-filter:blur(3px);
  }
</style>
