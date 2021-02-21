<template class="container">
  <Header @addTodo="handleAddTodo" />
  <List :todos="todos" :updateTodoCompleted="updateTodoCompleted" />
  <Footer
    :count="todos.length"
    :getCompletedCount="getCompletedCount"
    :checkAll="checkAll"
    :isAllCompleted="isAllCompleted"
  />
</template>

<script lang="ts">
import List from "./components/List.vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

import { Todo } from "./type/todo";
import {
  defineComponent,
  onMounted,
  onUnmounted,
  provide,
  reactive,
  ref,
  toRaw,
  toRefs,
  watch,
} from "vue";
import saveUtils from "./utils/storage";
export default defineComponent({
  name: "app",
  components: {
    Header,
    List,
    Footer,
  },
  setup() {
    const state = reactive<{ todos: Todo[] }>({
      todos: [],
    });
    const { getTodo, saveTodo } = saveUtils();
    // 初始化
    onMounted(() => {
      state.todos.push(...getTodo());
    });

    // 添加 Todo
    function handleAddTodo(arg: string): void {
      state.todos.unshift({ id: Date.now(), name: arg, isCompleted: false });
    }
    // 更新 Todo 的完成状态
    function updateTodoCompleted(id: number, val: boolean) {
      const updatedTodo = state.todos.find((item) => item.id === toRaw(id));
      if (updatedTodo) {
        updatedTodo.isCompleted = val;
      }
    }

    // 删除 Todo
    function deleteTodo(id: number): void {
      state.todos.forEach((item, index) => {
        if (item.id === id) {
          state.todos.splice(index, 1);
        }
      });
    }
    provide("deleteTodo", deleteTodo);

    // 已完成的数量
    function getCompletedCount(): number {
      return state.todos.reduce((pre, cur) => {
        return pre + Number(cur.isCompleted);
      }, 0);
    }
    // checkAll
    function checkAll(isCheck: boolean) {
      if (isCheck) {
        state.todos.forEach((item) => {
          item.isCompleted = true;
        });
      } else {
        state.todos.forEach((item) => {
          item.isCompleted = false;
        });
      }
    }

    const isAllCompleted = ref(false);
    // 观察 todo
    watch(state.todos, function () {
      // console.log("todo观察");
      if (state.todos.find((item) => item.isCompleted === false)) {
        isAllCompleted.value = false;
      } else {
        isAllCompleted.value = true;
      }
      saveTodo(state.todos);
    });

    return {
      ...toRefs(state),
      handleAddTodo,
      updateTodoCompleted,
      deleteTodo,
      getCompletedCount,
      checkAll,
      isAllCompleted,
    };
  },
});
</script>

<style>
#app {
  width: 100%;
  max-width: 400px;
  min-width: 200px;
  height: 100vh;
  margin: auto;
  background: rgb(10, 115, 185);
  margin: 0;
  padding: 0;
}
body{
  margin: 0;
}
</style>