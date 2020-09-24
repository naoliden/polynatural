import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createFormReducer } from './reducers/createFormReducer';
import { rootReducer } from './reducers/rootReducer';
import { clientsReducer } from './reducers/clientsReducer';
import { loginReducer } from './reducers/loginReducer';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

// redux-thunk allows ActionCreators to return a function that returns a function that returns an action. 
// sounds bad but action creators are given to dispatch() to throw actions. In this case, I can run a function in between dispatch
// and the function that returns the action. Useful when fetching data.
// This is helpful when there are things to do before dispatching actions.
// REVIEW Do I need thunk? if so, yarn add redux-thunk


export const ConfigureStore = () => {
  const store = createStore(
      combineReducers({
        root: rootReducer,
        form_data: createFormReducer,
        clients: clientsReducer,
        login: loginReducer,
      }), 
      // thunk needs to go first.
      applyMiddleware(thunk, logger)
  );

  return store;
}