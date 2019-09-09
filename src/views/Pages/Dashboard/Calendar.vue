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
      </div>

      <div class="col-lg-6 mt-3 mt-lg-0 text-lg-right">
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
    </base-header>

    <div class="container-fluid mt--6">
      <div class="row">
        <div class="col">
          <!-- Fullcalendar -->
          <div class="card card-calendar">
            <!-- Card header -->
            <div class="card-header">
              <!-- Title -->
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
                height="auto"
                slot-duration="01:00:00"
                min-time="08:00:00"
                max-time="20:00:00"
                class="calendar"
                @dateClick="onDateClick"
                @eventClick="onEventClick"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <modal
      :show.sync="showAddModal"
      modal-classes="modal-secondary">
      <form
        class="new-event--form"
        @submit.prevent="saveEvent">
        <base-input
          v-model="model.title"
          label="Event title"
          placeholder="Event Title"
          input-classes="form-control-alternative new-event--title"/>
        <div class="form-group">
          <label class="form-control-label d-block mb-3">Status color</label>
          <div class="btn-group btn-group-toggle btn-group-colors event-tag">

            <label
              v-for="color in eventColors"
              :key="color"
              :class="[color, {'active focused': model.className === color}]"
              class="btn">
              <input
                v-model="model.className"
                :value="color"
                type="radio"
                name="event-tag"
                autocomplete="off">
            </label>
          </div>
        </div>
        <input
          type="hidden"
          class="new-event--start">
        <input
          type="hidden"
          class="new-event--end">
      </form>

      <template slot="footer">
        <button
          type="submit"
          class="btn btn-primary new-event--add"
          @click="saveEvent">Add event</button>
        <button
          type="button"
          class="btn btn-link ml-auto"
          @click="showAddModal = false">Close</button>
      </template>
    </modal>

    <modal
      :show.sync="showEditModal"
      modal-classes="modal-secondary">
      <form
        class="edit-event--form"
        @submit.prevent="editEvent">
        <base-input
          v-model="model.title"
          label="Event title"
          placeholder="Event Title"
          input-classes="form-control-alternative new-event--title"/>
        <div class="form-group">
          <label class="form-control-label d-block mb-3">Status color</label>
          <div class="btn-group btn-group-toggle btn-group-colors event-tag">

            <label
              v-for="color in eventColors"
              :key="color"
              :class="[color, {'active focused': model.className === color}]"
              class="btn">
              <input
                v-model="model.className"
                :value="color"
                type="radio"
                name="event-tag"
                autocomplete="off">
            </label>
          </div>
        </div>
        <base-input label="Description">
          <textarea
            v-model="model.description"
            class="form-control form-control-alternative edit-event--description textarea-autosize"
            placeholder="Event Desctiption"/>
          <i class="form-group--bar"/>
        </base-input>
        <input
          type="hidden"
          class="new-event--start">
        <input
          type="hidden"
          class="new-event--end">
      </form>

      <template slot="footer">
        <base-button
          native-type="submit"
          type="primary"
          class="new-event--add"
          @click="editEvent">Update</base-button>
        <base-button
          type="danger"
          @click="deleteEvent">Delete</base-button>
        <base-button
          type="link"
          class="ml-auto"
          @click="showEditModal = false">Close</base-button>
      </template>
    </modal>
  </div>
</template>
<script>
import Modal from '@/components/Modal'
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

// const today = new Date()
// const y = today.getFullYear()
// const m = today.getMonth()
// const d = today.getDate()
export default {
  name: 'Calendar',
  components: {
    Modal,
    FullCalendar
  },
  data () {
    // let yearAndMonth = `${y}-${m + 1}`
    return {
      calendarPlugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      defaultView: 'timeGridWeek',
      events: [
        {
          title: 'Français',
          start: new Date('2019-09-02T10:00:00'),
          end: new Date('2019-09-02T12:00:00'),
          className: 'bg-red',
          description: 'SLT LES BG'
        },
        {
          title: 'Maths',
          start: new Date('2019-09-02T14:00:00'),
          end: new Date('2019-09-02T16:00:00'),
          className: 'bg-blue'
        },
        {
          title: 'Réseau',
          start: new Date('2019-09-03T09:00:00'),
          end: new Date('2019-09-03T13:00:00'),
          className: 'bg-green'
        }
      ],
      showAddModal: false,
      showEditModal: false,
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
    onDateClick ({ date }) {
      this.showAddModal = true
      this.model.start = date
      this.model.end = date
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
      this.showAddModal = false
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
</style>

<style scoped>
  .fc-event .fc-title {
    font-size: 3em !important
  }
</style>
