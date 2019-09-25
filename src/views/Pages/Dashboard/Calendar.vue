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
                id="calendar"
                ref="fullCalendar"
                :events="isLoading ? fakeEvents : events"
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
                :now-indicator="true"
                :fixed-week-count="false"
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
import { mapGetters } from 'vuex'
import Modal from '@/components/Modal'
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import RouteBreadCrumb from '@/components/Breadcrumb/RouteBreadcrumb'
import dateUtilMixin from '@/mixins/dateUtilMixin'
import stringUtilMixin from '@/mixins/stringUtilMixin'

export default {
  name: 'Calendar',
  components: {
    Modal,
    FullCalendar,
    RouteBreadCrumb
  },
  mixins: [dateUtilMixin, stringUtilMixin],
  data () {
    return {
      calendarPlugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      activeView: 'timeGridWeek',
      activeDate: new Date(),
      fakeEvents: [
        {
          title: 'Français',
          start: new Date('2019-09-23T10:00:00'),
          end: new Date('2019-09-23T12:00:00'),
          className: 'bg-lightgrey',
          professor: 'Amy',
          room: 'L-230',
          description: 'Test Description'
        },
        {
          title: 'Maths',
          start: new Date('2019-09-23T14:00:00'),
          end: new Date('2019-09-23T16:00:00'),
          className: 'bg-lightgrey',
          professor: 'Karmouche',
          room: 'L-230',
          description: 'Test Description'
        },
        {
          title: 'Réseau',
          start: new Date('2019-09-24T09:00:00'),
          end: new Date('2019-09-24T13:00:00'),
          className: 'bg-lightgrey',
          professor: 'Hocine',
          room: 'L-230',
          description: 'Test Description'
        }
      ],
      windowWidth: window.innerWidth,
      headerDate: ''
    }
  },
  computed: {
    ...mapGetters({
      events: 'calendar/getCourses',
      isLoading: 'calendar/isLoading'
    })
  },
  watch: {
    windowWidth: function (newVal, oldVal) {
      if (newVal < 800 && oldVal >= 800) this.changeView('timeGridDay')
      if (newVal >= 800 && oldVal < 800) this.changeView('timeGridWeek')
    }
  },
  mounted () {
    // initialize fullcalendar
    const calendarApi = this.$refs.fullCalendar.getApi()
    calendarApi.setOption('locale', 'fr')

    this.updateHeaderDate()

    // add events listeners
    window.addEventListener('keyup', (e) => {
      if (e.keyCode === 39) this.next()
      if (e.keyCode === 37) this.prev()
    })

    window.onresize = () => {
      this.windowWidth = window.innerWidth
    }

    // set correct view according to screen's size
    if (this.windowWidth < 800) this.changeView('timeGridDay')
    if (this.windowWidth >= 800) this.changeView('timeGridWeek')
  },
  methods: {
    customRender (element) {
      if (this.isLoading) {
        switch (this.activeView) {
          case 'dayGridMonth':
            element.el.innerHTML = `
            <div>
              <h5 class="pl-1 py-1 mb-0">
                <div class="ml-1 placeholder-md"></div>
              </h5>
            </div>`
            break
          case 'timeGridWeek':
          case 'timeGridDay':
            element.el.innerHTML = `
            <div>
              <div class="ml-2 mt-2 placeholder-sm"></div>
              <div class="ml-0 mt--2 placeholder-md" style="position: absolute; top: 50%; left: 50%; transform: translateY(-50%); transform: translateX(-50%)"></div>
              <div class="ml-2 mb-2 placeholder-sm" style="position: absolute; bottom: 0; left: 0"></div>
              <div class="mr-2 mb-2 placeholder-sm" style="position: absolute; bottom: 0; right: 0"></div>
            </div>`
            break
        }
      } else {
        switch (this.activeView) {
          case 'dayGridMonth':
            element.el.innerHTML = `
            <div>
              <h5 class="pl-1 mb-0 text-white w-auto">
                ${new Date(element.event.start).getHours()}h
                <span class="ml-1 h5 text-white">${element.event.title}</span>
              </h5>
            </div>`
            break
          case 'timeGridWeek':
          case 'timeGridDay':
            element.el.innerHTML = `
            <div class="fade-in">
              <h5 class="pl-2 mt-1 text-white">${this.timeToHour(element.event.start)} - ${this.timeToHour(element.event.end)}</h5>
              <h2 class="text-white text-center w-100" style="position: absolute; top: 50%; transform: translateY(-50%);">${element.event.title}</h2>
              <h5 class="pl-2 mb-1 text-white" style="position: absolute; bottom: 0; left: 0">${this.capitalizeFirstLetterEachWords(element.event.extendedProps.professor)}<h5>
              <h5 class="pr-2 mb-1 text-white" style="position: absolute; bottom: 0; right: 0">${element.event.extendedProps.room}<h5>
            </div>`
            break
        }
      }
    },
    calendarApi () {
      return this.$refs.fullCalendar.getApi()
    },
    changeView (viewType) {
      this.activeView = viewType
      this.activeDate = this.calendarApi().getDate()

      if (viewType === 'dayGridMonth') {
        // get first day of the month
        const firstOfTheMonth = this.getFirstFridayOfMonth(this.activeDate)

        this.$store.dispatch('calendar/fetchDate', { date: this.toMonthDayYear(firstOfTheMonth.setDate(firstOfTheMonth.getDate())) })
        this.$store.dispatch('calendar/fetchDate', { date: this.toMonthDayYear(firstOfTheMonth.setDate(firstOfTheMonth.getDate() + 7)) })
        this.$store.dispatch('calendar/fetchDate', { date: this.toMonthDayYear(firstOfTheMonth.setDate(firstOfTheMonth.getDate() + 7)) })
        this.$store.dispatch('calendar/fetchDate', { date: this.toMonthDayYear(firstOfTheMonth.setDate(firstOfTheMonth.getDate() + 7)) })
        this.$store.dispatch('calendar/fetchDate', { date: this.toMonthDayYear(firstOfTheMonth.setDate(firstOfTheMonth.getDate() + 7)) })
      }

      this.calendarApi().changeView(viewType)
    },
    next: function () {
      let dateToFetch = this.activeDate
      switch (this.activeView) {
        case 'timeGridWeek':
          dateToFetch = this.getMonday(dateToFetch.setDate(dateToFetch.getDate() + 7))
          break
        case 'dayGridMonth':
          dateToFetch = this.getMonday(dateToFetch.setMonth(dateToFetch.getMonth() + 1))

          const firstOfTheMonth = this.getFirstFridayOfMonth(dateToFetch)
          this.$store.dispatch('calendar/fetchDate', { date: this.toMonthDayYear(firstOfTheMonth.setDate(firstOfTheMonth.getDate())) })
          this.$store.dispatch('calendar/fetchDate', { date: this.toMonthDayYear(firstOfTheMonth.setDate(firstOfTheMonth.getDate() + 7)) })
          this.$store.dispatch('calendar/fetchDate', { date: this.toMonthDayYear(firstOfTheMonth.setDate(firstOfTheMonth.getDate() + 7)) })
          this.$store.dispatch('calendar/fetchDate', { date: this.toMonthDayYear(firstOfTheMonth.setDate(firstOfTheMonth.getDate() + 7)) })
          this.$store.dispatch('calendar/fetchDate', { date: this.toMonthDayYear(firstOfTheMonth.setDate(firstOfTheMonth.getDate() + 7)) })

          this.calendarApi().next()
          this.updateHeaderDate()
          return
        case 'timeGridDay':
          // add 1 day (or 3 if friday or 2 if saturday)
          let toAdd = 1
          if (dateToFetch.getDay() === 5) toAdd = 3
          if (dateToFetch.getDay() === 6) toAdd = 2

          dateToFetch = this.getMonday(dateToFetch.setDate(dateToFetch.getDate() + toAdd))
          break
      }

      this.$store.dispatch('calendar/fetchDate', { date: this.toMonthDayYear(dateToFetch) })

      this.calendarApi().next()
      this.updateHeaderDate()
    },
    prev () {
      let dateToFetch = this.activeDate

      switch (this.activeView) {
        case 'timeGridWeek':
          dateToFetch = this.getMonday(dateToFetch.setDate(dateToFetch.getDate() - 7))
          break
        case 'dayGridMonth':
          dateToFetch = this.getMonday(dateToFetch.setMonth(dateToFetch.getMonth() - 1))

          const firstOfTheMonth = this.getFirstFridayOfMonth(dateToFetch)
          this.$store.dispatch('calendar/fetchDate', { date: this.toMonthDayYear(firstOfTheMonth.setDate(firstOfTheMonth.getDate())) })
          this.$store.dispatch('calendar/fetchDate', { date: this.toMonthDayYear(firstOfTheMonth.setDate(firstOfTheMonth.getDate() + 7)) })
          this.$store.dispatch('calendar/fetchDate', { date: this.toMonthDayYear(firstOfTheMonth.setDate(firstOfTheMonth.getDate() + 7)) })
          this.$store.dispatch('calendar/fetchDate', { date: this.toMonthDayYear(firstOfTheMonth.setDate(firstOfTheMonth.getDate() + 7)) })
          this.$store.dispatch('calendar/fetchDate', { date: this.toMonthDayYear(firstOfTheMonth.setDate(firstOfTheMonth.getDate() + 7)) })

          this.calendarApi().prev()
          this.updateHeaderDate()
          return
        case 'timeGridDay':
          // remove 1 day (or 3 if monday or 2 if sunday)
          let toRemove = 1
          if (dateToFetch.getDay() === 1) toRemove = 3
          if (dateToFetch.getDay() === 0) toRemove = 2

          dateToFetch = this.getMonday(dateToFetch.setDate(dateToFetch.getDate() - toRemove))
          break
      }

      this.$store.dispatch('calendar/fetchDate', { date: this.toMonthDayYear(dateToFetch) })

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
      this.activeDate = new Date()
      this.calendarApi().today()
      this.updateHeaderDate()
    },
    getMonday (d) {
      d = new Date(d)
      const day = d.getDay()
      const diff = d.getDate() - day + (day === 0 ? -6 : 1) // adjust when day is sunday
      return new Date(d.setDate(diff))
    },
    getFirstFridayOfMonth (date) {
      date = new Date(date)
      let targetDay = ''
      const seekDay = 5
      let i = 1
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ]

      while (i < 31) {
        targetDay = new Date(`${i++} ${monthNames[date.getMonth()]} ${date.getFullYear()}`)
        if (targetDay.getDay() === seekDay) return targetDay
      }
      return false
    }
  }
}
</script>
<style lang="scss">
  @import "~@fullcalendar/core/main.css";
  @import '~@fullcalendar/daygrid/main.css';
  @import '~@fullcalendar/timegrid/main.css';
  @import "~@/assets/sass/core/vendors/fullcalendar";

  // =========================================
  // == Loading placeholder
  // =========================================
  .placeholder-sm {
    width: 60px;
    height: 10px;
    border-radius: 6px;
    animation-name: pulse;
    animation-duration: 2s;
    animation-iteration-count: infinite;
  }

  .placeholder-md {
    width: 80px;
    height: 14px;
    border-radius: 6px;
    animation-name: pulse;
    animation-duration: 2s;
    animation-iteration-count: infinite;
  }

  .bg-lightgrey {
    background-color: #ced4da !important;
  }

  @keyframes pulse {
    0% { background-color: #dee2e6; }
    50% { background-color: #f6f9fc; }
    100% { background-color: #dee2e6; }
  }

  .fade-in {
    animation-name: fade-in;
    animation-duration: 0.8s;
  }

  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  // =========================================
  // == fullcalendar modifications
  // =========================================

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
