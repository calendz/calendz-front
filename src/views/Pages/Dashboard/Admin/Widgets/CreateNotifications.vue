<template>
  <div class="card">
    <!-- Card header -->
    <div class="card-header">
      <div class="row align-items-center">
        <div class="col-8">
          <h5 class="h3 mb-0">Création de notifications</h5>
        </div>
        <div class="col text-right">
          <base-button
            size="sm"
            type="primary"
            native-type="submit"
            form="create-notification">
            Publier
          </base-button>
        </div>
      </div>
    </div>

    <!-- Card body -->
    <div class="card-body pb-3 ">
      <form
        id="create-notification"
        role="form"
        @submit.prevent="handleSubmit">
        <div class="row">
          <!-- title -->
          <div class="col-md-6">
            <base-input
              v-validate="'required'"
              v-model="title"
              :error="getError('titre')"
              :valid="isValid('titre')"
              name="titre"
              label="Titre"
              class="w-100"
              placeholder="Entrez un titre"/>
          </div>

          <!-- target -->
          <div class="col-md-6">
            <base-input
              :error="getError('cible')"
              :valid="isValid('cible')"
              class="w-100"
              label="Séléctionnez la cible">
              <el-select
                v-validate="'required'"
                v-model="select.target"
                name="cible"
                multiple
                filterable>
                <el-option
                  v-for="group in select.groups"
                  :key="group.label"
                  :label="group.label"
                  :value="group.value"/>
              </el-select>
            </base-input>
          </div>
        </div>

        <!-- message -->
        <div class="row">
          <div class="col-md-12">
            <base-input
              :error="getError('message')"
              :valid="isValid('message')"
              class="w-100"
              label="Message">
              <textarea
                v-validate="'required'"
                v-model="message"
                name="message"
                class="form-control"
                rows="3"
                resize="none"
                placeholder="Entrez le message à faire passer..."/>
            </base-input>
          </div>
        </div>

        <div class="row">
          <!-- icon -->
          <div class="col-md-6">
            <base-input
              v-validate="'required'"
              v-model="icon"
              :error="getError('icône')"
              :valid="isValid('icône')"
              name="icône"
              class="w-100"
              label="Icône"
              placeholder="fas fa-bell"/>
          </div>

          <!-- type -->
          <div class="col-md-6">
            <base-input
              v-validate="'required'"
              v-model="type"
              :error="getError('type')"
              :valid="isValid('type')"
              name="type"
              class="w-100"
              label="Type"
              placeholder="primary"/>
          </div>
        </div>

        <!-- preview -->
        <div class="row">
          <div class="col-md-12">
            <label class="form-control-label">Prévisualisation</label>

            <div
              class="card mb-3"
              style="border-radius: 10px">
              <div class="card-body">

                <div class="row align-items-center">
                  <div class="col-auto">
                    <i
                      :class="`${icon || 'fas fa-bell'} bg-${type || 'grey'}`"
                      class="avatar rounded-circle"/>
                  </div>
                  <div class="col container ml--2">

                    <div class="row">
                      <div class="col">
                        <h4
                          class="mb-0 text-sm"
                          v-html="title || `Le titre de la notification !`"/>
                      </div>
                      <div class="col-auto text-right">
                        <small class="text-muted">
                          <i class="fas fa-clock mr-1"/>
                          2h
                        </small>
                      </div>
                    </div>

                    <div class="row mt-1 px-3">
                      <p
                        class="text-sm mb-0"
                        v-html="message || `Commencez à taper votre message pour voir la prévisualisation s'actualiser.`"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>

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
      title: '',
      message: '',
      icon: '',
      type: '',
      select: {
        groups: [
          { value: 'all', label: 'Tous' }
        ],
        target: ''
      }
    }
  },
  methods: {
    handleSubmit () {
      this.$validator.validate().then(valid => {
        if (valid) {
          this.$store.dispatch('notifications/create', { target: this.select.target, title: this.title, message: this.message, icon: this.icon, type: this.type })
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
