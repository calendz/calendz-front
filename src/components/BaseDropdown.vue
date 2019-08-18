<template>
  <component
    v-click-outside="closeDropDown"
    :is="tag"
    :class="[{ show: isOpen }, `drop${direction}`]"
    @click="toggleDropDown"
  >
    <slot
      :is-open="isOpen"
      name="title-container">
      <component
        :is="titleTag"
        :class="[{'dropdown-toggle': hasToggle}, titleClasses]"
        :aria-expanded="isOpen"
        class="btn-rotate"
        data-toggle="dropdown"
      >
        <slot
          :is-open="isOpen"
          name="title">
          <i :class="icon"/> {{ title }}
          <span
            v-if="pillAmount > 0"
            class="badge badge-sm badge-pill badge-danger badge-notification">{{ pillAmount }}</span>
        </slot>
      </component>
    </slot>
    <ul
      :class="[
        { show: isOpen },
        { 'dropdown-menu-right': menuOnRight },
        menuClasses
      ]"
      class="dropdown-menu"
    >
      <slot/>
    </ul>
  </component>
</template>
<script>
export default {
  name: 'BaseDropdown',
  props: {
    tag: {
      type: String,
      default: 'div',
      description: 'Dropdown html tag (e.g div, ul etc)'
    },
    titleTag: {
      type: String,
      default: 'button',
      description: 'Dropdown title (toggle) html tag'
    },
    title: {
      type: String,
      description: 'Dropdown title',
      default: ''
    },
    direction: {
      type: String,
      default: 'down', // up | down
      description: 'Dropdown menu direction (up|down)'
    },
    icon: {
      type: String,
      description: 'Dropdown icon',
      default: ''
    },
    titleClasses: {
      type: [String, Object, Array],
      description: 'Title css classes',
      default: ''
    },
    menuClasses: {
      type: [String, Object],
      description: 'Menu css classes',
      default: ''
    },
    menuOnRight: {
      type: Boolean,
      description: 'Whether menu should appear on the right',
      default: false
    },
    hasToggle: {
      type: Boolean,
      description: 'Whether dropdown has arrow icon shown',
      default: true
    },
    pillAmount: {
      type: Number,
      description: 'Number to display in the badge-pill span',
      default: 0
    }
  },
  data () {
    return {
      isOpen: false
    }
  },
  methods: {
    toggleDropDown () {
      this.isOpen = !this.isOpen
      this.$emit('change', this.isOpen)
    },
    closeDropDown () {
      this.isOpen = false
      this.$emit('change', false)
    }
  }
}
</script>
<style lang="scss" scoped>
.dropdown {
  cursor: pointer;
  user-select: none;
}

.badge-notification {
  position: absolute;
  margin-top: -8px;
  margin-left: -12px;
  font-size: 9.5px;
  padding-right: 0.6em;
  padding-left: 0.6em;
  padding-top: 0.4em;
  padding-bottom: 0.4em;
}
</style>
