<template>
  <div class="world-map-container">
    <world-map
      v-bind="$attrs"
      v-on="$listeners"/>
  </div>
</template>
<script>
/*  We lazy load (async) the VectorMaps component because it contains 2 big libraries (jquery and jquery vector maps)
      If the component is not loaded within 200ms, we display a loading component in the meanwhile.
      This way, we don't bloat the main bundle with 2 unnecessary libs that we only need for this page :)
   */
import { LoadingPanel } from '@/components'
const WorldMap = () => ({
  component: import('./WorldMap.vue'),
  loading: LoadingPanel,
  delay: 200
})
export default {
  components: {
    WorldMap
  },
  inheritAttrs: false
}
</script>
<style>
  .world-map-container {
    min-height: 500px;
  }
</style>
