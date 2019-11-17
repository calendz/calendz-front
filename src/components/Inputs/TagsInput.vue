<template>
  <div class="tags-input__wrapper">
    <el-tag
      v-for="(tag, index) in dynamicTags"
      :key="tag + index"
      :type="tagType"
      :closable="true"
      :close-transition="false"
      size="small"
      @close="handleClose(tag)"
    >
      {{ tag }}
    </el-tag>

    <input
      ref="saveTagInput"
      v-model="inputValue"
      :placeholder="placeholder"
      type="text"
      class="form-control"
      size="mini"
      @input="onInput"
      @keyup.enter="handleInputConfirm"
      @blur="handleInputConfirm"
    >
  </div>
</template>

<script>
import { Tag } from 'element-ui'

export default {
  name: 'TagsInput',
  components: {
    [Tag.name]: Tag
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: Array,
      default: () => [],
      description: 'List of tags'
    },
    tagType: {
      type: String,
      default: 'primary',
      description: 'Tag type (primary|danger etc)'
    },
    placeholder: {
      type: String,
      default: 'Entrez une valeur...',
      description: `Input's placeholder`
    }
  },
  data () {
    return {
      dynamicTags: [],
      inputVisible: false,
      inputValue: ''
    }
  },
  created () {
    this.$watch(
      'value',
      newVal => {
        this.dynamicTags = [...newVal]
      },
      { immediate: true }
    )
  },
  methods: {
    handleClose (tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
      this.$emit('change', this.dynamicTags)
    },
    showInput () {
      this.inputVisible = true
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm () {
      let inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(inputValue)
        this.$emit('change', this.dynamicTags)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    onInput (evt) {
      this.$emit('input', evt.target.value)
    }
  }
}
</script>
