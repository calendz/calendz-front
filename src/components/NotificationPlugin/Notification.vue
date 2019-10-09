<template>
  <div
    :class="[
      { 'alert-with-icon': icon },
      verticalAlign,
      horizontalAlign,
      alertType
    ]"
    :style="customPosition"
    data-notify="container"
    class="alert alert-notify alert-dismissible"
    role="alert"
    data-notify-position="top-center"
    @click="tryClose"
  >
    <template v-if="icon || $slots.icon">
      <slot name="icon">
        <span
          class="alert-icon"
          data-notify="icon">
          <i :class="icon"/>
        </span>
      </slot>
    </template>

    <span
      class="alert-text my-auto"
      style="font-size: 0.95rem;">

      <span
        v-if="title"
        class="title">
        <b>{{ title }}<br></b>
      </span>
      <span
        v-if="message"
        v-html="message"/>
      <content-render
        v-if="!message && component"
        :component="component"
      />
    </span>

    <slot name="dismiss-icon">
      <button
        type="button"
        class="close"
        data-dismiss="alert"
        aria-label="Close"
        @click="close">
        <span aria-hidden="true">×</span>
      </button>
    </slot>
  </div>
</template>
<script>
export default {
  name: 'Notification',
  components: {
    contentRender: {
      props: ['component'],
      render: h => h(this.component)
    }
  },
  props: {
    message: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      description: 'Notification title',
      default: ''
    },
    icon: {
      type: String,
      description: 'Notification icon',
      default: ''
    },
    verticalAlign: {
      type: String,
      default: 'top',
      validator: value => {
        let acceptedValues = ['top', 'bottom']
        return acceptedValues.indexOf(value) !== -1
      },
      description: 'Vertical alignment of notification (top|bottom)'
    },
    horizontalAlign: {
      type: String,
      default: 'right',
      validator: value => {
        let acceptedValues = ['left', 'center', 'right']
        return acceptedValues.indexOf(value) !== -1
      },
      description: 'Horizontal alignment of notification (left|center|right)'
    },
    type: {
      type: String,
      default: 'info',
      // validator: value => {
      //   let acceptedValues = [
      //     'default',
      //     'info',
      //     'primary',
      //     'danger',
      //     'warning',
      //     'success'
      //   ]
      //   return acceptedValues.indexOf(value) !== -1
      // },
      description: 'Notification type of notification (default|info|primary|danger|warning|success)'
    },
    timeout: {
      type: Number,
      default: 5000,
      validator: value => {
        return value >= 0
      },
      description: 'Notification timeout (closes after X milliseconds). Default is 5000 (5s)'
    },
    timestamp: {
      type: Date,
      default: () => new Date(),
      description: 'Notification timestamp (used internally to handle notification removal correctly)'
    },
    component: {
      type: [Object, Function],
      description: 'Custom content component. Cane be a `.vue` component or render function',
      default: null
    },
    showClose: {
      type: Boolean,
      default: true,
      description: 'Whether to show close button'
    },
    closeOnClick: {
      type: Boolean,
      default: true,
      description: 'Whether to close notification when clicking it\' body'
    },
    clickHandler: {
      type: Function,
      description: 'Custom notification click handler',
      default: null
    }
  },
  data () {
    return {
      elmHeight: 0
    }
  },
  computed: {
    hasIcon () {
      return this.icon && this.icon.length > 0
    },
    alertType () {
      return `bg-${this.type}`
    },
    customPosition () {
      let initialMargin = 20
      let alertHeight = this.elmHeight + 10
      let sameAlertsCount = this.$notifications.state.filter(alert => {
        return (
          alert.horizontalAlign === this.horizontalAlign &&
            alert.verticalAlign === this.verticalAlign &&
            alert.timestamp <= this.timestamp
        )
      }).length
      if (this.$notifications.settings.overlap) {
        sameAlertsCount = 1
      }
      let pixels = (sameAlertsCount - 1) * alertHeight + initialMargin
      let styles = {}
      if (this.verticalAlign === 'top') {
        styles.top = `${pixels}px`
      } else {
        styles.bottom = `${pixels}px`
      }
      return styles
    }
  },
  mounted () {
    this.elmHeight = this.$el.clientHeight
    if (this.timeout) {
      setTimeout(this.close, this.timeout)
    }
  },
  methods: {
    close () {
      this.$emit('close', this.timestamp)
    },
    tryClose (evt) {
      if (this.clickHandler) {
        this.clickHandler(evt, this)
      }
      if (this.closeOnClick) {
        this.close()
      }
    }
  }
}
</script>
<style lang="scss">
  .notifications .alert {
    position: fixed;
    z-index: 10000;

    &[data-notify='container'] {
      max-width: 500px;
    }

    &.center {
      margin: 0 auto;
    }
    &.left {
      left: 20px;
    }
    &.right {
      right: 20px;
    }
  }
</style>
