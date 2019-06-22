<template>
  <table
    :class="tableClass"
    class="table tablesorter">
    <thead :class="theadClasses">
      <tr>
        <slot
          :columns="columns"
          name="columns">
          <th
            v-for="column in columns"
            :key="column">{{ column }}</th>
        </slot>
      </tr>
    </thead>
    <tbody :class="tbodyClasses">
      <tr
        v-for="(item, index) in data"
        :key="index">
        <slot
          :row="item"
          :index="index">
          <td
            v-for="(column, index) in columns"
            v-if="hasValue(item, column)"
            :key="index"
          >
            {{ itemValue(item, column) }}
          </td>
        </slot>
      </tr>
    </tbody>
  </table>
</template>
<script>
export default {
  name: 'BaseTable',
  props: {
    columns: {
      type: Array,
      default: () => [],
      description: 'Table columns'
    },
    data: {
      type: Array,
      default: () => [],
      description: 'Table data'
    },
    type: {
      type: String, // striped | hover
      default: '',
      description: 'Whether table is striped or hover type'
    },
    theadClasses: {
      type: String,
      default: '',
      description: '<thead> css classes'
    },
    tbodyClasses: {
      type: String,
      default: '',
      description: '<tbody> css classes'
    }
  },
  computed: {
    tableClass () {
      return this.type && `table-${this.type}`
    }
  },
  methods: {
    hasValue (item, column) {
      return item[column.toLowerCase()] !== 'undefined'
    },
    itemValue (item, column) {
      return item[column.toLowerCase()]
    }
  }
}
</script>
<style></style>
