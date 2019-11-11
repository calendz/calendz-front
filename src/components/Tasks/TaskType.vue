<template>
  <el-tooltip
    :content="task.type === 'homework'
      ? 'Devoirs'
      : task.type === 'task'
        ? 'Tâche'
        : 'Contrôle'
    "
    placement="top">
    <i
      :class="task.type === 'homework'
        ? 'fa-book bg-primary'
        : task.type === 'task'
          ? 'fa-tasks bg-info'
          : 'fa-graduation-cap bg-warning'
      "
      class="fas avatar avatar-sm rounded-circle"/>
  </el-tooltip>
</template>

<script>
export default {
  name: 'TaskType',
  props: {
    task: {
      type: Object,
      default: _ => {},
      description: 'Task'
    }
  }
}
</script>

<style>

</style>
