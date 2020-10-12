<template>
  <div>

    <!-- ==================================================================== -->
    <!-- ==================================================================== -->
    <help-section
      :open="opened === 1"
      title="📱 Installer Calendz sur iOS/Android"
      @select="open(1)"
    >
      <Others1 />
    </help-section>

    <!-- ==================================================================== -->
    <!-- ==================================================================== -->
    <help-section
      :open="opened === 2"
      title="📆 Exporter l'emploi du temps (Google Calendar)"
      @select="open(2)"
    >
      <Others2 />
    </help-section>

    <!-- ==================================================================== -->
    <!-- ==================================================================== -->
    <help-section
      :open="opened === 3"
      title="⚙️ Les paramètres"
      @select="open(3)"
    >
      <Others3 />
    </help-section>
  </div>
</template>

<script>
import Others1 from '@/components/Help/Others/1-PWA.vue'
import Others2 from '@/components/Help/Others/2-Export.vue'
import Others3 from '@/components/Help/Others/3-Settings.vue'

export default {
  components: {
    Others1,
    Others2,
    Others3
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
