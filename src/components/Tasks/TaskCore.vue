<template>
  <div class="container p-0">

    <!-- title -->
    <span
      :class="isDone(task._id) ? 'text-strikethrough' : ''"
      class="h4 text-sm"
      v-html="task.title"
    />

    <!-- author -->
    <span class="text-muted mr-1"> par</span>
    <el-tooltip
      :content="`${task.author.firstname || '?'} ${task.author.lastname || '?'}`"
      placement="top"
      class="avatar avatar-sm rounded-circle bg-warning">
      <img
        :src="task.author.avatarUrl || 'img/theme/default-pp.png'"
        alt="Photo de profil"
        class="rounded-circle avatar rounded-circle"
        style="width: 20px; height: 20px;">
    </el-tooltip>
    <br>

    <!-- description -->
    <blockquote class="blockquote mb-0">
      <p
        :class="isDone(task._id) ? 'text-strikethrough' : ''"
        class="mb-0 text-sm"
        v-html="task.description || `<span class='text-muted'>Aucune description...</span>`"/>
      <footer
        v-if="task.subject"
        class="blockquote-footer text-sm">
        {{ capitalizeFirstLetter(task.subject.toLowerCase()) }}
      </footer>
    </blockquote>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import dateUtilMixin from '@/mixins/dateUtilMixin'
import stringUtilMixin from '@/mixins/stringUtilMixin'

export default {
  name: 'TaskCore',
  mixins: [dateUtilMixin, stringUtilMixin],
  props: {
    task: {
      type: Object,
      default: _ => {},
      description: 'Task'
    }
  },
  computed: {
    ...mapGetters({
      doneTasks: 'tasks/getDone'
    })
  },
  methods: {
    isDone (taskId) {
      return this.doneTasks.some(task => task._id === taskId)
    }
  }
}
</script>

<style>

</style>
