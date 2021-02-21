<template>
  <div>
      <input type="text" @keydown.enter="handleInput" ref="input">
  </div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent ({
    setup(props,{emit}){
        function handleInput(){
            // console.log(this.$refs.input)
            if(!this.$refs.input.value) return 
            emit("addTodo",this.$refs.input.value)
            this.$refs.input.value = ""
        }
        return {
            handleInput
        }
    }
});
</script>

<style scoped>
input{
    width: 99%;
    margin: auto;
}
</style>