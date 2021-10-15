import axios from "axios";
import {initTodoData} from "./actions/todoListActions";


export const dataToDoAPI = async (dispatch) =>{
    const res = await axios.get('https://lya-electronic-test.herokuapp.com/api/ToDo');
    dispatch(initTodoData(res.data));
}
export const createToDoAPI = async (dispatch, data) =>{
    await axios.post('https://lya-electronic-test.herokuapp.com/api/ToDo', data);
    await dataToDoAPI(dispatch);
}

export const editToDoAPI = async (dispatch, data) =>{
    data = {...data, complete: !data.complete}
    await axios.put('https://lya-electronic-test.herokuapp.com/api/ToDo/'+data._id, data);
    await dataToDoAPI(dispatch);
}
export const deleteToDoAPI = async (dispatch, data) =>{
    await axios.delete('https://lya-electronic-test.herokuapp.com/api/ToDo/'+data._id);
    await dataToDoAPI(dispatch);
}