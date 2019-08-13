<template>
  <div class="card">
    <!-- Card header -->
    <div class="card-header">
      <div class="row align-items-center">
        <div class="col-8">
          <!-- Title -->
          <h5 class="h3 mb-0">Vos dernières notifications</h5>
        </div>
        <div class="col-4 text-right">
          <a class="btn btn-sm btn-neutral">Détail</a>
        </div>
      </div>
    </div>

    <!-- Card body -->
    <div class="card-body">
      <div
        v-if="notifications.length < 1"
        class="text-muted text-center">
        <i>Vous n'avez aucune notification !</i>
      </div>
      <div
        v-if="notifications.length > 0"
        class="timeline timeline-one-side"
        data-timeline-content="axis"
        data-timeline-axis-style="dashed">

        <div
          v-for="(notif, index) in notifications.slice(0, 2)"
          :key="index"
          class="timeline-block">
          <span
            :class="`badge-info`"
            class="timeline-step">
            <i :class="notif.icon"/>
          </span>
          <div class="timeline-content">
            <div class="d-flex justify-content-between pt-1">
              <div>
                <div>
                  <h6 class="text-sm font-weight-bold">
                    {{ notif.title }}
                  </h6>

                </div>
              </div>

              <div class="text-right">
                <small class="text-muted">
                  <span
                    v-if="notif.isRead"
                    class="badge badge-warning badge-notif mr-2">
                    lue
                  </span>
                  <i class="fas fa-clock mr-1"/>
                  {{ formatDate(notif.timestamp) }}
                </small>
              </div>
            </div>
            <p class="text-sm font-weigth-light mt-1 mb-0">{{ notif.message }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      notifications: 'notifications/all'
    })
  },
  methods: {
    formatDate (timestamp) {
      const seconds = Math.floor(new Date().getTime() / 1000 - timestamp / 1000)
      if (seconds > 2 * 24 * 3600) return Math.floor(seconds / 3600 / 24) + 'j'
      if (seconds > 24 * 3600) return 'hier'
      if (seconds > 3600) return Math.floor(seconds / 3600) + 'h'
      if (seconds > 60) return Math.floor(seconds / 60) + 'm'
      if (seconds > 1) return seconds + 's'
      return '?? secondes'
    }
  }
}
</script>
<style scoped>
.badge-notif {
  height: 22px;
  width: 30px;
  font-size: 9.5px;
}
</style>
