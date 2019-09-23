<template>
  <div>
    <!-- ======================================= -->
    <!-- == "Base header" ====================== -->
    <!-- ======================================= -->
    <base-header
      type="primary"
      class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-7 col-5">
          <h6 class="h2 text-white d-inline-block mb-0">Emploi du temps</h6>
          <nav
            aria-label="breadcrumb"
            class="d-none d-md-inline-block ml-md-4">
            <route-bread-crumb/>
          </nav>
        </div>
        <div class="col-lg-5 col-7 text-right">
          <a
            href=""
            class="fullcalendar-btn-prev btn btn-sm btn-default my-1"
            @click.prevent="prev">
            <i class="fas fa-angle-left"/>
          </a>
          <a
            href=""
            class="fullcalendar-btn-next btn btn-sm btn-default my-1"
            @click.prevent="next">
            <i class="fas fa-angle-right"/>
          </a>
          <base-button
            :class="{'active': activeView === 'dayGridMonth'}"
            class="btn btn-sm btn-default my-1"
            @click="changeView('dayGridMonth')">
            Mois
          </base-button>
          <base-button
            :class="{'active': activeView === 'timeGridWeek'}"
            class="btn btn-sm btn-defaul my-1"
            @click="changeView('timeGridWeek')">
            Semaine
          </base-button>
          <base-button
            :class="{'active': activeView === 'timeGridDay'}"
            class="btn btn-sm btn-default mr-2 my-1"
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
              <div class="row align-items-center">
                <div class="col-8">
                  <h5 class="h3 mb-0">{{ headerDate }}</h5>
                </div>
                <div class="col-4 text-right">
                  <base-button
                    class="btn btn-sm btn-default"
                    @click="backToToday()">
                    Revenir à aujourd'hui
                  </base-button>
                </div>
              </div>
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
                :default-view="activeView"
                :weekends="false"
                :all-day-slot="false"
                :column-header-format="getColumnHeaderFormat()"
                :event-render="customRender"
                content-height="auto"
                slot-duration="01:00:00"
                min-time="08:00:00"
                max-time="20:00:00"
                class="calendar"
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
      activeView: 'timeGridWeek',
      events: [
        {
          title: 'Français',
          start: new Date('2019-09-23T10:00:00'),
          end: new Date('2019-09-23T12:00:00'),
          className: 'bg-default',
          professor: 'Amy',
          room: 'L-230',
          description: 'Test Description'
        },
        {
          title: 'Maths',
          start: new Date('2019-09-23T14:00:00'),
          end: new Date('2019-09-23T16:00:00'),
          className: 'bg-default',
          professor: 'Karmouche',
          room: 'L-230',
          description: 'Test Description'
        },
        {
          title: 'Réseau',
          start: new Date('2019-09-24T09:00:00'),
          end: new Date('2019-09-24T13:00:00'),
          className: 'bg-default',
          professor: 'Hocine',
          room: 'L-230',
          description: 'Test Description'
        }
      ],
      model: {
        title: '',
        className: 'bg-default',
        description: 'Nullam id dolor id nibh ultricies vehicula ut id elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
        start: '',
        end: ''
      },
      eventColors: ['bg-info', 'bg-orange', 'bg-red', 'bg-green', 'bg-default', 'bg-blue', 'bg-purple', 'bg-yellow'],
      documentWidth: window.innerWidth,
      headerDate: 'test'
    }
  },
  mounted () {
    const calendarApi = this.$refs.fullCalendar.getApi()
    calendarApi.setOption('locale', 'fr')

    window.addEventListener('keyup', (e) => {
      if (e.keyCode === 39) this.next()
      if (e.keyCode === 37) this.prev()
    })

    this.updateHeaderDate()
  },
  created () {
    // if loading from mobile
    if (window.innerWidth < 750) this.activeView = 'timeGridDay'
  },
  methods: {
    customRender (element) {
      switch (this.activeView) {
        case 'dayGridMonth':
          element.el.innerHTML = `
            <div>
              <h5 class="pl-1 mb-0 text-white w-auto">
                ${new Date(element.event.start).getHours()}h
                <span class="ml-1 h5 text-white">${element.event.title}</span>
              </h5>
            </div>
          `
          break
        case 'timeGridWeek':
        case 'timeGridDay':
          element.el.innerHTML = `
            <div>
              <h4 class="pl-1 text-white">${this.timeToHour(element.event.start)} - ${this.timeToHour(element.event.end)}</h4>
              <h2 class="text-white text-center w-100" style="position: absolute; top: 50%; transform: translateY(-50%);">${element.event.title}</h2>
              <h4 class="m-0 pl-1 text-white" style="position: absolute; bottom: 0; left: 0">${element.event.extendedProps.professor}<h4>
              <h4 class="m-0 pr-1 text-white" style="position: absolute; bottom: 0; right: 0">${element.event.extendedProps.room}<h4>
            </div>
          `
          break
      }
    },
    calendarApi () {
      return this.$refs.fullCalendar.getApi()
    },
    changeView (viewType) {
      this.activeView = viewType
      this.calendarApi().changeView(viewType)
    },
    next: function () {
      this.calendarApi().next()
      this.updateHeaderDate()
    },
    prev () {
      this.calendarApi().prev()
      this.updateHeaderDate()
    },
    getColumnHeaderFormat () {
      switch (this.activeView) {
        case 'timeGridWeek':
          return { weekday: 'long', month: 'numeric', day: 'numeric', omitCommas: true }
        case 'dayGridMonth':
          return { weekday: 'long' }
        case 'timeGridDay':
          return { weekday: 'long', day: 'numeric', month: 'long' }
      }
    },
    updateHeaderDate () {
      this.headerDate = this.getMonthFromDate(this.calendarApi().getDate()) + ' ' + this.calendarApi().getDate().getFullYear()
    },
    backToToday () {
      this.calendarApi().today()
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

  // fix weekView day number
  .fc-day-number {
    position: relative !important;
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
  .contrast-bg {
    filter: contrast(0.7)
  }
</style>
