<template>
  <div>
    <!-- ======================================= -->
    <!-- == "Base header" ====================== -->
    <!-- ======================================= -->
    <base-header type="secondary">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 d-inline-block mb-0">Aide et informations</h6>
          <nav
            aria-label="breadcrumb"
            class="d-none d-md-inline-block ml-md-4">
            <route-bread-crumb light/>
          </nav>
        </div>
      </div>

      <!-- Category selection -->
      <div class="row">
        <help-category
          :selected="selected === 'calendar'"
          background="bg-gradient-primary"
          icon="fas fa-calendar-alt"
          title="Emploi du temps"
          @click.native="selected = 'calendar'"
        />

        <help-category
          :selected="selected === 'tasks'"
          background="bg-gradient-info"
          icon="fas fa-book"
          title="Devoirs et tâches"
          @click.native="selected = 'tasks'"
        />

        <help-category
          :selected="selected === 'grades'"
          background="bg-gradient-warning"
          icon="fas fa-graduation-cap"
          title="Gestion des notes"
          @click.native="selected = 'grades'"
        />

        <help-category
          :selected="selected === 'others'"
          background="bg-gradient-default"
          icon="fas fa-cogs"
          title="Autres (divers)"
          @click.native="selected = 'others'"
        />
      </div>
      <hr class="mt-2 mb-4">
    </base-header>

    <!-- ======================================= -->
    <!-- == Main container ===================== -->
    <!-- ======================================= -->
    <div class="container-fluid">
      <!-- Selected category -->
      <div class="flex-row text-center pb-5">
        <h1>{{ selectedLabel }}</h1>
        <span class="text-muted">Trucs et astuces concernant votre emploi du temps.</span>

        <div class="bg-pattern-dots"/>
      </div>

      <div class="row justify-content-center">
        <div class="col-lg-8 mx-auto">
          <fade-transition group>
            <help-calendar
              v-if="selected === 'calendar'"
              :key="1"/>
            <help-tasks
              v-if="selected === 'tasks'"
              :key="2"/>
            <help-grades
              v-if="selected === 'grades'"
              :key="3"/>
            <help-others
              v-if="selected === 'others'"
              :key="4"/>
          </fade-transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { FadeTransition } from 'vue2-transitions'
import HelpCategory from '@/components/Help/HelpCategory.vue'
import HelpCalendar from './HelpCalendar.vue'
import HelpTasks from './HelpTasks.vue'
import HelpGrades from './HelpGrades.vue'
import HelpOthers from './HelpOthers.vue'

export default {
  components: {
    FadeTransition,
    HelpCategory,
    HelpCalendar,
    HelpTasks,
    HelpGrades,
    HelpOthers
  },
  data () {
    return {
      selected: 'calendar'
    }
  },
  computed: {
    selectedLabel () {
      switch (this.selected) {
        case 'calendar': return 'Emploi du temps'
        case 'tasks': return 'Devoirs et tâches'
        case 'grades': return 'Gestion des notes'
        case 'others': return 'Autres (divers)'
      }
    }
  }
}
</script>

<style scoped>
.bg-pattern-dots {
  z-index: -100;
  position: absolute;
  top: 0;
  right: 0;
  height: 480px;
  width: 500px;
  background-color: #f8f9fe;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}
</style>
