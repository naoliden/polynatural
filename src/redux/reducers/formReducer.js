
import { SAVE_FORM } from '../actions/FormActions'

export const initialState = {
  form: {}
};


export const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_FORM:
      return {
        ...state,
        form: action.payload
      };
    default:
      return state
  }
}