<template>
  <div
    v-show="hideWhenEmpty ? password : true"
    :class="{ italic: 'font-italic' }"
    :style="`font-size: ${size};`"
    class="text-muted">
    <small>Force du mot de passe :
      <span
        :class="{ 'text-danger': strength === 'faible' || strength === 'insuffisante',
                  'text-warning': strength === 'moyen',
                  'text-success': strength === 'fort' }"
        class="font-weight-700">
        {{ strength }}
      </span>
    </small>
  </div>
</template>
<script>
export default {
  name: 'PasswordStrength',
  props: {
    password: {
      type: String,
      description: 'The password to evaluate the strength of',
      default: ''
    },
    size: {
      type: String,
      description: 'Text size',
      default: ''
    },
    italic: {
      type: Boolean,
      description: 'Whether the text should be in italic',
      default: false
    },
    hideWhenEmpty: {
      type: Boolean,
      description: 'Whether the component should be shown if there are no password',
      default: true
    }
  },
  computed: {
    strength () {
      switch (this.evaluateStrength()) {
        case 1: return 'faible'
        case 2: return 'moyen'
        case 3: return 'fort'
        default: return 'insuffisante'
      }
    }
  },
  methods: {
    evaluateStrength () {
      if (this.password.length < 6) {
        return 0
      } else if (this.password.length < 9) {
        return 1
      } else if (this.password.length < 12) {
        return 2
      } else {
        return 3
      }
    }
  }
}
</script>
