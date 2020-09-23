import React, { useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import LoginComponent from "./components/LoginComponent";
import Main from "./components/MainComponent";
import { ConfigureStore } from "./redux/store";

const store = ConfigureStore();

function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/login"
            render={(props) =>
              isAuthenticated ? <Redirect to="/" /> :  <LoginComponent {...props} />
            }
          />
          <Route
            path="/"
            render={(props) =>
              isAuthenticated ? <Main {...props} /> : <Redirect to="/login" />
            }
          />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
