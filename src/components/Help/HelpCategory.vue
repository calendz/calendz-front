<template>
  <div class="col-xl-3 col-md-3 col-sm-6 hover-animation">
    <div
      :class="`${background} ${selected ? 'border-selected ' : 'border-0'}`"
      class="card cursor-pointer">
      <!-- Card body -->
      <div class="card-body mx-auto text-center">
        <span class="mx-auto text-white text-center">
          <i
            :class="icon"
            class="fa-2x mb-4" />
          <h3 class="card-title font-weight-bold mb-0 text-white">{{ title }}</h3>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    background: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: 'Test'
    },
    selected: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.hover-animation:hover {
  transition: all;
  transition-duration: 250ms;
  -moz-transform: translateY(-3px);
  -ms-transform: translateY(-3px);
  -o-transform: translateY(-3px);
  -webkit-transform: translateY(-3px);
  transform: translateY(-3px);
}

.border-selected {
  border: 3px solid #EDF2F7;

  -webkit-box-shadow: 0px 6px 31px -9px rgba(0,0,0,0.62);
  -moz-box-shadow: 0px 6px 31px -9px rgba(0,0,0,0.62);
  box-shadow: 0px 6px 31px -9px rgba(0,0,0,0.62);
}
</style>
