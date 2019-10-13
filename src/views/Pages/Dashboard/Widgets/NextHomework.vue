<template>
  <stats-card
    :sub-title="name"
    title="Prochain devoir"
    type="gradient-danger"
    icon="fas fa-th-list">

    <template slot="footer">
      <span
        :class="remainingDays < 7 ? 'text-danger' : 'text-warning'"
        class="mr-2"><i class="fas fa-clock"/> Prochain :</span>
      <span class="text-nowrap">{{ dateToFullString(date) }}</span>
    </template>
  </stats-card>
</template>

<script>
import dateUtilMixin from '@/mixins/dateUtilMixin'

export default {
  mixins: [dateUtilMixin],
  props: {
    name: {
      type: String,
      default: 'à venir...',
      doc: 'Next due task'
    },
    date: {
      type: Date,
      default: () => { return new Date('November 1, 2019') },
      doc: 'Due date'
    }
  },
  computed: {
    remainingDays: function () {
      const today = new Date()
      return Math.round((this.date - today) / (1000 * 60 * 60 * 24))
    }
  }
}
</script>
