<template class="container">
  <Header @addTodo="handleAddTodo" />
  <List :todos="todos" :updateTodoCompleted="updateTodoCompleted" />
  <Footer :count="todos.length" :getCompletedCount="getCompletedCount" :checkAll="checkAll" :isAllCompleted="isAllCompleted" />
</template>

<script lang="ts">
import List from "./components/List.vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

import { defineComponent, provide, reactive, ref, toRaw, toRefs, watch } from "vue";
export default defineComponent({
  name: "app",
  components: {
    Header,
    List,
    Footer,
  },
  setup() {
    const state = reactive({
      todos: [
        { id: 1, name: "学习", isCompleted: false },
        { id: 2, name: "上网", isCompleted: false },
        { id: 3, name: "打游戏", isCompleted: false },
      ],
    });
    // 添加 Todo
    function handleAddTodo(arg: string): void {
      state.todos.unshift({ id: Date.now(), name: arg, isCompleted: false });
    }
    // 更新 Todo 的完成状态
    function updateTodoCompleted(id: number, val: boolean) {
      console.log(toRaw(id),val)
      const updatedTodo = state.todos.find((item) => item.id === toRaw(id));
      if (updatedTodo) {
        updatedTodo.isCompleted = val;
      }
    }

    // 删除 Todo
    function deleteTodo(id: number): void {
      console.log("调用我啦");
      console.log(id);
      state.todos = state.todos.filter((item) => item.id !== id);
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
        if(isCheck){
          state.todos.forEach(item=>{
            item.isCompleted = true
          })
        }else{
          state.todos.forEach(item=>{
            item.isCompleted = false
          })
        }
    }

    const isAllCompleted = ref(false)
    // 观察 todo 是否全完成咯
    watch(state.todos,function(){
      if(state.todos.find(item=>item.isCompleted === false)){
        isAllCompleted.value = false
      }else{
        isAllCompleted.value = true
      }

    })

    return {
      ...toRefs(state),
      handleAddTodo,
      updateTodoCompleted,
      deleteTodo,
      getCompletedCount,
      checkAll,
      isAllCompleted
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
}
</style>