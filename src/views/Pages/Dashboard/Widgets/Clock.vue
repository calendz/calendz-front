<template>
  <stats-card class="bg-gradient-default">
    <div class="row">
      <div class="col">
        <h5 class="card-title text-uppercase text-muted mb-0 text-white">DATE & HEURE</h5>
        <span class="h2 font-weight-bold mb-0 text-white">{{ currentTime }}</span>
      </div>
      <div class="col-auto">
        <div class="icon icon-shape bg-white text-dark rounded-circle shadow">
          <i class="fas fa-clock"/>
        </div>
      </div>
    </div>
    <template slot="footer">
      <span class="text-nowrap text-white">{{ currentDate }}</span>
    </template>
  </stats-card>
</template>

<script>
import dateUtilMixin from '@/mixins/dateUtilMixin'

export default {
  mixins: [dateUtilMixin],
  data () {
    return {
      currentTime: '--:--:--',
      currentDate: '----- -- ------'
    }
  },
  created () {
    this.update()
    setInterval(() => {
      this.update()
    }, 1000)
  },
  methods: {
    update: function () {
      const now = new Date()
      this.currentTime = this.dateToTimeString(now)
      this.currentDate = this.dateToString(now)
    }
  }
}
</script>
