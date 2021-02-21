<template>
  <div>
    <h1>TodoList</h1>
    <input type="text" @keydown.enter="handleInput" ref="input" />
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  setup(props, { emit }) {
    function handleInput() {
      // console.log(this.$refs.input)
      if (!this.$refs.input.value) return;
      emit("addTodo", this.$refs.input.value);
      this.$refs.input.value = "";
    }
    return {
      handleInput,
    };
  },
});
</script>

<style scoped>
input {
  width: 67%;
  margin: auto;
  background: rgb(44, 98, 214);
  color: white;
  border: none;
  padding: 10px;
  transition: all 0.8s;
}
input:focus {
  border: none;
  outline: none;
  width: 80%;
}

div {
  background: rgb(38, 71, 218);
  margin: 0;
  padding: 10px;
}
</style>