import { createStore } from 'redux';
import { createFormReducer, initialState } from './reducers/createFormReducer';


export const ConfigureStore = () => {
  // TODO Add combine reducers
  const store = createStore(
    createFormReducer, // reducer
    initialState, // the initialState
  );
  return store;
}