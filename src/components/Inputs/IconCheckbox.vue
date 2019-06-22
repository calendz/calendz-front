<template>
  <div
    :class="{ active: checked }"
    class="choice"
    data-toggle="wizard-checkbox"
    @click="updateValue"
  >
    <input
      :name="name"
      :disabled="disabled"
      :checked="checked"
      type="checkbox"
    >
    <div class="icon">
      <slot name="icon"> <i :class="icon"/> </slot>
    </div>
    <slot name="title">
      <h6>{{ title }}</h6>
    </slot>
  </div>
</template>
<script>
export default {
  name: 'IconCheckbox',
  model: {
    prop: 'checked'
  },
  props: {
    checked: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      description: 'Whether the checkbox is disabled',
      default: false
    }
  },
  methods: {
    updateValue () {
      this.$emit('input', !this.checked)
    }
  }
}
</script>
<style></style>
