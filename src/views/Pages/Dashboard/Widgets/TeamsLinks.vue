<template>
  <div>
    <card
      :show-footer-line="true"
      class="card-stats cursor-pointer"
      style="background: #5558AF;"
      @click.native="openModal()">
      <!-- Body -->
      <div class="row">
        <div class="col pr-0">
          <slot>
            <h5 class="card-title text-white mb-1">
              LIENS MICROSOFT TEAMS
            </h5>

            <div style="height: 36px !important">
              <span class="h3 font-weight-bold mt--1 mr-2 float-left text-white">
                Récupérer liens teams cours actuel
              </span>
            </div>
          </slot>
        </div>

        <div class="col-auto">
          <slot name="icon">
            <div class="icon icon-shape bg-white rounded-circle shadow">
              <img
                style="height: 25px"
                src="/img/icons/teams.svg"
                alt="Teams">
            </div>
          </slot>
        </div>
      </div>

      <!-- Footer -->
      <p class="mt-1 mb-0 text-sm">
        <slot name="footer">
          <span class="text-white">
            <i class="fas fa-external-link-alt mr-1"/>
            Cliquez pour afficher les liens Teams
          </span>
        </slot>
      </p>
    </card>

    <!-- ================================================ -->
    <!-- == MODAL ======================================= -->
    <!-- ================================================ -->
    <modal
      :show="showModal"
      @close="closeModal()">
      <!-- header -->
      <template slot="header">
        <h5 class="modal-title">Microsoft Teams</h5>
      </template>

      <base-alert
        type="primary"
        class="mb-5">
        <b>Info : </b>les liens sont disponibles 15 minutes avant le début d'un cours, et disparaissent 15 minutes après sa fin.
      </base-alert>

      <!-- loading -->
      <span v-if="loading">
        <div class="row">
          <div class="col-6">
            <h3>Intitulé :</h3>
            <span>
              <placeholder class="w-100"/>
            </span>
          </div>
          <div class="col-6">
            <h3>Horaire :</h3>
            <span>
              <placeholder class="w-100"/>
            </span>
          </div>
        </div>

        <div class="row mt-3">
          <div class="col-12">
            <h3>Liens :</h3>
            <placeholder class="w-100 my-2"/>
          </div>
        </div>
        <div class="row">
          <div class="col-6 pr-1"><placeholder class="w-100 my-2"/></div>
          <div class="col-6 pl-1"><placeholder class="w-100 my-2"/></div>
          <div class="col-6 pr-1"><placeholder class="w-100 my-2"/></div>
          <div class="col-6 pl-1"><placeholder class="w-100 my-2"/></div>
        </div>
      </span>

      <!-- links -->
      <span v-if="!loading && teamsLinks.length > 0">
        <div
          v-for="(val, index) in teamsLinks"
          :key="index">
          <div class="row">
            <div class="col-6">
              <h3>Intitulé :</h3>
              <p>{{ val.subject }}</p>
            </div>
            <div class="col-6">
              <h3>Horaire :</h3>
              <p>{{ val.start }} - {{ val.end }}</p>
            </div>
          </div>

          <div class="row">
            <div class="col-12">
              <div class="row mb-3">
                <div class="col-12">
                  <h3>Liens (cliquez pour ouvrir) :</h3>
                  <a
                    :href="val.links[0]"
                    target="_blank"
                    rel="noreferrer noopenner">
                    <img
                      style="height: 20px"
                      src="/img/icons/teams.svg"
                      alt="Teams">
                    Lien du cours (cliquez pour accéder)
                  </a>
                </div>
              </div>

              <div class="row">
                <div
                  v-for="(v, i) in groupLinks(val.links)"
                  :key="i"
                  class="col-6 mb-0">
                  <a
                    :href="v"
                    target="_blank"
                    rel="noreferrer noopenner">
                    <img
                      style="height: 20px"
                      src="/img/icons/teams.svg"
                      alt="Teams">
                    Groupe {{ (i+1) }}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </span>

      <!-- no link available -->
      <span v-if="!loading && teamsLinks.length === 0">
        <div class="text-center">
          <i>Aucun lien disponible.</i>
        </div>
      </span>

      <!-- footer -->
      <template slot="footer">
        <base-button
          size="md"
          type="primary"
          @click="closeModal()">
          Fermer
        </base-button>
      </template>
    </modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  components: {

  },
  data () {
    return {
      showModal: false
    }
  },
  computed: {
    ...mapState({
      loading: state => state.calendar.status.isFetchingTeams,
      teamsLinks: state => state.calendar.teamsLinks
    })
  },
  mounted () {
  },
  methods: {
    openModal () {
      this.$store.dispatch('calendar/fetchTeams')
      this.showModal = true
    },
    closeModal () {
      this.showModal = false
    },
    groupLinks (links) {
      return links.slice(1)
    }
  }
}
</script>
