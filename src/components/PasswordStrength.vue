<template>
  <div
    v-show="password"
    class="text-muted font-italic">
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
