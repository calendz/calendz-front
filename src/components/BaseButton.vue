<template>
  <component
    :is="tag"
    :type="tag === 'button' ? nativeType : ''"
    :disabled="disabled || loading"
    :class="[
      { 'rounded-circle': round },
      { 'btn-block': block },
      { 'btn-wd': wide },
      { 'btn-icon btn-fab': icon },
      { [`btn-${type}`]: type && !outline },
      { [`btn-${size}`]: size },
      { [`btn-outline-${type}`]: outline && type },
      { 'btn-link': link },
      { disabled: disabled && tag !== 'button' }
    ]"
    class="btn"
    @click="handleClick"
  >
    <slot name="loading">
      <i
        v-if="loading"
        class="fas fa-spinner fa-spin"/>
    </slot>
    <slot/>
  </component>
</template>
<script>
export default {
  name: 'BaseButton',
  props: {
    tag: {
      type: String,
      description: 'Button html tag',
      default: 'button'
    },
    round: {
      type: Boolean,
      description: 'Whether the button rounded',
      default: false
    },
    icon: {
      type: Boolean,
      description: 'Whether the button has an icon',
      default: false
    },
    block: {
      type: Boolean,
      description: '?',
      default: false
    },
    loading: {
      type: Boolean,
      description: '?',
      default: false
    },
    wide: {
      type: Boolean,
      description: '?',
      default: false
    },
    disabled: {
      type: Boolean,
      description: 'Whether the button is disabled',
      default: false
    },
    type: {
      type: String,
      description: 'Button type (primary|secondary|danger etc)',
      default: 'default'
    },
    nativeType: {
      type: String,
      description: 'Button native type (e.g button, input etc)',
      default: 'button'
    },
    size: {
      type: String,
      description: 'Button size (sm|lg)',
      default: 'sm'
    },
    outline: {
      type: Boolean,
      description: 'Whether button is outlined (only border has color)',
      default: false
    },
    link: {
      type: Boolean,
      description: 'Whether button is a link (no borders or background)',
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
<style scoped lang="scss">
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  /deep/ i {
    padding: 0 3px;
  }
}
</style>
