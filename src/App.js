import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import Login from './components/LoginComponent';
import Main from './components/MainComponent';
import { ConfigureStore } from './redux/store';


const store = ConfigureStore()
const default_path = "/home"

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route path={default_path} component={() => <Main/>}/>
          {/* TODO redirect to="/" with props of NOT logged in user, it should render form with errors */}
          {/* <Redirect to=""/> */}
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
