<template>
  <div>
    <!-- single error message -->
    <div v-show="singleError">
      <base-alert
        :class="alertClasses"
        type="danger">
        <span class="alert-inner--icon"><i class="fas fa-exclamation-triangle"/></span>
        <span class="alert-inner--text"><strong> Erreur !</strong> {{ singleError }}.</span>
      </base-alert>
    </div>

    <!-- multiple error messages -->
    <base-alert
      v-for="(err, index) in multipleErrors"
      :key="index"
      :class="alertClasses"
      :dismissible="dismissible"
      type="danger">
      <button
        v-if="dismissible"
        type="button"
        class="close"
        data-dismiss="alert"
        aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
      <strong>Erreur !</strong> {{ err }}.
    </base-alert>
  </div>
</template>
<script>
export default {
  name: 'ApiErrors',
  props: {
    singleError: {
      type: String,
      default: '',
      doc: 'Single error message'
    },
    multipleErrors: {
      type: Array,
      default: () => [],
      doc: 'Multiple error messages'
    },
    alertClasses: {
      type: [Array, String],
      default: '',
      doc: 'Base alert classes'
    },
    dismissible: {
      type: Boolean,
      default: false,
      doc: 'Whether alerts are dismissible or not'
    }
  }
}
</script>
