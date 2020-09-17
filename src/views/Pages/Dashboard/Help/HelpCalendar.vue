<template>
  <div>
    <!-- ==================================================================== -->
    <!-- ==================================================================== -->
    <help-section
      :open="opened === 1"
      title="📆 Fonctionnement de l'emploi du temps"
      @click.native="open(1)"
    >
      <Calendar1 />
    </help-section>

    <!-- ==================================================================== -->
    <!-- ==================================================================== -->
    <help-section
      :open="opened === 2"
      title="📑 Gérer ses devoirs depuis l'emploi du temps"
      @click.native="open(2)"
    >
      <Calendar2 />
    </help-section>

    <!-- ==================================================================== -->
    <!-- ==================================================================== -->
    <!-- ==================================================================== -->
    <!-- ==================================================================== -->
    <help-section
      :open="opened === 3"
      title="👤 Voir l'emploi du temps d'un autre utilisateur"
      @click.native="open(3)"
    >
      <Calendar3 />
    </help-section>

    <!-- ==================================================================== -->
    <!-- ==================================================================== -->
    <help-section
      :open="opened === 4"
      title="🤔 Astuces et raccourcis"
      class="mb-5"
      @click.native="open(4)"
    >
      <Calendar4 />
    </help-section>
  </div>
</template>

<script>
import Calendar1 from '@/components/Help/Calendar/1-Main.vue'
import Calendar2 from '@/components/Help/Calendar/2-Tasks.vue'
import Calendar3 from '@/components/Help/Calendar/3-OtherPeople.vue'
import Calendar4 from '@/components/Help/Calendar/4-Others.vue'

export default {
  components: {
    Calendar1,
    Calendar2,
    Calendar3,
    Calendar4
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
