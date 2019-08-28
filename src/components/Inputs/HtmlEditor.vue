<template>
  <div class="quill">
    <div :id="toolbarId">
      <div class="ql-formats">
        <button class="ql-bold"/>
        <button class="ql-italic"/>
        <button class="ql-underline"/>
        <button class="ql-link"/>
        <button class="ql-blockquote"/>
        <button class="ql-code"/>
        <button class="ql-image"/>
        <button
          type="button"
          class="ql-list"
          value="ordered"/>
        <button
          type="button"
          class="ql-list"
          value="bullet"/>
      </div>
    </div>
    <div
      ref="editor"
      :id="editorId"
      :name="name"
      class=""/>
  </div>
</template>
<script>
export default {
  name: 'HtmlEditor',
  props: {
    value: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      editor: null,
      content: null,
      lastHtmlValue: '',
      editorId: null,
      toolbarId: null
    }
  },
  watch: {
    value (newVal) {
      if (newVal !== this.content) {
        this.pasteHTML(newVal)
      }
    }
  },
  async mounted () {
    let Quill = await import('quill')
    Quill = Quill.default || Quill
    this.editorId = this.randomString()
    this.toolbarId = this.randomString()
    this.$nextTick(() => {
      this.initialize(Quill)
    })
  },
  methods: {
    initialize (Quill) {
      this.editor = new Quill(`#${this.editorId}`, {
        theme: 'snow',
        modules: {
          toolbar: `#${this.toolbarId}`
        }
      })

      if (this.value.length > 0) {
        this.editor.pasteHTML(this.value)
      }

      let editorRef = this.$refs.editor
      let node = editorRef.children[0]
      this.editor.on('text-change', () => {
        let html = node.innerHTML
        if (html === '<p><br></p>') {
          html = ''
        }
        this.content = html
        this.$emit('input', this.content)
      })
    },
    pasteHTML () {
      if (!this.editor) {
        return
      }
      this.editor.pasteHTML(this.value)
    },
    randomString () {
      let text = ''
      let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

      for (let i = 0; i < 5; i++) { text += possible.charAt(Math.floor(Math.random() * possible.length)) }

      return text
    }
  }
}
</script>
