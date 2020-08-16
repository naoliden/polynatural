import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/LoginComponent';
import Dashboard from './components/DashboardComponent';
// import './App.css';

function App() {
  return (
    <div className="App">
      {/* <BrowserRouter> */}
        {/* <Switch> */}
          {/* <Route path="/" component={Login} /> */}
          {/* <Route exact path="/" component={Dashboard} /> */}
          {/* <Redirect to="/home" /> */}
        {/* </Switch> */}
      {/* </BrowserRouter> */}
      <Dashboard/>
    </div>
  );
}

export default App;
