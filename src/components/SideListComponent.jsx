import React, { useState } from 'react';
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
import AddBoxIcon from '@material-ui/icons/AddBox';

// style={{ color: 'inherit', textDecoration: 'inherit'}}
const link_style={ color: 'inherit', textDecoration: 'inherit'}

export const MainListItems = () => {
  const [selected, setSelected] = useState(false);
   
  return (
    <List>
      <ListSubheader inset>Dashboard</ListSubheader>
      <Link to="/home/dashboard" style={link_style}>
        <ListItem button >
          <ListItemIcon><DashboardIcon/></ListItemIcon>
          <ListItemText primary="Dashboard"/>
        </ListItem>
      </Link>
      <Link to="/home/search" style={link_style}>
        <ListItem button>
          <ListItemIcon><PageviewIcon/></ListItemIcon>
          <ListItemText primary="Buscar demo" />
        </ListItem>
      </Link>
      <Link to="/home/newform" style={link_style}>
        <ListItem button>
          <ListItemIcon><AddBoxIcon/></ListItemIcon>
          <ListItemText primary="Crear nueva demo" />
        </ListItem>
      </Link>
      {true?
        <Link to="/home/demo" style={link_style}>
          <ListItem button >
            <ListItemIcon>
              <InsertChartIcon/></ListItemIcon><ListItemText primary="Mi demo" />
          </ListItem>
        </Link>
      :null}
    </List>
  )
};

export const SecondaryListItems = () => {
  // TODO link with Redux store. Create var for selected menu item
  const [selectedItem, setSelectedItem] = useState();
  const [demo, setDemo] = useState(true);

  return(
    <List>
      <ListSubheader inset>Otras opciones</ListSubheader>
      <Link to="/home/clients" style={link_style}>
        <ListItem button onClick={() => {setDemo(!demo)}}>
          <ListItemIcon><SupervisedUserCircleIcon /></ListItemIcon>
          <ListItemText primary="Clientes"/>
        </ListItem>
      </Link>
      <Link to="/home/contact" style={link_style}>
        <ListItem button onClick={() => {setDemo(!demo)}}>
          <ListItemIcon><EmailIcon/></ListItemIcon>
          <ListItemText primary="Contacto" />
        </ListItem>
      </Link>
    </List>
  )
};