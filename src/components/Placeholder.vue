<template>
  <div
    :class="type === 'circle' ? 'placeholder placeholder-circle avatar avatar-sm rounded-circle' : ''"
    class="placeholder"/>
</template>

<script>
export default {
  name: 'Placeholder',
  props: {
    type: {
      type: String,
      default: 'div',
      description: `Placeholder's type`
    }
  }
}
</script>

<style lang="scss" scoped>
  .placeholder {
    background-color: #dee2e6;
    border: 2px;
    border-radius: 4px;

    animation-name: pulse;
    animation-duration: 2s;
    animation-iteration-count: infinite;

    width: 100px;
    height: 20px;
  }

  .placeholder-circle {
    width: 36px;
    height: 36px;
  }

  @keyframes pulse {
    0% { background-color: #dee2e6; }
    50% { background-color: #eef2f7; }
    100% { background-color: #dee2e6; }
  }
</style>>
