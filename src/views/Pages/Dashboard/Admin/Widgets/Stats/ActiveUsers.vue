<template>
  <card class="card-stats">
    <div class="row">
      <div class="col">
        <slot>
          <h5 class="card-title text-uppercase text-muted mb-1">ACTIVITÉ UTILISATEURS</h5>
          <div class="row mt-2 mb--3">
            <div class="col-12 pr-0">
              <div v-if="!users">
                <placeholder class="w-75"/>
              </div>

              <div v-if="users">
                <span class="h2 font-weight-bold mt--1 mr-2 float-left">
                  {{ `${activeUsers === 1 ? `${users.activeAccount.lastDay}` : activeUsers === 3 ? `${users.activeAccount.lastThreeDays}` : `${users.activeAccount.lastWeek}`}/${users.total - users.neverMigrated - users.inactive}` }}
                </span>
                <span class="text-muted">
                  {{ `(${Math.ceil(`${activeUsers === 1 ? `${users.activeAccount.lastDay}` : activeUsers === 3 ? `${users.activeAccount.lastThreeDays}` : `${users.activeAccount.lastWeek}`}`/(users.total - users.neverMigrated - users.inactive)*100)}%)` }}
                </span>
              </div>
            </div>
          </div>
        </slot>
      </div>

      <div class="col-auto">
        <slot name="icon">
          <div class="icon icon-shape bg-primary text-white rounded-circle shadow">
            <i class="fas fa-users"/>
          </div>
        </slot>
      </div>
    </div>

    <p class="mt-3 mb-0 text-sm">
      <slot name="footer">
        <base-button
          :class="activeUsers != 1 ? 'btn-outline-primary mt-1' :'mt-1'"
          size="sm"
          type="primary"
          @click="activeUsers = 1">Aujourd'hui</base-button>
        <base-button
          :class="activeUsers != 3 ? 'btn-outline-primary mt-1' :'mt-1'"
          size="sm"
          type="primary"
          @click="activeUsers = 3">3 Jours</base-button>
        <base-button
          :class="activeUsers != 7 ? 'btn-outline-primary mt-1' :'mt-1'"
          size="sm"
          type="primary"
          @click="activeUsers = 7">7 Jours</base-button>
      </slot>
    </p>
  </card>
</template>

<script>
export default {
  props: {
    users: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      activeUsers: 1
    }
  }
}
</script>
