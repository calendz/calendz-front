<template>
  <card
    :show-footer-line="true"
    class="card-stats">
    <div class="row">

      <div class="col pr-0">
        <slot>
          <h5 class="card-title text-muted mb-1">
            PROCHAIN DEVOIR
          </h5>

          <div style="height: 36px !important">
            <span v-show="homeworksRetrieving">
              <placeholder class="w-100"/>
            </span>
            <p
              v-show="!homeworksRetrieving"
              class="h3 mb-0 my-auto h-100"
              style="line-height: 18px; overflow: hidden;">
              {{ nextHomework ? nextHomework.title : 'Aucun devoir à venir...' }}
            </p>
          </div>
        </slot>
      </div>

      <div class="col-auto">
        <slot name="icon">
          <router-link
            to="/tasks">
            <span v-show="homeworksRetrieving">
              <div class="icon icon-shape bg-primary text-white rounded-circle shadow">
                <i class="fas fa-question"/>
              </div>
            </span>

            <span v-show="!homeworksRetrieving">
              <div
                v-if="nextHomework"
                :class="nextHomework.type === 'homework' ? 'bg-primary' : nextHomework.type === 'task' ? 'bg-info' : 'bg-warning'"
                class="icon icon-shape text-white rounded-circle shadow">
                <i
                  :class="nextHomework.type === 'homework' ? 'fa-book' : nextHomework.type === 'task' ? 'fa-tasks' : 'fa-graduation-cap'"
                  class="fas"/>
              </div>

              <div
                v-if="!nextHomework"
                class="icon icon-shape bg-success text-white rounded-circle shadow">
                <i class="fas fa-check"/>
              </div>
            </span>
          </router-link>
        </slot>
      </div>
    </div>

    <p class="mt-1 mb-0 text-sm">
      <slot name="footer">
        <router-link
          to="/tasks"
          class="nav-link p-0">

          <!-- loading -->
          <span v-show="homeworksRetrieving">
            <div class="row">
              <div class="col-8 pb-1 pr-1">
                <placeholder class="w-100"/>
              </div>
              <div class="col-4 pl-1 text-right">
                <placeholder class="w-100"/>
              </div>
            </div>
          </span>

          <!-- not loading -->
          <span v-show="!homeworksRetrieving">
            <!-- homework -->
            <div
              v-if="nextHomework"
              class="row">
              <span
                :class="remainingDays > 7 ? 'text-success' : remainingDays > 2 ? 'text-warning' : 'text-danger'"
                class="mr-1 ml-3">
                <i class="fas fa-clock"/>
                Pour :
              </span>
              <span>{{ dateToFullString(getDate) }}</span>
            </div>
            <!-- no homework -->
            <span v-if="!nextHomework">
              <i class="fas fa-external-link-alt mr-1"/>
              cliquez pour accéder aux détails
            </span>
          </span>

        </router-link>
      </slot>
    </p>
  </card>

</template>

<script>
import { mapGetters } from 'vuex'
import dateUtilMixin from '@/mixins/dateUtilMixin'

export default {
  mixins: [dateUtilMixin],
  computed: {
    remainingDays: function () {
      const today = new Date()
      return Math.round((this.nextHomework.date - today) / (1000 * 60 * 60 * 24))
    },
    getDate: function () {
      return new Date().setTime(this.nextHomework.date)
    },
    ...mapGetters({
      nextHomework: 'tasks/getNextOneNotDone',
      homeworksRetrieving: 'account/isFetching'
    })
  }
}
</script>
