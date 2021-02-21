import { Todo } from '../type/todo';

export default function () {
    function saveTodo(data: Todo[]) {
        const json = JSON.stringify(data)
        localStorage.setItem("todos",json)
    }

    function getTodo(): Todo[]{
        const json = localStorage.getItem("todos")
        if (json){
            return JSON.parse(json)
        }else{
            return []
        }
    }
    return {
        saveTodo,
        getTodo
    }
}