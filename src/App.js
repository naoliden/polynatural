import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import LoginComponent from "./components/LoginComponent";
import Main from "./components/MainComponent";
import { connect } from 'react-redux';


const App = ({ user }) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/login"
          render={(props) =>
            user? <Redirect to="/" /> :  <LoginComponent {...props} />
          }
        />
        <Route
          path="/"
          render={(props) =>
            user? <Main {...props} /> : <Redirect to="/login" />
          }
        />
      </Switch>
    </BrowserRouter>
  );
}

const MapStateToProps = gstate => {
  return {
    user: gstate.login.user
  }
}


export default connect(MapStateToProps)(App);
