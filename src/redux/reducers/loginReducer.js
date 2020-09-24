import { LOGIN, LOGOUT } from "../actions/LoginActions";


export const initialState = {
  error: null,
  user: null,
};


export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};
