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
          <h6 class="h2 text-white d-inline-block mb-0">Emploi du temps</h6>
          <nav
            aria-label="breadcrumb"
            class="d-none d-md-inline-block ml-md-4">
            <route-bread-crumb/>
          </nav>
        </div>
        <div class="col-lg-6 col-5 text-right">
          <a
            href="#"
            class="fullcalendar-btn-prev btn btn-sm btn-default"
            @click.prevent="prev">
            <i class="fas fa-angle-left"/>
          </a>
          <a
            href="#"
            class="fullcalendar-btn-next btn btn-sm btn-default"
            @click.prevent="next">
            <i class="fas fa-angle-right"/>
          </a>
          <base-button
            :class="{'active': defaultView === 'dayGridMonth'}"
            class="btn btn-sm btn-default"
            @click="changeView('dayGridMonth')">
            Mois
          </base-button>
          <base-button
            :class="{'active': defaultView === 'timeGridWeek'}"
            class="btn btn-sm btn-default"
            @click="changeView('timeGridWeek')">
            Semaine
          </base-button>
          <base-button
            :class="{'active': defaultView === 'timeGridDay'}"
            class="btn btn-sm btn-default"
            @click="changeView('timeGridDay')">
            Jour
          </base-button>
        </div>
      </div>
    </base-header>

    <div class="container-fluid mt--6">
      <div class="row">
        <div class="col">
          <!-- Fullcalendar -->
          <div class="card card-calendar">

            <!-- Card header -->
            <div class="card-header">
              <h5 class="h3 mb-0">Calendar</h5>
            </div>

            <!-- Card body -->
            <div class="card-body p-0 card-calendar-body">
              <full-calendar
                ref="fullCalendar"
                :events="events"
                :plugins="calendarPlugins"
                :editable="false"
                :theme="false"
                :selectable="false"
                :select-helper="true"
                :default-view="defaultView"
                :weekends="false"
                :all-day-slot="false"
                :column-header-format="{ weekday: 'long', month: 'numeric', day: 'numeric', omitCommas: true }"
                :event-render="test"
                content-height="auto"
                slot-duration="01:00:00"
                min-time="08:00:00"
                max-time="20:00:00"
                class="calendar"
                @eventClick="onEventClick"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import Modal from '@/components/Modal'
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import RouteBreadCrumb from '@/components/Breadcrumb/RouteBreadcrumb'
import dateUtilMixin from '@/mixins/dateUtilMixin'

export default {
  name: 'Calendar',
  components: {
    Modal,
    FullCalendar,
    RouteBreadCrumb
  },
  mixins: [dateUtilMixin],
  data () {
    return {
      calendarPlugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      defaultView: 'timeGridWeek',
      events: [
        {
          title: 'Français',
          start: new Date('2019-09-09T10:00:00'),
          end: new Date('2019-09-09T12:00:00'),
          className: 'bg-default',
          description: 'SLT LES BG'
        },
        {
          title: 'Maths',
          start: new Date('2019-09-09T14:00:00'),
          end: new Date('2019-09-09T16:00:00'),
          className: 'bg-default'
        },
        {
          title: 'Réseau',
          start: new Date('2019-09-10T09:00:00'),
          end: new Date('2019-09-10T13:00:00'),
          className: 'bg-default'
        }
      ],
      model: {
        title: '',
        className: 'bg-default',
        description: 'Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
        start: '',
        end: ''
      },
      eventColors: ['bg-info', 'bg-orange', 'bg-red', 'bg-green', 'bg-default', 'bg-blue', 'bg-purple', 'bg-yellow']
    }
  },
  mounted () {
    const calendarApi = this.$refs.fullCalendar.getApi()
    calendarApi.setOption('locale', 'fr')
  },
  methods: {
    test (element) {
      console.log(element)
      element.el.innerHTML = `
      <h4 class="pl-1 text-white">${this.timeToHour(element.event.start)} - ${this.timeToHour(element.event.end)}</h4>
      <h2 class="text-white text-center w-100" style="position: absolute; top: 50%; transform: translateY(-50%);">${element.event.title}</h2>
      <h4 class="m-0 pl-1 text-white" style="position: absolute; bottom: 0; left: 0">Karmouche<h4>
      <h4 class="m-0 pr-1 text-white" style="position: absolute; bottom: 0; right: 0">L-230<h4>
      `
    },
    calendarApi () {
      return this.$refs.fullCalendar.getApi()
    },
    changeView (viewType) {
      this.defaultView = viewType
      this.calendarApi().changeView(viewType)
    },
    next () {
      this.calendarApi().next()
    },
    prev () {
      this.calendarApi().prev()
    },
    onEventClick ({ el, event }) {
      this.model = {
        title: event.title,
        className: event.classNames ? event.classNames.join(' ') : '',
        start: event.start,
        end: event.end,
        description: 'Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.'
      }
      this.showEditModal = true
    },
    saveEvent () {
      if (this.model.title) {
        let event = {
          ...this.model,
          allDay: true
        }
        this.events.push(JSON.parse(JSON.stringify(event)))

        this.model = {
          title: '',
          eventColor: 'bg-danger',
          start: '',
          end: ''
        }
      }
    },
    editEvent () {
      let index = this.events.findIndex(e => e.title === this.model.title)
      if (index !== -1) {
        this.events.splice(index, 1, this.model)
      }
      this.showEditModal = false
    },
    deleteEvent () {
      let index = this.events.findIndex(e => e.title === this.model.title)
      if (index !== -1) {
        this.events.splice(index, 1)
      }
      this.showEditModal = false
    }
  }
}
</script>
<style lang="scss">
  @import "~@fullcalendar/core/main.css";
  @import '~@fullcalendar/daygrid/main.css';
  @import '~@fullcalendar/timegrid/main.css';
  @import "~@/assets/sass/core/vendors/fullcalendar";

  // hauteur des cases
  .fc-time-grid .fc-slats td {
    height: 3em !important
  }

  // taille du titre
  .fc-event .fc-title {
    font-size: 1.2em !important
  }

  // placer
  .fc-widget-content {
    position: relative;
  }
  .fc-day-number {
    position: absolute;
    right: 0;
    bottom: 0;
  }
</style>
