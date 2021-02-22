<template>
  <li :class="['item-wrap',isFinished?'finished':'']">
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
  padding: 9px 5px;
  display: flex;
  justify-content: space-between;
  box-shadow: 1px 1px 1px rgb(54, 30, 0);
  margin: 10px 0;
  color: rgb(84, 175, 236);
  background: rgb(58, 24, 212);
  transition: all .5s;
}
.title{
    max-width: 200px;
    white-space: nowrap;
    overflow:hidden;
    text-overflow: ellipsis;
}
button{
    background: rgba(10, 155, 148, 0.445);
    color: rgb(20, 179, 126);
    box-shadow: none;
    border: none;
    margin-right: 5px;
}
.finished{
  background: rgb(18, 116, 146);
  padding: 3px;
}
.finished>button{
  color: rgb(4, 165, 165);
  background: rgba(25, 97, 190, 0.555);
}
</style>