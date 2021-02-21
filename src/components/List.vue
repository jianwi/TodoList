<template>
  <item :todo="item" :key="item.id" v-for='item in todos' :updateTodoCompleted='updateTodoCompleted' />
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import Item from './Item.vue';
export default defineComponent({
    components: {
        Item
    }
    ,
    props:{
        todos: {
            type: Array,
            required: true
        },
        updateTodoCompleted:{
            type: Function,
            required: true,
        }
    },
})
</script>

<style>

</style>