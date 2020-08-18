import React from 'react';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import EmailIcon from '@material-ui/icons/Email';
import InsertChartIcon from '@material-ui/icons/InsertChart';
import PageviewIcon from '@material-ui/icons/Pageview';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';

// style={{ color: 'inherit', textDecoration: 'inherit'}}
const link_style={ color: 'inherit', textDecoration: 'inherit'}

export const MainListItems = () => {
  const [selected, setSelected] = React.useState(false);
  
  return (
    <List>
      <ListSubheader inset>Dashboard</ListSubheader>
      <Link to="/home/dashboard" style={link_style}>
        <ListItem button >
          <ListItemIcon><DashboardIcon/></ListItemIcon>
          <ListItemText primary="Dashboard"/>
        </ListItem>
      </Link>
      <Link to="/home/newform" style={link_style}>
        <ListItem button>
          <ListItemIcon>
            <InsertChartIcon/></ListItemIcon><ListItemText primary="Nueva prueba" />
        </ListItem>
      </Link>
      <Link to="/home/search" style={link_style}>
        <ListItem button>
          <ListItemIcon><PageviewIcon/></ListItemIcon>
          <ListItemText primary="Buscar prueba" />
        </ListItem>
      </Link>
    </List>
  )
};

export const SecondaryListItems = () => {
  const [selectedItem, setSelectedItem] = React.useState({one: false, two: false});

  return(
    <List>
      <ListSubheader inset>Otras opciones</ListSubheader>
      <Link to="/home/clients" style={link_style}>
        <ListItem button selected={selectedItem.one}>
          <ListItemIcon><SupervisedUserCircleIcon /></ListItemIcon>
          <ListItemText primary="Clientes"/>
        </ListItem>
      </Link>
      <Link to="/home/contact" style={link_style}>
        <ListItem button selected={selectedItem.two}>
          <ListItemIcon><EmailIcon/></ListItemIcon>
          <ListItemText primary="Contacto" />
        </ListItem>
      </Link>
    </List>
  )
};