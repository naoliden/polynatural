import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Switch, Route, Redirect } from 'react-router-dom';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import HeaderComponent from './HeaderComponent';
import Home from './HomeComponent';
import NewForm from './NewFormComponent';
import Dashboard from './Dashboard/DashboardComponent'

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    // paddingTop: theme.spacing(6),
    // paddingBottom: theme.spacing(10),
    // paddingBottom: 30,
    // paddingTop: 30,
    // marginTop: '5px',
    paddingLeft: 30,
    paddingRight:30,
    marginTop: 25,
    marginBottom: 30,
    [theme.breakpoints.down("sm")]: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(3),
      
    }
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: '95vh',
  },
}))


const Main = (props) => {
  const classes = useStyles();

  // useEffect(() => {
  //   effect
  // }, [input])

  return (
      <div className={clsx(classes.root, classes.content)}>
        <HeaderComponent/>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Grid container id="container_principal" className={classes.container}>
            {/* TODO add loading span component while /home is rendered and what's on the <Switch>  is loading */}
            <Switch>
              <Route path="/home" component={() => <Dashboard/>} />
              <Route exact path="/home/search" component={() => <Home content={"Acá quiero hacer una búsqueda avanzada"}/>} />
              <Route exact path="/home/newform" component={NewForm} />
              <Redirect to={{pathname: '/home/newform', state: {from: props.location}}}/>
            </Switch>
          </Grid>
        </main>
      </div>
  );
}

export default Main;
