import React, { useEffect, useState, useRef } from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import LoginComponent from "./components/LoginComponent";
import Main from "./components/MainComponent";
import { Verify } from "./redux/actions/LoginActions";
import { connect } from "react-redux";
import { baseURL } from './shared/constants';
import { saveState, loadState } from './shared/utils';
import LoadingSpinner from "./components/LoadingComponent";

const LoadingComponent = () => {
  const position ={
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  }
  return (
      <div style={position}>
        <LoadingSpinner text={"Ingresando ... "} />
      </div>
  )
}


const App = ({ user, verify, isValid }) => {
  const [loading, setLoading] = useState(false);

  // history.listen( ({ pathname }) => {
  //   if (pathname !== '/' || pathname !== '/login' || pathname !== '/login'){
  //     console.log("Listener")
  //     console.log(pathname)
  //     saveState({
  //       type: "url",
  //       payload: pathname,
  //     })
  //   }
  // })
  
  
  useEffect( () => {
    verify(setLoading)
  }, [verify])


  return (

      loading?  <LoadingComponent />
      :
      <Switch>
        <Route
          exact
          path="/login"
          render={(props) =>
            isValid ? <Redirect to="/" /> : <LoginComponent {...props} />
          }
        />
        <Route
          path="/"
          component={ () =>
            isValid ? <Main /> : <Redirect to="/login" />
          }
        />
      </Switch>
  );
};



const MapStateToProps = (gstate) => {
  return {
    user: gstate.login.user,
    isValid: gstate.login.isValid,
  };
};

const MapDispatchToProps = (dispatch) => {
  return {
    verify: (func) => dispatch(Verify(func)),
  };
};


export default connect(MapStateToProps, MapDispatchToProps)(App);
