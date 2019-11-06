<template>
  <div>
    <!-- ======================================= -->
    <!-- == "Base header" ====================== -->
    <!-- ======================================= -->
    <base-header
      type="primary"
      class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-5">
          <h6 class="h2 text-white d-inline-block mb-0">Emploi du temps</h6>
          <nav
            aria-label="breadcrumb"
            class="d-none d-md-inline-block ml-md-4">
            <route-bread-crumb/>
          </nav>
        </div>
        <div class="col-7 text-right">

          <form
            v-if="windowWidth > 1095"
            class="agenda-search navbar-search navbar-search-light d-inline-block mr-3"
            @submit.prevent
            @change="handleSearchInputChange"
            @mouseenter="handleSearchInputMouseEnter"
            @mouseleave="handleSearchInputMouseLeave">

            <div class="form-group mb-0">
              <div class="input-group input-group-alternative input-group-merge">
                <div class="input-group-prepend">
                  <span
                    class="input-group-text"
                    style="padding: .9rem 1rem"><i class="fas fa-search"/></span>
                </div>
                <input
                  id="agenda-search-input"
                  v-model.lazy="searchInput"
                  autocomplete="off"
                  class="form-control p-0"
                  placeholder="Entrez : prénom.nom"
                  type="text"
                  style="width: 0">
                <div
                  class="input-group-text input-group-append text-black"
                  @click="handleSearchInputClear">
                  <i class="fas fa-times"/>
                </div>
              </div>
            </div>
          </form>

          <div class="d-inline-block">
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
      </div>
    </base-header>

    <div class="container-fluid mt--6">
      <div class="row">
        <div class="col">
          <!-- Fullcalendar -->
          <div class="card card-calendar">

            <!-- Card header -->
            <div class="card-header py-3">
              <div class="row align-items-center">
                <div class="col-7">
                  <h5 class="h3 mb-0">{{ headerDate }}</h5>
                </div>
                <div class="col-5 text-right">
                  <base-button
                    class="btn btn-sm btn-default"
                    @click="backToToday()">
                    Revenir à aujourd'hui
                  </base-button>
                </div>
              </div>
            </div>

            <!-- Card body -->
            <div
              :class="{ 'bg-other-agenda': searchInput.includes('.') }"
              class="card-body p-0 card-calendar-body">
              <full-calendar
                id="calendar"
                ref="fullCalendar"
                :events="isLoading ? [] : fullcalendarEvents"
                :plugins="calendarPlugins"
                :editable="false"
                :theme="false"
                :selectable="false"
                :select-helper="true"
                :default-view="activeView"
                :weekends="false"
                :all-day-slot="true"
                :all-day-text="'Tâches'"
                :column-header-format="getColumnHeaderFormat()"
                :event-render="customRender"
                :now-indicator="true"
                :fixed-week-count="false"
                :event-color="`#${user.settings.calendarColor}`"
                content-height="auto"
                slot-duration="01:00:00"
                min-time="08:00:00"
                max-time="20:00:00"
                class="calendar"
                @eventClick="handleEventClick"
                @dateClick="handleDateClick"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- ======================================== -->
    <!-- == Detail modal ======================== -->
    <!-- ======================================== -->
    <modal :show.sync="showModal">
      <template
        slot="header"
        class="pb-0">
        <h2 class="mb-0">Détail du cours</h2>
      </template>

      <div class="row">
        <div class="col-6">
          <h3>Intitulé :</h3>
          <p>{{ modalCourse.title }}</p>
        </div>
        <div class="col-6">
          <h3>Enseignant :</h3>
          <p>{{ modalCourse.professor }}</p>
        </div>
      </div>

      <div class="row">
        <div class="col-6">
          <h3>Horaire :</h3>
          <p>{{ modalCourse.start }} - {{ modalCourse.end }}</p>
        </div>
        <div class="col-6">
          <h3>Salle :</h3>
          <p>{{ modalCourse.room }}</p>
        </div>
      </div>

      <template slot="footer">
        <base-button
          type="primary"
          size="md"
          @click="showModal = false">Fermer</base-button>
      </template>
    </modal>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { Modal } from '@/components'
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import dateUtilMixin from '@/mixins/dateUtilMixin'
import stringUtilMixin from '@/mixins/stringUtilMixin'

