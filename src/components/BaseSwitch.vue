<template>
  <label
    :class="switchClass"
    class="custom-toggle">
    <input
      v-model="model"
      :disabled="disabled"
      type="checkbox">
    <span
      :data-label-off="offText"
      :data-label-on="onText"
      class="custom-toggle-slider rounded-circle"/>
  </label>
</template>
<script>
export default {
  name: 'BaseSwitch',
  props: {
    value: {
      type: [Array, Boolean],
      default: false
    },
    type: {
      type: String,
      default: 'false'
    },
    onText: {
      type: String,
      default: 'Yes'
    },
    offText: {
      type: String,
      default: 'No'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    switchClass () {
      let baseClass = 'custom-toggle-'
      if (this.type) {
        return baseClass + this.type
      }
      return ''
    },
    model: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  },
  methods: {
    triggerToggle () {
      this.model = !this.model
    }
  }
}
</script>
<style></style>
