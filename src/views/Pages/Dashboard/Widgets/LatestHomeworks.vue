<template>
  <card>
    <!-- card header -->
    <div
      slot="header"
      class="h3 mb-0">
      <div class="row align-items-center">
        <div class="col-8">
          <!-- Title -->
          <h5 class="h3 mb-0">
            Prochains devoirs
            <span
              class="small ml-1"
              style="color: #8898aa">(à venir)</span>
          </h5>
        </div>
        <div class="col-4 text-right">
          <router-link
            to="/homeworks"
            class="btn btn-sm btn-primary disabled">Détail</router-link>
        </div>
      </div>
    </div>
    <ul
      class="list-group list-group-flush"
      data-toggle="checklist">
      <li
        v-for="item in items"
        :key="item.title"
        class="list-group-item px-0"
      >
        <div
          :class="{'checklist-item-checked': item.done, [`checklist-item-${item.checkType}`]: item.checkType}"
          class="checklist-item">
          <div class="checklist-info">
            <h5 class="checklist-title mb-0">{{ item.title }}</h5>
            <small v-show="item.description">{{ item.description }}<br></small>
            <small style="color: #8898aa">
              <i class="fas fa-hourglass-half m-1"/>
              {{ capitalizeFirstLetter(dateToFullString(item.date)) }}</small>
          </div>
          <div>
            <base-checkbox
              v-model="item.done"
              :type="item.checkType"/>
          </div>
        </div>

      </li>
    </ul>
  </card>
</template>
<script>
import dateUtilMixin from '@/mixins/dateUtilMixin'
import stringUtilMixin from '@/mixins/stringUtilMixin'

export default {
  mixins: [dateUtilMixin, stringUtilMixin],
  data () {
    return {
      items: [
        {
          title: 'Maths',
          description: 'Exercices 31 et 32 page 169.',
          date: new Date().setDate(new Date().getDate() + 4),
          done: false,
          checkType: 'success'
        },
        {
          title: 'Droit',
          description: 'Rechercher définition "jurisprudence".',
          date: new Date().setDate(new Date().getDate() + 7),
          done: true,
          checkType: 'warning'
        },
        {
          title: 'Réseau',
          description: 'DS sur IPV4',
          date: new Date().setDate(new Date().getDate() + 13),
          done: false,
          checkType: 'danger'
        }
      ]
    }
  }
}
</script>
