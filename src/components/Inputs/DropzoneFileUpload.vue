<template>
  <div
    :class="[multiple ? 'dropzone-multiple': 'dropzone-single']"
    class="dropzone mb-3 dz-clickable">
    <div class="fallback">
      <div class="custom-file">
        <input
          id="projectCoverUploads"
          :multiple="multiple"
          type="file"
          class="custom-file-input">
        <label
          class="custom-file-label"
          for="projectCoverUploads">Choose file</label>
      </div>
    </div>
    <div
      v-if="!multiple"
      ref="previewSingle"
      :class="previewClasses"
      class="dz-preview dz-preview-single">
      <div class="dz-preview-cover">
        <img
          class="dz-preview-img"
          alt="Image"
          data-dz-thumbnail>
      </div>
    </div>
    <ul
      v-else
      ref="previewMultiple"
      :class="previewClasses"
      class="dz-preview dz-preview-multiple list-group list-group-lg list-group-flush">
      <li class="list-group-item px-0">
        <div class="row align-items-center">
          <div class="col-auto">
            <div class="avatar">
              <img
                class="avatar-img rounded"
                alt="Image"
                data-dz-thumbnail>
            </div>
          </div>
          <div class="col ml--3">
            <h4
              class="mb-1"
              data-dz-name>...</h4>
            <p
              class="small text-muted mb-0"
              data-dz-size>...</p>
          </div>
          <div class="col-auto">
            <button
              data-dz-remove="true"
              class="btn btn-danger btn-sm">
              <i class="fas fa-trash"/>
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'DropzoneFileUpload',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    options: {
      type: Object,
      default: () => ({})
    },
    value: {
      type: [String, Object, Array],
      default: ''
    },
    url: {
      type: String,
      default: 'http://'
    },
    multiple: {
      type: Boolean,
      description: 'Whether there are multiple files',
      default: false
    },
    previewClasses: {
      type: [String, Object, Array],
      default: ''
    }
  },
  data () {
    return {
      currentFile: null,
      files: [],
      showList: false
    }
  },
  async mounted () {
    this.initDropzone()
  },
  methods: {
    async initDropzone () {
      let Dropzone = await import('dropzone')
      Dropzone = Dropzone.default || Dropzone
      Dropzone.autoDiscover = false
      let preview = this.multiple ? this.$refs.previewMultiple : this.$refs.previewSingle
      let self = this
      let finalOptions = {
        ...this.options,
        url: this.url,
        thumbnailWidth: null,
        thumbnailHeight: null,
        previewsContainer: preview,
        previewTemplate: preview.innerHTML,
        maxFiles: (!this.multiple) ? 1 : null,
        acceptedFiles: (!this.multiple) ? 'image/*' : null,
        init: function () {
          this.on('addedfile', function (file) {
            if (!self.multiple && self.currentFile) {
              // this.removeFile(this.currentFile);
            }
            self.currentFile = file
          })
        }
      }
      this.dropzone = new Dropzone(this.$el, finalOptions)
      preview.innerHTML = ''
      let evtList = ['drop', 'dragstart', 'dragend', 'dragenter', 'dragover', 'addedfile', 'removedfile', 'thumbnail', 'error', 'processing', 'uploadprogress', 'sending', 'success', 'complete', 'canceled', 'maxfilesreached', 'maxfilesexceeded', 'processingmultiple', 'sendingmultiple', 'successmultiple', 'completemultiple', 'canceledmultiple', 'totaluploadprogress', 'reset', 'queuecomplete']
      evtList.forEach(evt => {
        this.dropzone.on(evt, (data) => {
          this.$emit(evt, data)

          if (evt === 'addedfile') {
            this.files.push(data)
            this.$emit('change', this.files)
          } else if (evt === 'removedfile') {
            let index = this.files.findIndex(f => f.upload.uuid === data.upload.uuid)
            if (index !== -1) {
              this.files.splice(index, 1)
            }
            this.$emit('change', this.files)
          }
        })
      })
    }
  }
}
</script>
<style>
</style>
