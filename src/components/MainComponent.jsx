import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Switch, Route, Redirect } from 'react-router-dom';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import HeaderComponent from './HeaderComponent';
import Home from './HomeComponent';
import NewForm from './NewForm/CreateTrialComponent';
import Dashboard from './Dashboard/DashboardComponent'

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
  root: {
    display: 'flex',
    overflow: 'hidden',
    flexGrow: 1,
  },
  container: {
    paddingLeft: 30,
    paddingRight:30,
    marginTop: 100,
    marginBottom: 30,
    [theme.breakpoints.down("sm")]: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(3),
    }
  },
  fixedHeight: {
    height: '95vh',
  },
}))


const Main = (props) => {
  const classes = useStyles();

  return (
      <div id="outer div" className={classes.root}>
        <HeaderComponent/>
          <Grid container id="container_principal" className={classes.container}>
            {/* TODO add loading span component while /home is rendered and what's on the <Switch>  is loading */}
            <Switch>
              <Route exact path="/home/dashboard" component={() => <Dashboard/>} />
              <Route exact path="/home/search" component={() => <Home content={"Acá quiero hacer una búsqueda avanzada"}/>} />
              <Route exact path="/home/newform" component={NewForm} />
              {/* TODO change redirect to dashboard */}
              <Redirect to={{pathname: '/home/newform', state: {from: props.location}}}/>
            </Switch>
          </Grid>
      </div>
  );
}

export default Main;
