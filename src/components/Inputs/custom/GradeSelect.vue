<template>
  <div>
    <base-input
      :error="getError('classe')"
      :valid="isValid('classe')"
      :label="label"
      class="mb-3"
      prepend-icon="ni ni-hat-3"
    >
      <select
        v-validate="'required|valid_grade'"
        v-model="inputValue"
        :disabled="disabled"
        name="classe"
        class="form-control">
        <option
          value=""
          hidden>Sélectionnez votre niveau</option>
        <option
          v-for="(option, index) in options"
          :key="index"
          :value="option.value">{{ option.value }}</option>
      </select>
    </base-input>
  </div>
</template>

<script>
import store from '@/store'

export default {
  props: {
    value: {
      type: String,
      default: '',
      doc: 'Value'
    },
    disabled: {
      type: Boolean,
      default: true,
      doc: 'Whether the select should be disabled or not'
    },
    label: {
      type: String,
      default: '',
      doc: `Input's label`
    },
    school: {
      type: String,
      default: null,
      doc: `Previously selected school`
    }
  },
  data () {
    return {
      inputValue: this.value
    }
  },
  computed: {
    options () {
      switch (this.school) {
        case 'WIS':
          return [
            { value: 'WIS1' },
            { value: 'WIS2' },
            { value: 'WIS3' },
            { value: 'WIS4' },
            { value: 'WIS5' }
          ]
        case 'EPSI':
          return [
            { value: 'B1' },
            { value: 'B2' },
            { value: 'B3' },
            { value: 'I1' },
            { value: 'I2' }
          ]
        default:
          return [
            { value: 'Sélectionnez votre niveau' }
          ]
      }
    }
  },
  watch: {
    inputValue (newVal) {
      this.$emit('input', newVal)
    }
  },
  mounted () {
    this.inputValue = store.getters['account/isLoggedIn'] ? store.state.account.user.grade : ''
  },
  methods: {
    getError (name) {
      return this.errors.first(name)
    },
    isValid (name) {
      return this.validated && !this.errors.has(name)
    }
  }
}
</script>
