import { ActionTypes } from "../constants/action-types";

let todoList = localStorage.getItem('ToDoList')===null?[] : JSON.parse(localStorage.getItem('ToDoList'));
const intialState = todoList;
export const todoListReducer = (state = intialState, { type, payload }) => {
    let todoList = [];
    switch (type) {
        case ActionTypes.CREATE_TODO_LIST:
            if(localStorage.getItem('ToDoList')===null){
                todoList = [];
                payload = {...payload, id: 1};
                todoList.push(payload);
                localStorage.setItem('ToDoList', JSON.stringify(todoList));
            }else{
                todoList = JSON.parse(localStorage.getItem('ToDoList'));
                payload = {...payload, id: todoList[todoList.length-1].id+1};
                todoList.push(payload);
                localStorage.setItem('ToDoList', JSON.stringify(todoList));
            }
            return todoList;
        case ActionTypes.COMPLETE_TODO_LIST:
            todoList = [];
            todoList = JSON.parse(localStorage.getItem('ToDoList'));
            todoList.map(todo=>{
            if(todo.id===payload){
                todo.complete = !todo.complete;
                }
            })
            localStorage.setItem('ToDoList', JSON.stringify(todoList));
            return todoList;
        case ActionTypes.EDIT_TODO_LIST:
            return { ...state, todoList: payload };

        default:
            return state;
    }
};