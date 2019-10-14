<template>
  <base-input
    :error="getError('bts')"
    :valid="isValid('bts')"
    class="w-100"
    label="Option BTS">
    <el-select
      v-validate="'required'"
      v-model="inputValue"
      name="bts">
      <el-option
        v-for="(option, index) in options"
        :key="index"
        :label="option.label"
        :value="option.value"/>
    </el-select>
  </base-input>
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
      type: Boolean,
      default: false,
      doc: 'Value'
    }
  },
  data () {
    return {
      inputValue: this.value,
      options: [
        { label: 'Oui', value: true },
        { label: 'Non', value: false }
      ]
    }
  },
  watch: {
    inputValue (newVal) {
      this.$emit('input', newVal)
    }
  },
  mounted () {
    this.inputValue = store.state.account.user.bts
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

<style>

</style>
