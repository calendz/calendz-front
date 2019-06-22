<template>
  <component
    :is="baseComponent"
    :to="link.path ? link.path : '/'"
    :class="{ active: isActive }"
    class="nav-item"
    tag="li"
  >
    <a
      v-if="isMenu"
      :class="{ active: isActive }"
      :aria-expanded="!collapsed"
      class="sidebar-menu-item nav-link"
      data-toggle="collapse"
      @click.prevent="collapseMenu"
    >
      <template v-if="addLink">
        <span class="nav-link-text">
          {{ link.name }} <b class="caret"/>
        </span>
      </template>
      <template v-else>
        <i :class="link.icon"/>
        <span class="nav-link-text">{{ link.name }} <b class="caret"/></span>
      </template>
    </a>

    <collapse-transition>
      <div
        v-if="$slots.default || isMenu"
        v-show="!collapsed"
        class="collapse show"
      >
        <ul class="nav nav-sm flex-column">
          <slot/>
        </ul>
      </div>
    </collapse-transition>

    <slot
      v-if="children.length === 0 && !$slots.default && link.path"
      name="title"
    >
      <component
        :to="link.path"
        :is="elementType(link, false)"
        :class="{ active: link.active }"
        :target="link.target"
        :href="link.path"
        class="nav-link"
        @click.native="linkClick"
      >
        <template v-if="addLink">
          <span class="nav-link-text">{{ link.name }}</span>
        </template>
        <template v-else>
          <i :class="link.icon"/>
          <span class="nav-link-text">{{ link.name }}</span>
        </template>
      </component>
    </slot>
  </component>
</template>
<script>
import { CollapseTransition } from 'vue2-transitions'

export default {
  name: 'SidebarItem',
  components: {
    CollapseTransition
  },
  props: {
    menu: {
      type: Boolean,
      default: false,
      description:
        "Whether the item is a menu. Most of the item it's not used and should be used only if you want to override the default behavior."
    },
    link: {
      type: Object,
      default: () => {
        return {
          name: '',
          path: '',
          children: []
        }
      },
      description:
        'Sidebar link. Can contain name, path, icon and other attributes. See examples for more info'
    }
  },
  provide () {
    return {
      addLink: this.addChild,
      removeLink: this.removeChild
    }
  },
  inject: {
    addLink: { default: null },
    removeLink: { default: null },
    autoClose: {
      default: true
    }
  },
  data () {
    return {
      children: [],
      collapsed: true
    }
  },
  computed: {
    baseComponent () {
      return this.isMenu || this.link.isRoute ? 'li' : 'router-link'
    },
    linkPrefix () {
      if (this.link.name) {
        let words = this.link.name.split(' ')
        return words.map(word => word.substring(0, 1)).join('')
      }
    },
    isMenu () {
      return this.children.length > 0 || this.menu === true
    },
    isActive () {
      if (this.$route && this.$route.path) {
        let matchingRoute = this.children.find(c =>
          this.$route.path.startsWith(c.link.path)
        )
        if (matchingRoute !== undefined) {
          return true
        }
      }
      return false
    }
  },
  mounted () {
    if (this.addLink) {
      this.addLink(this)
    }
    if (this.link.collapsed !== undefined) {
      this.collapsed = this.link.collapsed
    }
    if (this.isActive && this.isMenu) {
      this.collapsed = false
    }
  },
  destroyed () {
    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
    if (this.removeLink) {
      this.removeLink(this)
    }
  },
  methods: {
    addChild (item) {
      const index = this.$slots.default.indexOf(item.$vnode)
      this.children.splice(index, 0, item)
    },
    removeChild (item) {
      const tabs = this.children
      const index = tabs.indexOf(item)
      tabs.splice(index, 1)
    },
    elementType (link, isParent = true) {
      if (link.isRoute === false) {
        return isParent ? 'li' : 'a'
      } else {
        return 'router-link'
      }
    },
    linkAbbreviation (name) {
      const matches = name.match(/\b(\w)/g)
      return matches.join('')
    },
    linkClick () {
      if (
        this.autoClose &&
        this.$sidebar &&
        this.$sidebar.showSidebar === true
      ) {
        this.$sidebar.displaySidebar(false)
      }
    },
    collapseMenu () {
      this.collapsed = !this.collapsed
    },
    collapseSubMenu (link) {
      link.collapsed = !link.collapsed
    }
  }
}
</script>
<style>
.sidebar-menu-item {
  cursor: pointer;
}
</style>
