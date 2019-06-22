<template>
  <li
    :class="{ active: active }"
    class="breadcrumb-item"><slot/></li>
</template>
<script>
export default {
  name: 'BreadcrumbItem',
  props: {
    active: {
      type: Boolean,
      default: false,
      description: 'Whether breadcrumb item is active'
    }
  }
}
</script>
<style></style>
