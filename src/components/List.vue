<template>
<ol>
  <item :todo="item" :key="item.id" v-for='item in todos' :updateTodoCompleted='updateTodoCompleted' />
</ol>
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
    ol{
        padding: 10px;
        list-style: none;
        background:  rgb(38, 71, 218);
    }
</style>