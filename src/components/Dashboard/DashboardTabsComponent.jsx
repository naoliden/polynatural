import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid'
import Sustainability from './SustainabilityComponent';
// import classes from '*.module.css';
// import Commercial from './CommercialComponent';
// import Trials from './TrialsComponent';

// TODO component rerenders when switching BACK from other tabs. Too many rerenders.


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Grid item container spacing={3}>
          { children }
        </Grid>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function tabProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}



const TabsComponent = (props) => {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="dashboard tabs"
          // scrollButtons="auto"
          centered
        >
          <Tab label="Sustainability" {...tabProps(0)} />
          <Tab label="Commercial info" {...tabProps(1)} />
          <Tab label="Technical Statistics" {...tabProps(2)} />
        </Tabs>
      </AppBar>
{/* TODO add transition effects */}
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Sustainability n={3}/>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          Commercial info
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          Technical Statistics
        </TabPanel>
    </>
  );
}


export default TabsComponent;