import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import LoginComponent from "./components/LoginComponent";
import Main from "./components/MainComponent";
import { Verify } from "./redux/actions/LoginActions";
import { connect } from "react-redux";
import { baseURL } from './shared/constants';


const App = ({ user, verify, isValid }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  // const useComponentDidMount = func => useEffect(func, []);

  const checkAuthenticated = async () => {
    try {
      const res = await fetch(baseURL + "/auth/verify", {
        method: "GET",
        headers: { token: localStorage.token }
      });

      const parseRes = await res.json();
      parseRes.isValid === true ? setIsAuthenticated(true) : setIsAuthenticated(false);

    } catch (err) {
      console.error(err.message);
    }
  };

  // useComponentDidMount( () => {
  //   console.log('This runs only once before rendering the component.');
  //   // console.log(isValid);
  //   checkAuthenticated();
  // });

  useEffect( () => {
    console.log("APP USEEFFECT");
    console.log(location.pathname);
    // checkAuthenticated();
  }, [])

  
  return (
    
      <Switch>
        <Route
          exact
          path="/login"
          render={(props) =>
            isAuthenticated ? <Redirect to="/" /> : <LoginComponent {...props} setAuth={setIsAuthenticated}/>
          }
        />
        <Route
          path="/"
          component={ () =>
            isAuthenticated ? <Main /> : <Redirect to="/login" />
          }
        />
      </Switch>
  );
};


const MapStateToProps = (gstate) => {
  return {
    user: gstate.login.user,
    isValid: gstate.login.isValid
  };
};

const MapDispatchToProps = (dispatch) => {
  return {
    verify: () => dispatch(Verify()),
  };
};


export default connect(MapStateToProps, MapDispatchToProps)(App);
