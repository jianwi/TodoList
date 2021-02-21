<template>
  <li class="item-wrap">
    <input type="checkbox" v-model="isFinished" />
    {{ todo.name }}
    <button @click="handleDelete">删除</button>
  </li>
</template>

<script lang="ts">
import { computed, defineComponent, inject, toRefs } from "vue";
export default defineComponent({
  props: {
    todo: {
      type: Object,
      required: true,
    },
    updateTodoCompleted: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const { isCompleted, id } = toRefs(props.todo);
    const isFinished = computed({
      get() {
        return isCompleted.value;
      },
      set(val) {
        props.updateTodoCompleted(id.value, val);
      },
    });
    const fn: ((id: number) => void) | undefined = inject("deleteTodo");

    function handleDelete() {
      fn && fn(id.value);
    }

    return {
      isFinished,
      handleDelete,
    };
  },
});
</script>

<style scope>
</style>