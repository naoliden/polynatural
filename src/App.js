import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/LoginComponent';
import Main from './components/MainComponent';


function App() {

  return (
    // <div className="App">
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route exact path="/home" component={() => <Main/>}/>
      </Switch>
    </BrowserRouter>
    // </div>
  );
}

export default App;
