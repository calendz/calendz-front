<template>
  <div class="container p-0 task-core">

    <!-- title -->
    <span
      :class="getTitleClasses()"
      class="h4 text-sm"
      v-html="task.title"
    />

    <!-- author -->
    <span v-if="showAuthor">
      <span class="text-muted text-sm mr-1"> par</span>
      <el-tooltip
        :content="`${task.author && task.author.firstname || '?'} ${task.author && task.author.lastname || '?'}`"
        placement="top"
        class="avatar avatar-sm rounded-circle bg-warning">
        <img
          :src="task.author && task.author.avatarUrl || 'img/theme/default-pp.png'"
          alt="Photo de profil"
          class="rounded-circle avatar rounded-circle"
          style="width: 20px; height: 20px;">
      </el-tooltip>
      <br>
    </span>

    <!-- description -->
    <blockquote class="blockquote mb-0">
      <p
        :class="isDone(task._id) ? 'text-strikethrough' : ''"
        class="mb-0 text-sm text-justify"
        style="font-size: 0.875rem !important"
        v-html="getTaskDescription(task)"/>
      <a
        v-if="task.description && (task.description.length > showMoreLimit || task.description.includes('</p><p>'))"
        href="javascript:void(0)"
        class="text-sm"
        @click="readMore = !readMore">
        {{ readMore ? 'Afficher moins...' : 'Tout afficher...' }}
      </a>
      <footer
        v-if="task.subject"
        class="blockquote-footer text-sm">
        {{ task.subject }}
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
    },
    showAuthor: {
      type: Boolean,
      default: true,
      description: 'Show task author pp'
    },
    titleClasses: {
      type: String,
      default: '',
      description: 'Classes to apply to the title'
    },
    showMoreLimit: {
      type: Number,
      default: 120,
      description: 'Character number limit, otherwise use "Show more" button'
    }
  },
  data () {
    return {
      readMore: false
    }
  },
  computed: {
    ...mapGetters({
      allDoneTasks: 'tasks/getAllDone'
    })
  },
  methods: {
    isDone (taskId) {
      return this.allDoneTasks.some(task => task._id === taskId)
    },
    getTaskDescription (task) {
      if (!task.description) return `<span class='text-muted'>Aucune description...</span>`

      // if readMore: return whole description
      if (this.readMore) return task.description

      // if text is multiline
      if (task.description.includes('</p><p>')) {
        return task.description.slice(0, task.description.indexOf('</p><p>')) + '...'
      }

      // if text is too long
      if (task.description.length > this.showMoreLimit) {
        if (!this.readMore) return task.description.slice(0, this.showMoreLimit) + '...'
      }

      return task.description
    },
    getTitleClasses () {
      return {
        ...this.titleClasses,
        'text-strikethrough': this.isDone(this.task._id)
      }
    }
  }
}
</script>

<style lang="scss">
  .task-core {
    p {
      font-size: 0.875rem !important;
      margin-bottom: 0 !important;
    }
  }
</style>
