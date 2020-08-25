import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";



const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500
  },
  container: {
    paddingTop: 50
  }
}));



function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={9}>
          {children}
        </Box>
      )}
    </div>
  );
}

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.any.isRequired,
//   value: PropTypes.any.isRequired
// };


export default function TabsComponent(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const { component_list } = props;
  const tab_headers = []
  const tabs_content = []
  

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const tabProps = (index) => {
    // Retorna las props al crear las Tabs
    return {
      id: `tab-${index}`,
      "aria-controls": `tabpanel-${index}`
    };
  }
  
  const loadTabs = () => {
    // Retorna la informacion de cada Tab
    const tabs_number = Object.keys(props.tabInfo).length;
    for(var i = 0; i < tabs_number; i++){
      tabs_content.push(
      <Tab label={props.tabInfo[`tab_${i}`].label} {...tabProps(i)} />
      )
    }

  }

  const tabContent = () => {
    // Retorna el contenido que estará bajo cada Tab
    for(var i = 0; i < component_list.length; i++){
      tab_headers.push(
        <TabPanel value={value} index={0} dir={theme.direction}>
          <div className={classes.container}>
            {component_list[i]}
          </div>
        </TabPanel>
      )
    }
  }


  loadTabs();
  tabContent();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="Dashboard tabs"
        >
          {tab_headers}
          {/* <Tab label={tabInfo.tabOne.label} {...tabProps(0)} />
          <Tab label={tabInfo.tabTwo.label} {...tabProps(1)} />
          <Tab label={tabInfo.tabThree.label} {...tabProps(2)} /> */}

        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        {tabs_content}

        {/* <TabPanel value={value} index={0} dir={theme.direction}>
          <div className={classes.container}>Item One</div>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <div className={classes.container}>Item Two</div>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <div className={classes.container}>Item Three</div>
        </TabPanel> */}

      </SwipeableViews>
    </div>
  );
}
