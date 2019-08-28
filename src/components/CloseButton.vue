<template>
  <button
    :data-target="`#${target}`"
    :aria-controls="target"
    :aria-expanded="expanded"
    type="button"
    class="navbar-toggler"
    data-toggle="collapse"
    aria-label="Toggle navigation"
    @click="handleClick"
  >
    <span/> <span/>
  </button>
</template>
<script>
export default {
  name: 'CloseButton',
  props: {
    target: {
      type: [String, Number],
      description: 'Close button target element',
      default: ''
    },
    expanded: {
      type: Boolean,
      description: 'Whether button is expanded (aria-expanded attribute)',
      default: false
    }
  },
  methods: {
    handleClick (evt) {
      this.$emit('click', evt)
    }
  }
}
</script>
<style></style>
