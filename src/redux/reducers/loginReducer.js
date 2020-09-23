import {
  FETCH_LOGIN_BEGIN,
  FETCH_LOGIN_SUCCESS,
  FETCH_LOGIN_FAILURE,
} from "../actions/LoginActions";

export const initialState = {
  loading: false,
  error: null,
  user: { user_id: 0, firstname: "LOADING..." },
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LOGIN_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_LOGIN_SUCCESS:
        return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case FETCH_LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        user: {},
      };
    default:
      return state;
  }
};
