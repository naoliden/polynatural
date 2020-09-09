import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createFormReducer } from './reducers/createFormReducer';
import { testReducer } from './reducers/testReducer';
import logger from 'redux-logger';



export const ConfigureStore = () => {
  const store = createStore(
      combineReducers({
          forms: createFormReducer,
          test: testReducer,
      }), 
      applyMiddleware(logger)
  );

  return store;
}