import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Switch, Route, Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import HeaderComponent from './HeaderComponent';
import Home from './HomeComponent';
import NewForm from './NewForm/CreateFormComponent';
import Dashboard from './Dashboard/DashboardComponent'
import ContactUs from './ContactComponent';
import PageNotFoundComponent from './404';
import AdminPanel from './AdminPanel/AdminPanelComponent';

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
}))


const Main = (props) => {
  const classes = useStyles();

  return (
      <div id="outer div" className={classes.root}>
        <HeaderComponent/>
        <Grid container id="container_principal" className={classes.container}>
          <Switch>
            {/* <Route render={}/> no ejecuta lifecycle methods, en cambio
                component={} re-renderea el componente */}
            <Route exact path="/" render={(props) => <Dashboard {...props} />} />
            <Route exact path="/search" render={(props) => <Home {...props} content=""/>}/>
            <Route exaxt path="/demo" component={ (props) => <div><h2>DEMO SELECCIONADA</h2></div>} />
            <Route exact path="/newform" render={ (props) => <NewForm {...props}/> } />
            <Route exact path="/admin" render={ (props) => <AdminPanel {...props}/> } />
            <Route exact path="/clients" component={ (props) => <div><h2>Agregar clientes y crear usuarios</h2></div> }/>
            <Route exact path="/contact" render={ (props) => <ContactUs {...props}/> }/>
            <Route exact path="/404" component={ (props) => <PageNotFoundComponent {...props}/> } />
            <Redirect to={{pathname: '/404', state: {from: props.location}}}/>
          </Switch>
        </Grid>
      </div>
  );
}

export default Main;
