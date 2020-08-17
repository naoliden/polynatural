import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Switch, Route, Redirect } from 'react-router-dom';
import clsx from 'clsx';
import Dashboard from './DashboardComponent';
import Home from './HomeComponent'


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  appBarSpacer: theme.mixins.toolbar,
}))


const Main = (props) => {
  const classes = useStyles();

  return (
    // <div className="App">
      <div className={clsx(classes.root, classes.content)}>
        <Dashboard/>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Switch>
            <Route path="/home" component={() => <Home content={"Chao"}/>} />
            {/* <Redirect to={{pathname: '/', state: {from: props.location}}}/> */}
          </Switch>
        </main>
      </div>
  );
}

export default Main;
