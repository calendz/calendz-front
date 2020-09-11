<template>
  <div class="card">
    <!-- Card header -->
    <div class="card-header">
      <div class="row align-items-center">
        <div class="col-8">
          <h5 class="h3 mb-0">Envoyer un mail général</h5>
        </div>
        <div class="col text-right">
          <base-button
            size="sm"
            type="primary"
            native-type="submit"
            form="create-email">
            Envoyer
          </base-button>
        </div>
      </div>
    </div>

    <!-- Card body -->
    <div class="card-body pb-3 ">
      <form
        id="create-email"
        role="form"
        @submit.prevent="handleSubmit">
        <div class="row">
          <!-- subject -->
          <div class="col-md-6">
            <base-input
              v-validate="'required'"
              v-model="mailForm.subject"
              :error="getError('objet')"
              :valid="isValid('objet')"
              name="objet"
              label="Objet"
              class="w-100"
              placeholder="Entrez un objet"/>
          </div>

          <!-- title -->
          <div class="col-md-6">
            <base-input
              v-validate="'required'"
              v-model="mailForm.title"
              :error="getError('titre')"
              :valid="isValid('titre')"
              name="titre"
              label="Titre"
              class="w-100"
              placeholder="Entrez un titre"/>
          </div>
        </div>

        <!-- content -->
        <div class="row">
          <div class="col-md-12">
            <base-input
              :error="getError('contenu')"
              :valid="isValid('contenu')"
              class="w-100"
              label="Contenu">
              <textarea
                v-validate="'required'"
                v-model="mailForm.content"
                name="content"
                class="form-control"
                rows="3"
                placeholder="Entrez le contenu du mail..."/>
            </base-input>
          </div>
        </div>

        <div class="row">
          <!-- CTA label -->
          <div class="col-md-6">
            <base-input
              v-validate="'required'"
              v-model="mailForm.ctaLabel"
              :error="getError('cta-label')"
              :valid="isValid('cta-label')"
              name="cta-label"
              label="Label CTA"
              class="w-100"
              placeholder="Entrez le label"/>
          </div>

          <!-- CTA URL -->
          <div class="col-md-6">
            <base-input
              v-validate="'required|url'"
              v-model="mailForm.ctaUrl"
              :error="getError('cta-url')"
              :valid="isValid('cta-url')"
              name="cta-url"
              label="URL CTA"
              class="w-100"
              placeholder="Entrez un lien"/>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { Select, Option } from 'element-ui'

export default {
  components: {
    [Select.name]: Select,
    [Option.name]: Option
  },
  data () {
    return {
      mailForm: {}
    }
  },
  methods: {
    handleSubmit () {
      this.$validator.validate().then(valid => {
        if (valid) {
          this.$store.dispatch('sysconf/sendMail', this.mailForm)
        }
      })
    },
    getError (name) {
      return this.errors.first(name)
    },
    isValid (name) {
      return this.validated && !this.errors.has(name)
    }
  }
}
</script>
