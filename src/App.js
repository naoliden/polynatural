import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import clsx from 'clsx';
import Login from './components/LoginComponent';
import Dashboard from './components/DashboardComponent';
import Home from './components/HomeComponent';
import Main from './components/MainComponent';
// import './App.css';

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


function App() {
  const classes = useStyles();

  return (
    // <div className="App">
    <BrowserRouter>
      <Main/>
    </BrowserRouter>
  );
}

export default App;
