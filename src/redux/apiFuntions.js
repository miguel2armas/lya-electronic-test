import axios from "axios";
import {initTodoData} from "./actions/todoListActions";


export const dataToDoAPI = async (dispatch) =>{
    const res = await axios.get('https://lya-electronic-test.herokuapp.com/api/ToDo');
    res.data.reverse();
    dispatch(initTodoData(res.data));
}
export const createToDoAPI = async (dispatch, data) =>{
    await axios.post('https://lya-electronic-test.herokuapp.com/api/ToDo', data);
    await dataToDoAPI(dispatch);
}

export const editToDoAPI = async (dispatch, data) =>{
    await axios.put('https://lya-electronic-test.herokuapp.com/api/ToDo/'+data._id, data);
    await dataToDoAPI(dispatch);
}
export const deleteToDoAPI = async (dispatch, data) =>{
    await axios.delete('https://lya-electronic-test.herokuapp.com/api/ToDo/'+data._id);
    await dataToDoAPI(dispatch);
}
export const getGatFact = async () =>{
   const res = await axios.get('https://catfact.ninja/facts');
   return res.data;
}