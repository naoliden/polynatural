import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Sustainability from './SustainabilityComponent';
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
      <TabsComponent 
        component_list={[
          <Sustainability n={10}/>, 
          <Sustainability n={3}/>, 
          <Sustainability n={1}/>, 
          ]}
        tabInfo={{
          tab_0: {
            label: "Sustainability",
          },
          tab_1: {
            label: "Commercial info",
          },
          tab_2: {
            label: "Trial data"
          }
        }}
        />
    </Grid>
  );
}

export default Dashboard;