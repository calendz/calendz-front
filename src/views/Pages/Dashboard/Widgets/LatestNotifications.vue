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
          <router-link
            to="/notifications"
            class="btn btn-sm btn-primary">Détail</router-link>
        </div>
      </div>
    </div>

    <!-- Card body -->
    <div class="card-body pb-3 ">
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
          v-for="(notif, index) in notifications.slice(0, 3)"
          :key="index"
          class="timeline-block mt-0 mb-2">
          <i
            :class="`${notif.icon} bg-${notif.type}`"
            class="avatar avatar-sm rounded-circle timeline-step"/>
          <div class="timeline-content container">
            <div class="row">
              <div class="col pr-0 ml--4">
                <h6 class="text-sm font-weight-bold mb-0">
                  {{ notif.title }}
                </h6>
              </div>

              <div class="col-auto px-1 text-right">
                <small
                  class="text-muted">
                  <span
                    v-if="notif.isRead"
                    class="badge badge-warning badge-notif mr-2">
                    lue
                  </span>
                  <i class="fas fa-clock mr-1"/>
                  {{ getFuzzyTime(notif.timestamp) }}
                </small>
              </div>

              <div class="row w-100 py-2 pl-2 ">
                <p class="text-sm font-weigth-light mb-0">{{ notif.message }}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import dateUtilMixin from '@/mixins/dateUtilMixin'

export default {
  mixins: [dateUtilMixin],
  computed: {
    ...mapGetters({
      notifications: 'notifications/all'
    })
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