export default {
  name: 'Calendar',
  components: {
    FullCalendar,
    Modal
  },
  mixins: [dateUtilMixin, stringUtilMixin],
  data () {
    return {
      showModal: false,
      modalCourse: {},
      calendarPlugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      activeView: 'timeGridWeek',
      activeDate: new Date(),
      windowWidth: window.innerWidth,
      headerDate: '',
      searchInput: '',
      showSearchInput: false
    }
  },
  computed: {
    ...mapGetters({
      user: 'account/user',
      events: 'calendar/getCourses',
      isLoading: 'calendar/isLoading',
      tasks: 'tasks/getAsEvents'
    }),
    fullcalendarEvents () {
      // combine both calendar & tasks arrays
      return [...this.events, ...this.tasks]
    }
  },
  watch: {
    windowWidth: function (newVal, oldVal) {
      if (newVal < 800 && oldVal >= 800) this.changeView('timeGridDay')
      if (newVal >= 800 && oldVal < 800) this.changeView('timeGridWeek')
    },
    searchInput: function (newVal) {
      localStorage.setItem('calendz.calendar.searchInput', newVal)
      if (newVal === '') this.handleSearchInputMouseLeave()
      else this.handleSearchInputMouseEnter()
    }
  },
  beforeMount () {
    // clear search input
    localStorage.removeItem('calendz.calendar.searchInput')
  },
  mounted () {
    // initialize fullcalendar
    const calendarApi = this.$refs.fullCalendar.getApi()
    calendarApi.setOption('locale', 'fr')

    const queryUser = this.$route.query.user
    if (queryUser) {
      this.searchInput = queryUser
      localStorage.setItem('calendz.calendar.searchInput', queryUser)
    }

    const queryDate = this.$route.query.date
    if (queryDate) {
      let date = queryDate.split('-')
      date = new Date(`${date[1]}-${date[0]}-${date[2]}`)
      // redirect to date
      this.calendarApi().gotoDate(date)
      // fetch date's week
      const dateToFetch = this.getMonday(date)
      this.$store.dispatch('calendar/fetchDate', { date: this.dateToMonthDayYear(dateToFetch) })
    }

    // if today is saturday, show next week
    const today = new Date()
    if (today.getDay() === 6) {
      this.calendarApi().gotoDate(today.setDate(today.getDate() + 1))
    }

    // set correct header date
    this.updateHeaderDate()

    // add events listeners
    window.addEventListener('keyup', this.injectListeners)

    window.onresize = () => {
      this.windowWidth = window.innerWidth
    }

    // set correct view according to screen's size
    if (this.windowWidth < 800) this.changeView('timeGridDay')
    if (this.windowWidth >= 800) this.changeView('timeGridWeek')
  },
  beforeDestroy () {
    window.removeEventListener('keyup', this.injectListeners)

    this.handleSearchInputClear()
  },
  methods: {
    // ===========================================
    // == Core functions
    // ===========================================
    calendarApi () {
      return this.$refs.fullCalendar.getApi()
    },
    // ======================================
    // == CALENDAR RENDERING
    // ======================================
    customRender (element) {
      // render tasks
      if (element.event.allDay) {
        element.el.innerHTML = `
          <div class="h3 custom-allday-event text-center my-0">
            <div class="badge badge-lg badge-primary py-1">
              <span class="pr-2">Afficher les devoirs</span>
              <span class="badge badge-sm badge-default badge-circle badge-floating border-white">${element.event.title}</span>
            </div>
          </div>`
        return
      }

      // render events
      switch (this.activeView) {
        // ============================
        // == MONTH VIEW
        // ============================
        case 'dayGridMonth':
          if (this.windowWidth < 800) {
            element.el.innerHTML = `
              <div>
                <h5 class="pl-1 mb-0 text-white w-auto">
                  ${new Date(element.event.start).getHours()}-${new Date(element.event.end).getHours()}h
                </h5>
              </div>`
          } else {
            element.el.innerHTML = `
              <div>
                <h5 class="pl-1 mb-0 text-white w-auto">
                  ${new Date(element.event.start).getHours()}h
                  <span class="ml-1 h5 text-white">${element.event.title}</span>
                </h5>
              </div>`
          }
          break
        // ============================
        // == WEEK VIEW
        // ============================
        case 'timeGridWeek':
          if (this.windowWidth < 800) {
            element.el.innerHTML = `
              <div>
                <h4 class="text-white text-center w-100" style="position: absolute; top: 50%; transform: translateY(-50%);">${element.event.title}</h4>
              </div>`
          } else {
            element.el.innerHTML = `
              <div>
                <h5 class="h5-5 pl-2 mt-1 text-white">${this.timeToHour(element.event.start)} - ${this.timeToHour(element.event.end)}</h5>
                <h3 class="px-2 text-white text-center" style="max-width: 90%; width: 90%; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">${element.event.title}</h3>
                <h5 class="h5-5 pl-2 mb-1 text-white col-7" style="position: absolute; bottom: 0; left: 0">${this.capitalizeFirstLetterEachWords(element.event.extendedProps.professor)}<h5>
                <h5 class="h5-5 pr-2 mb-1 text-white col-3 text-right" style="position: absolute; bottom: 0; right: 0">${element.event.extendedProps.room}<h5>
              </div>`
          }
          break
        // ============================
        // == DAY VIEW
        // ============================
        case 'timeGridDay':
          if (this.windowWidth < 800) {
            element.el.innerHTML = `
              <div>
                <h5 class="h5-5 pl-2 mt-1 text-white">${this.timeToHour(element.event.start)} - ${this.timeToHour(element.event.end)}</h5>
                <h2 class="text-white text-center w-100" style="position: absolute; top: 50%; transform: translateY(-50%);">${element.event.title}</h2>
                <h5 class="h5-5 pl-2 mb-1 text-white" style="position: absolute; bottom: 0; left: 0">${this.capitalizeFirstLetterEachWords(element.event.extendedProps.professor)}<h5>
                <h5 class="h5-5 pr-2 mb-1 text-white" style="position: absolute; bottom: 0; right: 0">${element.event.extendedProps.room}<h5>
              </div>`
          } else {
            element.el.innerHTML = `
              <div>
                <h5 class="h5-5 pl-2 mt-1 text-white">${this.timeToHour(element.event.start)} - ${this.timeToHour(element.event.end)}</h5>
                <h3 class="px-2 text-white text-center" style="max-width: 90%; width: 90%; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">${element.event.title}</h3>
                <h5 class="h5-5 pl-2 mb-1 text-white col-7" style="position: absolute; bottom: 0; left: 0">${this.capitalizeFirstLetterEachWords(element.event.extendedProps.professor)}<h5>
                <h5 class="h5-5 pr-2 mb-1 text-white col-3 text-right" style="position: absolute; bottom: 0; right: 0">${element.event.extendedProps.room}<h5>
              </div>`
          }
          break
      }
    },
    handleDateClick (clicked) {
      if (this.activeView === 'dayGridMonth') {
        this.calendarApi().gotoDate(clicked.date)
        this.changeView('timeGridWeek')
      }
    },
    handleEventClick (clicked) {
      if (this.activeView === 'dayGridMonth') {
        this.calendarApi().gotoDate(clicked.event.start)
        this.changeView('timeGridWeek')
      } else if (this.activeView === 'timeGridWeek') {
        this.showModal = true
        this.modalCourse.title = clicked.event.title
        this.modalCourse.start = this.timeToHour(clicked.event.start)
        this.modalCourse.end = this.timeToHour(clicked.event.end)
        this.modalCourse.professor = this.capitalizeFirstLetterEachWords(clicked.event.extendedProps.professor)
        this.modalCourse.room = clicked.event.extendedProps.room
      }
    },
    // ===========================================
    // == Naviguation functions
    // ===========================================
    changeView (viewType) {
      this.activeView = viewType
      this.activeDate = this.calendarApi().getDate()

      if (viewType === 'dayGridMonth') {
        // get first day of the month
        const firstOfTheMonth = this.getFirstFridayOfMonth(this.activeDate)

        this.$store.dispatch('calendar/fetchDate', { date: this.dateToMonthDayYear(firstOfTheMonth.setDate(firstOfTheMonth.getDate())) })
        this.$store.dispatch('calendar/fetchDate', { date: this.dateToMonthDayYear(firstOfTheMonth.setDate(firstOfTheMonth.getDate() + 7)) })
        this.$store.dispatch('calendar/fetchDate', { date: this.dateToMonthDayYear(firstOfTheMonth.setDate(firstOfTheMonth.getDate() + 7)) })
        this.$store.dispatch('calendar/fetchDate', { date: this.dateToMonthDayYear(firstOfTheMonth.setDate(firstOfTheMonth.getDate() + 7)) })
        this.$store.dispatch('calendar/fetchDate', { date: this.dateToMonthDayYear(firstOfTheMonth.setDate(firstOfTheMonth.getDate() + 7)) })
      }

      this.calendarApi().changeView(viewType)
    },
    next: function () {
      let toAdd
      let dateToFetch = this.activeDate
      switch (this.activeView) {
        case 'timeGridWeek':
          toAdd = 7
          if (dateToFetch.getDay() === 6) toAdd = 8
          if (dateToFetch.getDay() === 0) toAdd = 9
          dateToFetch = this.getMonday(dateToFetch.setDate(dateToFetch.getDate() + toAdd))
          break
        case 'dayGridMonth':
          dateToFetch = this.getMonday(dateToFetch.setMonth(dateToFetch.getMonth() + 1))

          const firstOfTheMonth = this.getFirstFridayOfMonth(dateToFetch)
          this.$store.dispatch('calendar/fetchDate', { date: this.dateToMonthDayYear(firstOfTheMonth.setDate(firstOfTheMonth.getDate())) })
          this.$store.dispatch('calendar/fetchDate', { date: this.dateToMonthDayYear(firstOfTheMonth.setDate(firstOfTheMonth.getDate() + 7)) })
          this.$store.dispatch('calendar/fetchDate', { date: this.dateToMonthDayYear(firstOfTheMonth.setDate(firstOfTheMonth.getDate() + 7)) })
          this.$store.dispatch('calendar/fetchDate', { date: this.dateToMonthDayYear(firstOfTheMonth.setDate(firstOfTheMonth.getDate() + 7)) })
          this.$store.dispatch('calendar/fetchDate', { date: this.dateToMonthDayYear(firstOfTheMonth.setDate(firstOfTheMonth.getDate() + 7)) })

          this.calendarApi().next()
          this.updateHeaderDate()
          return
        case 'timeGridDay':
          // add 1 day (or 3 if friday or 2 if saturday)
          toAdd = 1
          if (dateToFetch.getDay() === 5) toAdd = 3
          if (dateToFetch.getDay() === 6) toAdd = 2

          dateToFetch = this.getMonday(dateToFetch.setDate(dateToFetch.getDate() + toAdd))
          break
      }

      this.$store.dispatch('calendar/fetchDate', { date: this.dateToMonthDayYear(dateToFetch) })

      this.calendarApi().next()
      this.updateHeaderDate()
    },
    prev () {
      let toRemove = 7
      let dateToFetch = this.activeDate

      switch (this.activeView) {
        case 'timeGridWeek':
          toRemove = 7
          if (dateToFetch.getDay() === 6) toRemove = 6
          if (dateToFetch.getDay() === 0) toRemove = 5
          dateToFetch = this.getMonday(dateToFetch.setDate(dateToFetch.getDate() - toRemove))
          break
        case 'dayGridMonth':
          dateToFetch = this.getMonday(dateToFetch.setMonth(dateToFetch.getMonth() - 1))

          const firstOfTheMonth = this.getFirstFridayOfMonth(dateToFetch)
          this.$store.dispatch('calendar/fetchDate', { date: this.dateToMonthDayYear(firstOfTheMonth.setDate(firstOfTheMonth.getDate())) })
          this.$store.dispatch('calendar/fetchDate', { date: this.dateToMonthDayYear(firstOfTheMonth.setDate(firstOfTheMonth.getDate() + 7)) })
          this.$store.dispatch('calendar/fetchDate', { date: this.dateToMonthDayYear(firstOfTheMonth.setDate(firstOfTheMonth.getDate() + 7)) })
          this.$store.dispatch('calendar/fetchDate', { date: this.dateToMonthDayYear(firstOfTheMonth.setDate(firstOfTheMonth.getDate() + 7)) })
          this.$store.dispatch('calendar/fetchDate', { date: this.dateToMonthDayYear(firstOfTheMonth.setDate(firstOfTheMonth.getDate() + 7)) })

          this.calendarApi().prev()
          this.updateHeaderDate()
          return
        case 'timeGridDay':
          // remove 1 day (or 3 if monday or 2 if sunday)
          toRemove = 1
          if (dateToFetch.getDay() === 1) toRemove = 3
          if (dateToFetch.getDay() === 0) toRemove = 2

          dateToFetch = this.getMonday(dateToFetch.setDate(dateToFetch.getDate() - toRemove))
          break
      }

      this.$store.dispatch('calendar/fetchDate', { date: this.dateToMonthDayYear(dateToFetch) })

      this.calendarApi().prev()
      this.updateHeaderDate()
    },
    backToToday () {
      this.activeDate = new Date()
      this.calendarApi().today()
      this.updateHeaderDate()
    },
    injectListeners (e) {
      if (e.keyCode === 39 && !this.showSearchInput) this.next()
      if (e.keyCode === 37 && !this.showSearchInput) this.prev()
    },
    // ===========================================
    // == Random functions
    // ===========================================
    updateHeaderDate () {
      this.headerDate = this.getMonthFromDate(this.calendarApi().getDate()) + ' ' + this.calendarApi().getDate().getFullYear()
    },
    getColumnHeaderFormat () {
      switch (this.activeView) {
        // week
        case 'timeGridWeek':
          if (this.windowWidth < 800) return { month: 'numeric', day: 'numeric', omitCommas: true }
          else return { weekday: 'long', month: 'numeric', day: 'numeric', omitCommas: true }
        // month
        case 'dayGridMonth':
          return { weekday: 'long' }
        // day
        case 'timeGridDay':
          return { weekday: 'long', day: 'numeric', month: 'long' }
      }
    },
    handleSearchInputMouseEnter () {
      document.querySelector('#agenda-search-input').style.width = ''
      this.showSearchInput = true
    },
    handleSearchInputMouseLeave () {
      if (!this.searchInput) {
        document.querySelector('#agenda-search-input').style.width = '0'
        this.showSearchInput = false
      }
    },
    handleSearchInputClear () {
      if (this.searchInput === '') return

      this.searchInput = ''
      localStorage.removeItem('calendz.calendar.searchInput')
      this.handleSearchInputChange()
    },
    handleSearchInputChange () {
      // if input is incorrect
      if ((!this.searchInput.includes('.') || this.searchInput.length <= 5) && this.searchInput !== '') {
        return this.$notify({ type: 'warning', message: 'Veuillez indiquer un nom valide !' })
      }

      this.backToToday()
      let date = new Date()
      if (date.getDay() === 6) date.setDate(date.getDate() + 2)
      if (date.getDay() === 0) date.setDate(date.getDate() + 1)
      date = this.dateToMonthDayYear(date)
      this.$store.dispatch('calendar/resetFetchedWeeks')
      this.$store.dispatch('calendar/fetchDate', { date: date })
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
  // == Loading animations
  // =========================================

  .fade-in {
    animation-name: fade-in;
    animation-duration: 1s;
  }

  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .fade-out {
    animation-name: fade-out;
    animation-duration: 0.5s;
  }

  @keyframes fade-out {
    from { opacity: 1; }
    to { opacity: 0; }
  }

  // =========================================
  // == fullcalendar modifications
  // =========================================

  // Custom "all-day" row
  .custom-allday-event {
    background-color: white;
  }

  // height du la ligne "all-day"
  .fc-timeGrid-view .fc-day-grid .fc-row {
    min-height: 34px !important;
    height: 34px !important;
  }

  // alignement de la colonne de l'heure
  td .fc-axis span {
    margin-right: 10px;
  }

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

  @media (max-width: 880px)  {
    // day header
    .fc-day-header.fc-widget-header {
      padding: 8px;
    }
  }

  .h5-5 {
    font-size: 0.75rem
  }

  #agenda-search-input {
    transition-duration: 450ms;
  }

  .custom-event:hover {
    filter: contrast(1.5) !important;
    cursor: pointer;
  }

  .bg-other-agenda {
    .fc-time-grid-event, .fc-event, .fc-start, .fc-end {
      background-color: #6E7A90 !important;
    }
  }
</style>
