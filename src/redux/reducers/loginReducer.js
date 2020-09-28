import { LOGIN, LOGOUT, VERIFY } from "../actions/LoginActions";
import { loadState } from "../../shared/utils";


const user = loadState("user");
export const initialState = {
  user: user,
  isValid: false,
};


export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      localStorage.setItem('user', action.payload);
      localStorage.setItem('token', action.payload.token);
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
      const res = {
        ...state,
        isValid: action.payload
      };
      console.log("INSIDE REDUCER LOGGIN VERIFIER")
      console.log(res)
      return res 
    default:
      return state;
  }
};
