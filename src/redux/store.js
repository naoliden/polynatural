import { createStore } from 'redux';
import { createTrialReducer, initialState } from './reducers/createTrialReducer';


export const ConfigureStore = () => {
  const store = createStore(
    createTrialReducer, // reducer
    initialState, // our initialState
  );
  return store;
}