import { combineReducers } from "redux";
import {userReducer} from "./userReducer";
import {todoListReducer} from "./todoListReducer";

const reducers = combineReducers({
    user: userReducer,
    todoList: todoListReducer
});
export default reducers;