import React from 'react';
import Grid from '@material-ui/core/Grid';
import TabsComponent from './DashboardTabsComponent';
// TODO Fetch de los datos y guardarlos en REDUX


const Dashboard = (props) => {

  return (
    <Grid item container spacing={3}>
      <TabsComponent {...props}/>
    </Grid>
  );
}

export default Dashboard;