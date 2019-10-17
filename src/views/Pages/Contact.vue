<template>
  <div style="overflow-x: hidden">
    <!-- Header -->
    <div class="header bg-primary pt-9 pb-9">
      <div class="container">
        <div class="header-body">
          <div class="row align-items-center">
            <div class="col-lg-6">
              <div class="pr-5">
                <h1 class="display-2 text-white font-weight-bold mb-0">Contact</h1>
                <h2 class="display-4 text-white font-weight-light">Où, et comment nous joindre.</h2>
                <p class="text-white mt-4 font h2 font-weight-light text-justify">Le meilleur moyen de nous joindre est via notre serveur Discord. Que cela concerne un problème, une proposition d'idée ou n'importe quel autre sujet, nous serons ravis d'échanger avec vous.</p>
                <div class="mt-5">
                  <button class="btn btn-neutral mb-2">
                    <a
                      ref="nofollow noreferrer noopenner"
                      href="https://discord.gg/ZXnG2HC"
                      target="_blank"
                      class="">Rejoindre notre Discord</a>
                  </button>
                  <router-link
                    to="#mail-form"
                    class="btn btn-default mb-2">
                    <span class="nav-link-inner--text">Envoyer un mail</span>
                  </router-link>
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="row pt-5">
                <iframe
                  class="mx-auto px-2"
                  src="https://discordapp.com/widget?id=605472256780402718&theme=dark"
                  width="400"
                  height="400"
                  allowtransparency="true"
                  frameborder="0"/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="separator separator-bottom separator-skew zindex-100">
        <svg
          x="0"
          y="0"
          viewBox="0 0 2560 100"
          preserveAspectRatio="none"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg">
          <polygon
            class="fill-default"
            points="2560 0 2560 100 0 100"/>
        </svg>
      </div>
    </div>

    <!-- Page content -->
    <section class="py-6 pb-9 bg-default">
      <div class="row justify-content-center text-center">
        <div class="col-xl-5 col-lg-7 col-md-9 col-11">

          <div>
            <h2
              id="mail-form"
              class="display-3 text-white">
              Vous préférez nous envoyer un mail ?
            </h2>
            <p class="lead text-white text-justify mx-auto">
              Pas de soucis ! Remplissez le formulaire suivant en veillant à ce que vos coordonnées soient correctes afin que nous puissions vous répondre !
            </p>
          </div>

          <div class="mt-5 mb--9">
            <div class="card bg-secondary border-0">
              <div class="card-body">

                <form
                  class="form-group row"
                  role="form"
                  @submit.prevent="handleSubmit">

                  <div class="col-md-6">
                    <base-input
                      v-validate="'required|min:3|max:64'"
                      :error="getError('sujet')"
                      :valid="isValid('sujet')"
                      v-model="contactForm.subject"
                      name="sujet"
                      type="text"
                      label="Sujet"
                      class="text-left"
                      placeholder="Sujet de votre message"/>
                  </div>

                  <div class="col-md-6">
                    <base-input
                      v-validate="'required|email|min:3|max:64'"
                      :error="getError('email')"
                      :valid="isValid('email')"
                      v-model="contactForm.email"
                      name="email"
                      type="email"
                      label="Votre adresse mail"
                      class="text-left"
                      autocomplete="email"
                      placeholder="Votre adresse mail"/>
                  </div>

                  <div class="col-md-12">
                    <base-input>
                      <textarea
                        v-validate="'required|min:15|max:4000'"
                        :error="getError('message')"
                        :valid="isValid('message')"
                        v-model="contactForm.message"
                        name="message"
                        rows="12"
                        placeholder="Votre message..."
                        class="form-control"/>
                    </base-input>
                  </div>

                  <div class="col-md-12">
                    <base-button
                      :disabled="!sendMailEnabled"
                      class="mb--4"
                      size="lg"
                      type="primary"
                      native-type="submit">
                      Envoyer mon message
                    </base-button>
                  </div>
                </form>

              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  </div>
</template>

<script>
import ApiService from '../../services/api.service.js'

export default {
  data () {
    return {
      sendMailEnabled: true,
      contactForm: {
        subject: '',
        email: '',
        message: ''
      }
    }
  },
  methods: {
    handleSubmit () {
      this.$validator.validate().then(valid => {
        if (!valid) return
        this.sendMailEnabled = false

        ApiService.post('/contact', this.contactForm).then((res) => {
          this.$notify({ type: 'success', message: 'Votre message a bien été envoyé !' })
        }).catch(() => {
          this.sendMailEnabled = true
          this.$notify({ type: 'danger', message: `<b>Erreur !</b> Une erreur est survenue lors de l'envoi de votre message...` })
        })
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

<style scoped>
</style>
