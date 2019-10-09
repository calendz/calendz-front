<template>
  <div
    :data="backgroundColor"
    style="overflow-x: hidden"
    class="sidenav navbar navbar-vertical fixed-left navbar-expand-xs navbar-light bg-white"
    @mouseenter="$sidebar.onMouseEnter()"
    @mouseleave="$sidebar.onMouseLeave()">
    <div
      ref="sidebarScrollArea"
      class="scrollbar-inner">
      <div class="sidenav-header d-flex align-items-center">
        <router-link
          to="/dashboard"
          style="font-size: 30px; font-family: Catamaran;"
          class="navbar-brand text-primary font-weight-900 py-0">
          <i class="ni ni-calendar-grid-58"/>
          calendz
        </router-link>
        <div class="ml-auto">
          <!-- Sidenav toggler -->
          <div
            :class="{'active': !$sidebar.isMinimized }"
            class="sidenav-toggler d-none d-xl-block"
            @click="minimizeSidebar">
            <div class="sidenav-toggler-inner">
              <i class="sidenav-toggler-line"/>
              <i class="sidenav-toggler-line"/>
              <i class="sidenav-toggler-line"/>
            </div>
          </div>
        </div>
      </div>
      <slot/>
      <div class="navbar-inner">
        <ul class="navbar-nav">
          <slot name="links">
            <sidebar-item
              v-for="(link, index) in sidebarLinks"
              :key="link.name + index"
              :link="link"
            >
              <sidebar-item
                v-for="(subLink, index) in link.children"
                :key="subLink.name + index"
                :link="subLink"
              />
            </sidebar-item>
          </slot>
        </ul>
        <slot name="links-after"/>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Sidebar',
  props: {
    title: {
      type: String,
      default: 'Calendz',
      description: 'Sidebar title'
    },
    shortTitle: {
      type: String,
      default: 'Calendz',
      description: 'Sidebar short title'
    },
    logo: {
      type: String,
      default: 'img/brand/logo-blue.png',
      description: 'Sidebar app logo'
    },
    backgroundColor: {
      type: String,
      default: 'vue',
      validator: value => {
        let acceptedValues = [
          '',
          'vue',
          'blue',
          'green',
          'orange',
          'red',
          'primary'
        ]
        return acceptedValues.indexOf(value) !== -1
      },
      description:
        'Sidebar background color (vue|blue|green|orange|red|primary)'
    },
    sidebarLinks: {
      type: Array,
      default: () => [],
      description:
        "List of sidebar links as an array if you don't want to use components for these."
    },
    autoClose: {
      type: Boolean,
      default: true,
      description:
        'Whether sidebar should autoclose on mobile when clicking an item'
    }
  },
  provide () {
    return {
      autoClose: this.autoClose
    }
  },
  beforeDestroy () {
    if (this.$sidebar.showSidebar) {
      this.$sidebar.showSidebar = false
    }
  },
  methods: {
    minimizeSidebar () {
      if (this.$sidebar) {
        this.$sidebar.toggleMinimize()
      }
    }
  }
}
</script>

<style scoped>
  @media (min-width: 992px) {
    .navbar-search-form-mobile,
    .nav-mobile-menu {
      display: none;
    }
  }

  .ni-calendar-grid-58 {
    vertical-align: -4px;
    margin-right: 4px
  }
</style>
