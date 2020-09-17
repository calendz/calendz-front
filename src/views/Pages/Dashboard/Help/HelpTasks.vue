<template>
  <div>

    <!-- ==================================================================== -->
    <!-- ==================================================================== -->
    <help-section
      :open="opened === 1"
      title="📑 Comprendre la gestion des tâches et des devoirs"
      @click.native="open(1)"
    >
      <Tasks1 />
    </help-section>

    <!-- ==================================================================== -->
    <!-- ==================================================================== -->
    <help-section
      :open="opened === 2"
      title="🆕 Ajouter une tâche/devoir"
      @click.native="open(2)"
    >
      <Tasks2 />
    </help-section>

    <!-- ==================================================================== -->
    <!-- ==================================================================== -->
    <help-section
      :open="opened === 3"
      title="🖊️ Gérer ses devoirs (modification, suppression etc.)"
      @click.native="open(3)"
    >
      <Tasks3 />
    </help-section>

    <!-- ==================================================================== -->
    <!-- ==================================================================== -->
    <help-section
      :open="opened === 4"
      title="⚙️ Autres"
      @click.native="open(4)"
    >
      <Tasks4 />
    </help-section>

  </div>
</template>

<script>
import Tasks1 from '@/components/Help/Tasks/1-Main.vue'
import Tasks2 from '@/components/Help/Tasks/2-Add.vue'
import Tasks3 from '@/components/Help/Tasks/3-Manage.vue'
import Tasks4 from '@/components/Help/Tasks/4-Others.vue'

export default {
  components: {
    Tasks1,
    Tasks2,
    Tasks3,
    Tasks4
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
