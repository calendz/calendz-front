<template>
  <div class="notifications">
    <slide-y-up-transition
      :duration="transitionDuration"
      group
      mode="out-in">
      <notification
        v-for="notification in notifications"
        v-bind="notification"
        :click-handler="notification.onClick"
        :key="notification.timestamp.getTime()"
        @close="removeNotification"
      />
    </slide-y-up-transition>
  </div>
</template>
<script>
import Notification from './Notification.vue'
import { SlideYUpTransition } from 'vue2-transitions'

export default {
  components: {
    SlideYUpTransition,
    Notification
  },
  props: {
    transitionDuration: {
      type: Number,
      default: 200
    },
    overlap: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      notifications: this.$notifications.state
    }
  },
  watch: {
    overlap: function (newVal) {
      this.$notifications.settings.overlap = newVal
    }
  },
  created () {
    this.$notifications.settings.overlap = this.overlap
  },
  methods: {
    removeNotification (timestamp) {
      this.$notifications.removeNotification(timestamp)
    }
  }
}
</script>
