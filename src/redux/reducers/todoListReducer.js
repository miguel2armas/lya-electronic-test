import { ActionTypes } from "../constants/action-types";
//let todoList = localStorage.getItem('ToDoList')===null?[] : JSON.parse(localStorage.getItem('ToDoList'));


const intialState = [];
export const todoListReducer = (state = intialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.INIT_TODO_LIST:
            return payload;
        case ActionTypes.CREATE_TODO_LIST:
            return payload;
        case ActionTypes.COMPLETE_TODO_LIST:
            return payload;
        case ActionTypes.EDIT_TODO_LIST:
            return { ...state, todoList: payload };

        default:
            return state;
    }
};