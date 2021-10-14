import { ActionTypes } from "../constants/action-types";

const intialState = {
    idUser: 1,
    firstName: "",
    lastName: "",
    emailUser: ""
};
export const userReducer = (state = intialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.SET_USER:
            return { ...state, user: payload };
        default:
            return state;
    }
};