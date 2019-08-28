<template>
  <div>
    <div
      :class="[
        { 'col-md-4': vertical && !tabNavWrapperClasses },
        { 'col-12': centered && !tabNavWrapperClasses },
        tabNavWrapperClasses
      ]"
    >
      <ul
        :class="[
          `nav-pills-${type}`,
          { 'flex-column': vertical },
          { 'justify-content-center': centered },
          tabNavClasses
        ]"
        class="nav nav-pills"
        role="tablist"
      >
        <li
          v-for="tab in tabs"
          :key="tab.id"
          class="nav-item active"
          data-toggle="tab"
          role="tablist"
          aria-expanded="true"
        >
          <a
            :href="`#${tab.id}`"
            :aria-expanded="tab.active"
            :class="{ active: tab.active }"
            data-toggle="tab"
            role="tablist"
            class="nav-link"
            @click.prevent="activateTab(tab)"
          >
            <tab-item-content :tab="tab"/>
          </a>
        </li>
      </ul>
    </div>
    <div
      :class="[
        { 'tab-space': !vertical },
        { 'col-md-8': vertical && !tabContentClasses },
        tabContentClasses
      ]"
      class="tab-content"
    >
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tabs',
  components: {
    TabItemContent: {
      props: ['tab'],
      render (h) {
        return h('div', [this.tab.$slots.title || this.tab.title])
      }
    }
  },
  provide () {
    return {
      addTab: this.addTab,
      removeTab: this.removeTab
    }
  },
  props: {
    type: {
      type: String,
      default: 'primary',
      validator: value => {
        let acceptedValues = [
          'primary',
          'info',
          'success',
          'warning',
          'danger'
        ]
        return acceptedValues.indexOf(value) !== -1
      }
    },
    activeTab: {
      type: String,
      default: '',
      description: 'Active tab name'
    },
    tabNavWrapperClasses: {
      type: [String, Object],
      default: '',
      description: 'ul wrapper css classes'
    },
    tabNavClasses: {
      type: [String, Object],
      default: '',
      description: 'ul css classes'
    },
    tabContentClasses: {
      type: [String, Object],
      default: '',
      description: 'tab content css classes'
    },
    vertical: {
      type: Boolean,
      description: 'Whether the tabs are vertical',
      default: false
    },
    centered: {
      type: Boolean,
      description: 'Whether the tabs are centered',
      default: false
    },
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      tabs: []
    }
  },
  watch: {
    value (newVal) {
      this.findAndActivateTab(newVal)
    }
  },
  mounted () {
    this.$nextTick(() => {
      if (this.value) {
        this.findAndActivateTab(this.value)
      }
    })
  },
  methods: {
    findAndActivateTab (title) {
      let tabToActivate = this.tabs.find(t => t.title === title)
      if (tabToActivate) {
        this.activateTab(tabToActivate)
      }
    },
    activateTab (tab) {
      if (this.handleClick) {
        this.handleClick(tab)
      }
      this.deactivateTabs()
      tab.active = true
    },
    deactivateTabs () {
      this.tabs.forEach(tab => {
        tab.active = false
      })
    },
    addTab (tab) {
      const index = this.$slots.default.indexOf(tab.$vnode)
      if (!this.activeTab && index === 0) {
        tab.active = true
      }
      if (this.activeTab === tab.name) {
        tab.active = true
      }
      this.tabs.splice(index, 0, tab)
    },
    removeTab (tab) {
      const tabs = this.tabs
      const index = tabs.indexOf(tab)
      if (index > -1) {
        tabs.splice(index, 1)
      }
    }
  }
}
</script>

<style scoped></style>
