<template>
  <div>

    <!-- =================================== -->
    <!-- == ELEMENT-UI'S SELECT ============ -->
    <!-- =================================== -->
    <base-input
      v-if="!legacy"
      :error="getError('groupe')"
      :valid="isValid('groupe')"
      :label="label"
      class="w-100">
      <el-select
        v-validate="'required|valid_group'"
        v-model="inputValue"
        :disabled="disabled"
        name="groupe">
        <el-option
          v-for="(option, index) in options"
          :key="index"
          :label="option.value"
          :value="option.value"/>
      </el-select>
    </base-input>

    <!-- =================================== -->
    <!-- == LEGACY SELECT ================== -->
    <!-- =================================== -->
    <base-input
      v-if="legacy"
      :error="getError('groupe')"
      :valid="isValid('groupe')"
      :label="label"
      class="mb-3"
      prepend-icon="ni ni-hat-3">
      <select
        v-validate="'required|valid_group'"
        v-model="inputValue"
        :disabled="disabled"
        name="groupe"
        class="form-control">
        <option
          value=""
          hidden>Séléctionnez votre groupe</option>
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
import { Select, Option } from 'element-ui'

export default {
  components: {
    [Select.name]: Select,
    [Option.name]: Option
  },
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
      doc: `Ìnput's label`
    },
    legacy: {
      type: Boolean,
      default: false,
      doc: `Whether we should use a legacy select or element-ui's select`
    }
  },
  data () {
    return {
      inputValue: this.value,
      options: [
        { value: 'G1' },
        { value: 'G2' },
        { value: 'G3' },
        { value: 'G1 (dev)' },
        { value: 'G2 (dev)' },
        { value: 'G3 (dev)' },
        { value: 'G1 (infra-réseau)' },
        { value: 'G2 (infra-réseau)' },
        { value: 'G3 (infra-réseau)' }
      ]
    }
  },
  watch: {
    inputValue (newVal) {
      this.$emit('input', newVal)
    }
  },
  mounted () {
    this.inputValue = store.getters['account/isLoggedIn'] ? store.state.account.user.group : ''
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
