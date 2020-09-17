<template>
  <bread-crumb :list-classes="{ 'breadcrumb-links': true, 'breadcrumb-dark': !light }">
    <BreadCrumbItem>
      <li class="breadcrumb-item">
        <router-link to="/dashboard">
          <i class="fas fa-home"/>
        </router-link>
      </li>
    </BreadCrumbItem>
    <BreadCrumbItem
      v-for="(route, index) in getPathAsArray()"
      :key="route.name"
      :active="index === $route.matched.length - 1"
      style="display:inline-block"
    >
      <router-link
        v-if="index < $route.matched.length - 1"
        :to="{ name: route.name }"
      >
        {{ route.name }}
      </router-link>
      <span v-else>{{ route.name }}</span>
    </BreadCrumbItem>
  </bread-crumb>
</template>

<script>
import BreadCrumb from './Breadcrumb'
import BreadCrumbItem from './BreadcrumbItem'

export default {
  name: 'RouteBreadCrumb',
  components: {
    BreadCrumb,
    BreadCrumbItem
  },
  props: {
    light: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    getBreadName (route) {
      return route.name
    },
    getPathAsArray () {
      const array = this.$route.matched.slice()
      array.shift()
      return array
    }
  }
}
</script>
