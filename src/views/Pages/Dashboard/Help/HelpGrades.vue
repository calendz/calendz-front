<template>
  <div>

    <!-- ==================================================================== -->
    <!-- ==================================================================== -->
    <help-section
      :open="opened === 1"
      title="📑 Comprendre la gestion des notes"
      @select="open(1)"
    >
      <Grades1 />
    </help-section>

    <!-- ==================================================================== -->
    <!-- ==================================================================== -->
    <help-section
      :open="opened === 2"
      title="🆕 Ajouter une note"
      @select="open(2)"
    >
      <Grades2 />
    </help-section>

    <!-- ==================================================================== -->
    <!-- ==================================================================== -->
    <help-section
      :open="opened === 3"
      title="🖊️ Gérer ses notes (modification, suppression etc.)"
      @select="open(3)"
    >
      <Grades3 />
    </help-section>

    <!-- ==================================================================== -->
    <!-- ==================================================================== -->
    <help-section
      :open="opened === 4"
      title="⚙️ Autres"
      @select="open(4)"
    >
      <Grades4 />
    </help-section>

  </div>
</template>

<script>
import Grades1 from '@/components/Help/Grades/1-Main.vue'
import Grades2 from '@/components/Help/Grades/2-Add.vue'
import Grades3 from '@/components/Help/Grades/3-Manage.vue'
import Grades4 from '@/components/Help/Grades/4-Others.vue'

export default {
  components: {
    Grades1,
    Grades2,
    Grades3,
    Grades4
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
