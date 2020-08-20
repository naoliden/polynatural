import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Switch, Route, Redirect } from 'react-router-dom';
import clsx from 'clsx';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import HeaderComponent from './HeaderComponent';
import Home from './HomeComponent';
import NewForm from './NewFormComponent';
import LineGraph from './charts/LineChartComponent';




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
        <HeaderComponent/>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container className={classes.container}>
        {/* FIX Pasar los Grid y Paper de abajo a cada componente individualmente, no que se rendereen sobre estos de aca */}
              <Grid item xs={12}>              
                <Paper className={clsx(classes.paper, classes.fixedHeight)}>
                  <Switch>
                    <Route exact path="/home/dashboard" component={() => <Home content={<LineGraph/>}/>} />
                    <Route exact path="/home/search" component={() => <Home content={"Acá quiero hacer una búsqueda avanzada"}/>} />
                    <Route exact path="/home/newform" component={NewForm} />
                    <Redirect to={{pathname: '/home/dashboard', state: {from: props.location}}}/>
                  </Switch>
                </Paper>
              </Grid>
          </Container>
        </main>
      </div>
  );
}

export default Main;
