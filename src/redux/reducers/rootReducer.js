
import { RELOAD } from '../actions/RootActions'

export const initialState = {
  shouldLoad: 1
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case RELOAD:
      return {
        ...state,
        shouldLoad: action.payload
      };
    default:
      return state
  }
}