<template>
  <card>
    <template slot="header">
      <!-- Derniers inscrits -->
      <div class="row align-items-center">
        <div class="col-8">
          <h5 class="h3 mb-0">
            Dernier inscrits
          </h5>
        </div>
        <div class="col-4 text-right">
          <base-button
            type="default"
            @click="toggle()">
            <i
              :class="{ 'fa-rotate-90': expand }"
              class="fas fa-chevron-right custom-transform"/>
          </base-button>
        </div>
      </div>
    </template>

    <ul
      v-if="users"
      class="list-group list-group-flush list my--4 ">
      <li
        v-for="(user, index) in list.slice(0, Math.max(0, users.lastRegisters.length - 7))"
        :key="index"
        class="list-group-item px-0 py-3"
      >
        <div class="row align-items-center">
          <div class="col-auto">
            <img
              :src="user.avatarUrl === 'img/theme/default-pp.png' ? '/img/theme/default-pp.png' : user.avatarUrl"
              alt="Photo de profil"
              class="avatar avatar-sm rounded-circle">
          </div>
          <div class="col pr-0 ml--2">
            <h5 class="mb-0">{{ `${user.firstname} ${user.lastname}` }}</h5>
            <span :class="`text-${user.isActive ? 'success' : 'danger'}`">● </span>
            <small>{{ `${user.grade} - ${user.city}` }}</small>
          </div>
          <div class="col-auto">
            <base-button
              disabled
              size="sm"
              type="info">
              {{ dateToDayMonthYear(timestampToDate(user.creationDate)) }}
            </base-button>
          </div>
        </div>
      </li>

      <collapse-transition>
        <div v-show="expand">
          <li
            v-for="(user, index) in list.slice(Math.max(users.lastRegisters.length - 7, 0))"
            :key="index"
            class="list-group-item px-0 py-3"
          >
            <div class="row align-items-center">
              <div class="col-auto">
                <img
                  :src="user.avatarUrl === 'img/theme/default-pp.png' ? '/img/theme/default-pp.png' : user.avatarUrl"
                  alt="Photo de profil"
                  class="avatar avatar-sm rounded-circle">
              </div>
              <div class="col pr-0 ml--2">
                <h5 class="mb-0">{{ `${user.firstname} ${user.lastname}` }}</h5>
                <span :class="`text-${user.isActive ? 'success' : 'danger'}`">● </span>
                <small>{{ `${user.grade} - ${user.city}` }}</small>
              </div>
              <div class="col-auto">
                <base-button
                  disabled
                  size="sm"
                  type="info">
                  {{ dateToDayMonthYear(timestampToDate(user.creationDate)) }}
                </base-button>
              </div>
            </div>
          </li>
        </div>
      </collapse-transition>
    </ul>
  </card>
</template>

<script>
import dateUtilMixin from '@/mixins/dateUtilMixin'
import { CollapseTransition } from 'vue2-transitions'

export default {
  components: {
    CollapseTransition
  },
  mixins: [dateUtilMixin],
  props: {
    users: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      expand: false
    }
  },
  computed: {
    list () {
      return [...this.users.lastRegisters].reverse()
    }
  },
  methods: {
    toggle () {
      console.log('toggle', this.expand)
      this.expand = !this.expand
    }
  }
}
</script>

<style>
.custom-transform {
  transition-property: all;
  transition-duration: 200ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
