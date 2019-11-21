<template>
  <card>
    <!-- card header -->
    <div
      slot="header"
      class="h3 mb-0">
      <div class="row align-items-center">
        <div class="col-8">
          <h5 class="h3 mb-0">
            Prochains devoirs
          </h5>
        </div>
        <div class="col-4 text-right">
          <router-link
            to="/tasks"
            class="btn btn-sm btn-primary">Détail</router-link>
        </div>
      </div>
    </div>

    <!-- card body -->
    <ul class="list-group list-group-flush">
      <li
        v-for="(homework, index) in homeworks"
        :key="index"
        :class="(index === 0) ? 'pt-0' : index === homeworks.length - 1 ? 'pb-1' : ''"
        class="list-group-item px-0">
        <div
          :class="{'checklist-item-checked': false, [`checklist-item-${ homework.type === 'homework' ? 'primary' : homework.type === 'task' ? 'info' : 'warning' }`]: homework.type }"
          class="checklist-item">
          <div class="checklist-info">
            <h5
              :class="isDone(homework._id) ? 'text-strikethrough' : ''"
              class="checklist-title mb-0">{{ homework.title }}</h5>
            <small
              :class="isDone(homework._id) ? 'text-strikethrough' : ''"
              v-html="homework.description || `<span class='text-muted'>Aucune description...</span>`"/>
            <br>
            <small class="text-muted">
              <span>
                <i class="fas fa-hourglass-half m-1"/>
              </span>
              {{ capitalizeFirstLetter(dateToFullString(getDate(homework))) }}</small>
          </div>
          <div>
            <base-checkbox
              :checked="isDone(homework._id)"
              :type="homework.type === 'homework' ? 'primary' : homework.type === 'task' ? 'info' : 'warning'"
              @input="toggleHomeworkDone($event, homework._id)"/>
          </div>
        </div>
      </li>
    </ul>

    <span
      v-if="!homeworks[0]"
      class="h3">
      <div class="text-center">
        <span>
          Vous n'avez aucun devoir à venir
        </span>
      </div>
    </span>

  </card>
</template>
<script>
import { mapGetters } from 'vuex'
import dateUtilMixin from '@/mixins/dateUtilMixin'
import stringUtilMixin from '@/mixins/stringUtilMixin'

export default {
  mixins: [dateUtilMixin, stringUtilMixin],
  computed: {
    ...mapGetters({
      homeworkloading: 'tasks/isLoading',
      homeworks: 'tasks/get3Upcommings',
      allDoneTasks: 'tasks/getAllDone'
    })
  },
  methods: {
    isDone (taskId) {
      return this.allDoneTasks.some(task => task._id === taskId)
    },
    getDate: function (homework) {
      return new Date().setTime(homework.date)
    },
    remainingDays: function (homework) {
      const today = new Date()
      return Math.round((homework.date - today) / (1000 * 60 * 60 * 24))
    },
    toggleHomeworkDone: function (element, taskId) {
      this.$store.dispatch(`account/setTask${element ? '' : 'Not'}Done`, { taskId })
    }
  }
}
</script>
