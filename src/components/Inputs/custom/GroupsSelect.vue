<template>
  <base-input
    :error="getError('groupe')"
    :valid="isValid('groupe')"
    class="w-100"
    label="Groupe">
    <el-select
      v-validate="'required'"
      v-model="inputValue"
      name="groupe">
      <el-option
        v-for="(option, index) in options"
        :key="index"
        :label="option.value"
        :value="option.value"/>
    </el-select>
  </base-input>
</template>

<script>
// TODO
// import store from '@/store'
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
    }
  },
  data () {
    return {
      inputValue: this.value,
      options: [
        { value: 'G1' },
        { value: 'G2' },
        { value: 'G3' },
        { value: 'G4' }
      ]
    }
  },
  watch: {
    inputValue (newVal) {
      this.$emit('input', newVal)
    }
  },
  mounted () {
    // TODO :
    // this.inputValue = store.state.account.user.group
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
