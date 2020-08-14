<template>
  <div>
    <!-- ======================================= -->
    <!-- == "Base header" ====================== -->
    <!-- ======================================= -->
    <base-header
      type="primary"
      class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Aide</h6>
          <nav
            aria-label="breadcrumb"
            class="d-none d-md-inline-block ml-md-4">
            <route-bread-crumb/>
          </nav>
        </div>
      </div>
    </base-header>

    <!-- ======================================= -->
    <!-- == Main container ===================== -->
    <!-- ======================================= -->
    <div class="container-fluid mt--6">
      <div class="row justify-content-center">
        <div class="col-lg-12 card-wrapper">
          <div class="card p-5">
            <div class="row">

              <div class="d-none d-lg-block col-lg-3 mb-4">
                <p class="mb-2 font-weight-bold">Aide : emploi du temps</p>
                <small
                  :class="opened === 1 ? 'text-primary ' : 'text-gray'"
                  class="cursor-pointer"
                  @click="open(1)">📅 L'emploi du temps</small><br>
                <small
                  :class="opened === 2 ? 'text-primary' : 'text-gray'"
                  class="cursor-pointer"
                  @click="open(2)">👤 Voir l'emploi du temps d'un autre utilisateur</small><br>
                <small
                  :class="opened === 3 ? 'text-primary' : 'text-gray'"
                  class="cursor-pointer"
                  @click="open(3)">📑 Gérer ses devoirs depuis l'emploi du temps</small><br>
                <small
                  :class="opened === 4 ? 'text-primary' : 'text-gray'"
                  class="cursor-pointer"
                  @click="open(4)">🚤 Naviguer sur son emploi du temps</small><br>
                <small
                  :class="opened === 5 ? 'text-primary' : 'text-gray'"
                  class="cursor-pointer"
                  @click="open(5)">🤔 Informations diverses</small><br>
              </div>

              <div
                class="col-lg-9"
                style="max-height: 70vh; overflow-y: scroll">

                <!-- ==================================================================== -->
                <!-- ==================================================================== -->
                <help-section
                  :open="opened === 1"
                  title="📅 L'emploi du temps"
                  sub-title="La fonctionnalité principale de Calendz !"
                  @click.native="open(1)"
                >
                  <Calendar1 />
                </help-section>

                <!-- ==================================================================== -->
                <!-- ==================================================================== -->
                <help-section
                  :open="opened === 2"
                  title="👤 Voir l'emploi du temps d'un autre utilisateur"
                  sub-title="Apprennez à regarder l'emploi du temps de vos camarades"
                  @click.native="open(2)"
                >
                  <Calendar2 />
                </help-section>

                <!-- ==================================================================== -->
                <!-- ==================================================================== -->
                <help-section
                  :open="opened === 3"
                  title="📑 Gérer ses devoirs depuis l'emploi du temps"
                  sub-title="Visualiser ses devoirs et en ajouter de nouveaux sans quitter l'emploi du temps"
                  @click.native="open(3)"
                >
                  <Calendar3 />
                </help-section>

                <!-- ==================================================================== -->
                <!-- ==================================================================== -->
                <help-section
                  :open="opened === 4"
                  title="🚤 Naviguer sur son emploi du temps"
                  sub-title="Accédez plus rapidement à la semaine ou à la date souhaitée"
                  @click.native="open(4)"
                >
                  <Calendar4 />
                </help-section>

                <!-- ==================================================================== -->
                <!-- ==================================================================== -->
                <help-section
                  :open="opened === 5"
                  title="🤔 Informations diverses"
                  sub-title="Autres informations utiles"
                  @click.native="open(5)"
                >
                  <Calendar5 />
                </help-section>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Calendar1 from '@/components/Help/Calendar/1-MainFeature.vue'
import Calendar2 from '@/components/Help/Calendar/2-OtherPeople.vue'
import Calendar3 from '@/components/Help/Calendar/3-Tasks.vue'
import Calendar4 from '@/components/Help/Calendar/4-Naviguation.vue'
import Calendar5 from '@/components/Help/Calendar/5-Others.vue'

export default {
  components: {
    Calendar1,
    Calendar2,
    Calendar3,
    Calendar4,
    Calendar5
  },
  data () {
    return {
      opened: 0
    }
  },
  methods: {
    open (nb) {
      // if user clicks on already opened pane, close it
      if (nb === this.opened) {
        this.opened = 0
        return
      }

      this.opened = nb
    }
  }
}
</script>
