<template>
  <li class="item-wrap">
    <div class="title" >
      <input type="checkbox" v-model="isFinished" :id="'todo-'+id" />
      <label :for="'todo-'+id"> {{ todo.name }} </label>
    </div>

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
      id
    };
  },
});
</script>

<style scope>
.item-wrap {
  padding: 5px 0;
  display: flex;
  justify-content: space-between;
  box-shadow: 1px 1px 1px rgb(54, 30, 0);
  margin: 10px 0;
  color: rgb(84, 175, 236);
}
.title{
    max-width: 200px;
    white-space: nowrap;
    overflow:hidden;
    text-overflow: ellipsis;
}
button{
    background: rgba(223, 14, 14, 0.445);
    color: rgb(204, 238, 11);
    box-shadow: none;
    border: none;
    margin-right: 5px;
}

</style>