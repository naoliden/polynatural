import { createStore } from 'redux';
import { createTrialReducer, initialState } from './reducers/createTrialReducer';


export const ConfigureStore = () => {
  // TODO Add combine reducers
  const store = createStore(
    createTrialReducer, // reducer
    initialState, // the initialState
  );
  return store;
}