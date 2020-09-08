<template>
  <card class="card-stats">
    <div class="row">
      <div class="col">
        <slot>
          <h5 class="card-title text-uppercase text-muted mb-1">NOUVEAUX UTILISATEURS</h5>
          <div class="row mt-2 mb--3">
            <div class="col-12 pr-0">
              <div v-if="!users">
                <placeholder class="w-75"/>
              </div>

              <div v-if="users">
                <span
                  :class="isPositive() ? 'text-success' : ''"
                  class="h2 font-weight-bold mt--1 mr-2 float-left">
                  <i
                    v-if="isPositive()"
                    class="fa fa-arrow-up"/>
                  {{ newUsers === 1 ? `${users.creationAccount.lastDay}` : newUsers === 3 ? `${users.creationAccount.lastThreeDays}` : `${users.creationAccount.lastWeek}` }}
                </span>
              </div>
            </div>
          </div>
        </slot>
      </div>

      <div class="col-auto">
        <slot name="icon">
          <div class="icon icon-shape bg-gradient-green text-white rounded-circle shadow">
            <i class="fas fa-users"/>
          </div>
        </slot>
      </div>
    </div>

    <p class="mt-3 mb-0 text-sm">
      <slot name="footer">
        <base-button
          :class="newUsers != 1 ? 'btn-outline-primary mt-1' :'mt-1'"
          size="sm"
          type="primary"
          @click="newUsers = 1">Aujourd'hui</base-button>
        <base-button
          :class="newUsers != 3 ? 'btn-outline-primary mt-1' :'mt-1'"
          size="sm"
          type="primary"
          @click="newUsers = 3">3 Jours</base-button>
        <base-button
          :class="newUsers != 7 ? 'btn-outline-primary mt-1' :'mt-1'"
          size="sm"
          type="primary"
          @click="newUsers = 7">7 Jours</base-button>
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
      newUsers: 1
    }
  },
  methods: {
    isPositive () {
      if (this.newUsers === 1 && this.users.creationAccount.lastDay > 0) return true
      if (this.newUsers === 3 && this.users.creationAccount.lastThreeDays > 0) return true
      if (this.newUsers === 7 && this.users.creationAccount.lastWeek > 0) return true
      return false
    }
  }
}
</script>
