import { LOGIN, LOGOUT, VERIFY } from "../actions/LoginActions";
import { loadState, saveState } from "../../shared/utils";


const user = loadState("user");
export const initialState = {
  user: user,
  isValid: false,
};


export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      saveState({
        type: 'user',
        payload: action.payload,
      })
      saveState({
        type: 'token',
        payload: action.payload.token,
      })
      return {
        ...state,
        user: action.payload,
        isValid: true,
      };
    case LOGOUT:
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      return {
        ...state,
        user: null,
        isValid: false,
      };
    case VERIFY:
      return {
        ...state,
        isValid: action.payload
      };
    default:
      return state;
  }
};
