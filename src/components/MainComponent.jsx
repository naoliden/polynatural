import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Switch, Route, Redirect } from 'react-router-dom';
import clsx from 'clsx';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Dashboard from './DashboardComponent';
import Home from './HomeComponent'
import NewForm from './NewFormComponent'


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
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(10),
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
    height: '100vh',
  },
}))


const Main = (props) => {
  const classes = useStyles();

  return (
      <div className={clsx(classes.root, classes.content)}>
        <Dashboard/>
        {/* FIX Acortar todo estos Grid - Container, etc hasta el proximo fix tag */}
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container className={classes.container}>
            <Grid container spacing={0}>
              {/* FIX */}
              <Grid item xs={12}>              
                <Paper className={clsx(classes.paper, classes.fixedHeight)}>
                  <Switch>
                    <Route exact path="/home/dashboard" component={() => <Home content={"Acá van los gráficos, etc"}/>} />
                    <Route exact path="/home/search" component={() => <Home content={"Acá quiero hacer una búsqueda avanzada"}/>} />
                    <Route exact path="/home/newform" component={NewForm} />
                    <Redirect to={{pathname: '/home/dashboard', state: {from: props.location}}}/>
                  </Switch>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </main>
      </div>
  );
}

export default Main;
