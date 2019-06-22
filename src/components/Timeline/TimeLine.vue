<template>
  <div
    :class="{[`timeline-${type}`]: type}"
    class="timeline">
    <slot/>
  </div>
</template>
<script>
export default {
  name: 'TimeLine',
  props: {
    type: {
      type: String,
      default: ''
    }
  }
}
</script>
<style></style>
