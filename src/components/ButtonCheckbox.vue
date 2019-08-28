<template>
  <div
    class="btn-group-toggle"
    data-toggle="buttons">
    <label
      :class="[{ active: value }, buttonClasses]"
      class="btn">
      <input
        v-model="model"
        type="checkbox"
        checked=""
        autocomplete="off">
      <slot/>
    </label>
  </div>
</template>
<script>
export default {
  name: 'ButtonCheckbox',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: Boolean,
      description: 'Checked value',
      default: false
    },
    buttonClasses: {
      type: [String, Object],
      description: 'Inner button css classes',
      default: ''
    }
  },
  computed: {
    model: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('change', val)
      }
    }
  }
}
</script>
<style>
</style>
