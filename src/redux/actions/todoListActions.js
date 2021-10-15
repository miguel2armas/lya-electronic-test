import { ActionTypes } from "../constants/action-types";

export const createTodoData = (todoList) => {
    return {
        type: ActionTypes.CREATE_TODO_LIST,
        payload: todoList,
    };
};
export const setCompleteTodoData = (todoList) => {
    return {
        type: ActionTypes.COMPLETE_TODO_LIST,
        payload: todoList,
    };
};
export const initTodoData = (todoList) => {
    return {
        type: ActionTypes.INIT_TODO_LIST,
        payload: todoList,
    };
};