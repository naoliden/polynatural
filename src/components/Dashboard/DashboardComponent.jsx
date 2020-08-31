import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TabsComponent from './DashboardTabsComponent';
// TODO Fetch de los datos y guardarlos en REDUX
// For using Tabs



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: '30vh',
  },
  fixedWidth: {
    width: '100vw',
  }
}))


const Dashboard = (props) => {
  const classes = useStyles();

  return (
    <Grid item container spacing={3}>
      <TabsComponent {...props}/>
    </Grid>
  );
}

export default Dashboard;