<template>
  <h1>Loading...</h1>
</template>

<script>
import router from '@/routes/router'

export default {
  beforeCreate () {
    const target = localStorage.getItem('calendz.settings.defaultPage') || '/dashboard'
    router.push(target)
  }
}
</script>
