<template>
    <div>
        <input type="checkbox" v-model="isCheckAll">
        已完成： {{ completedCount }} / {{ count }}
    </div>
</template>

<script>
import {computed, defineComponent} from 'vue'
export default defineComponent({
    props:{
        count:{
            type: Number,
            required: true
        },
        getCompletedCount: {
            type: Function,
            required: true
        },
        checkAll:{
            type: Function,
            required: true
        },
        isAllCompleted:{
            type: Boolean,
            required: true
        }
    },
    setup(props){
        const completedCount = computed(()=>{
             return props.getCompletedCount()
        })
        // 是否全选中
        const isCheckAll = computed({
            get(){
                return props.isAllCompleted
            },
            set(val){
                props.checkAll(val)
            }
        })

        return {
            completedCount,
            isCheckAll
        }
    }
})
</script>

<style scoped>

</style>