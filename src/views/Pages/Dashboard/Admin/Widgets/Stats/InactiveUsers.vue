<template>
  <card class="card-stats">
    <div class="row">
      <div class="col">
        <slot>
          <h5 class="card-title text-uppercase text-muted mb-1">UTILISATEURS INACTIFS</h5>
          <div class="row mt-2 mb--3">
            <div class="col-12 pr-0">
              <div v-if="!users">
                <placeholder class="w-75"/>
              </div>

              <div v-if="users">
                <span class="h2 font-weight-bold mt--1 mr-2 float-left">
                  {{ `${users.inactive}/${users.total}` }}
                </span>
                <span class="text-muted">
                  {{ `(${Math.ceil(users.inactive/users.total*100)}%)` }}
                </span>
              </div>
            </div>
          </div>
        </slot>
      </div>

      <div class="col-auto">
        <slot name="icon">
          <div class="icon icon-shape bg-gradient-warning text-white rounded-circle shadow">
            <i class="fas fa-users"/>
          </div>
        </slot>
      </div>
    </div>

    <p class="mt-4 mb-1 text-sm">
      <slot name="footer">
        <i class="fas fa-external-link-alt mr-2"/>
        <router-link to="/user-management">
          <span class="nav-link p-0 d-inline text-nowrap">accéder liste utilisateurs</span>
        </router-link>
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
  }
}
</script>
