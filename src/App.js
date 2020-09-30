import React, { useEffect, useState, useRef } from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import LoginComponent from "./components/LoginComponent";
import Main from "./components/MainComponent";
import { Verify } from "./redux/actions/LoginActions";
import { connect } from "react-redux";
import { baseURL } from './shared/constants';
import LoadingSpinner from "./components/LoadingComponent";
import { saveState } from './shared/utils';

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
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(false);
  // const history = useHistory();

  // history.listen( ({ pathname }) => {
  //   if (pathname !== "/" || pathname !== "/login"){
  //     saveState({
  //       type: "url",
  //       payload: pathname,
  //     })
  //   }
  // })
  
  const checkAuthenticated = async () => {
    try {
      setLoading(true);
      const res = await fetch(baseURL + "/auth/verify", {
        method: "GET",
        headers: { token: localStorage.token }
      });
      
      const parseRes = await res.json();
      parseRes.isValid === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    
      setLoading(false);

      return parseRes.isValid


    } catch (err) {
      console.error(err.message);
    }
  };
  

  
  useEffect( () => {
    console.log("APP USEEFFECT");
    checkAuthenticated();
  }, [])

  
  return (

      loading?  <LoadingComponent />
      :
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
    isValid: gstate.login.isValid,
  };
};

const MapDispatchToProps = (dispatch) => {
  return {
    verify: () => dispatch(Verify()),
  };
};


export default connect(MapStateToProps, MapDispatchToProps)(App);
