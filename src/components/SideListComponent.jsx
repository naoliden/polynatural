import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import DashboardIcon from '@material-ui/icons/Dashboard';
import EmailIcon from '@material-ui/icons/Email';
import InsertChartIcon from '@material-ui/icons/InsertChart';
import PageviewIcon from '@material-ui/icons/Pageview';
import SettingsIcon from '@material-ui/icons/Settings';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import AddBoxIcon from '@material-ui/icons/AddBox';

const link_style={ color: 'inherit', textDecoration: 'inherit'}

export const MainListItems = (props) => {
  const location = useLocation()
  const item = location.pathname.split("/")
  const selectedItem = item[item.length - 1]
  // TODO haveDemo should be a redux gobal prop. If I searched for a demo or my user has a selected default demo, set to true.
  const [haveDemo, setDemo] = useState(true);
  const [selected, setSelected] = useState(selectedItem);

  const handleChange = (item) => (event) => {
    if(selected !== item){
      setSelected(item);
    }
  };

  return (
    <>
      <Divider />
      <List>
        <ListSubheader inset>Dashboard</ListSubheader>
        <Link disabled={selected === 'dashboard'} to="/dashboard" style={link_style}>
          <ListItem button selected={selected === 'dashboard'} onClick={handleChange('dashboard')}>
            <ListItemIcon><DashboardIcon/></ListItemIcon>
            <ListItemText primary="Dashboard"/>
          </ListItem>
        </Link>
        <Link disabled={selected === 'search'} to="/search" style={link_style}>
          <ListItem button selected={selected === 'search'} onClick={handleChange('search')}>
            <ListItemIcon><PageviewIcon/></ListItemIcon>
            <ListItemText primary="Buscar demo" />
          </ListItem>
        </Link>
        <Link disabled={selected === 'newform'} to="/newform" style={link_style}>
          <ListItem button selected={selected === 'newform'} onClick={handleChange('newform')}>
            <ListItemIcon><AddBoxIcon/></ListItemIcon>
            <ListItemText primary="Crear nueva demo" />
          </ListItem>
        </Link>
        {haveDemo?
        <Link disabled={selected === 'demo'} to="/demo" style={link_style}>
          <ListItem button selected={selected === 'demo'} onClick={handleChange('demo')}>
            <ListItemIcon><InsertChartIcon/></ListItemIcon>
            <ListItemText primary="Mi demo" />
          </ListItem>
        </Link>
        :null}
      </List>
      <Divider />
      <List>
        <ListSubheader inset>Otras opciones</ListSubheader>
        <Link disabled={selected === 'admin'} to="/admin" style={link_style}>
          <ListItem button selected={selected === 'admin'} onClick={handleChange('admin')}>
            <ListItemIcon><SettingsIcon /></ListItemIcon>
            <ListItemText primary="Administración"/>
          </ListItem>
        </Link>
        <Link disabled={selected === 'clients'} to="/clients" style={link_style}>
          <ListItem button selected={selected === 'clients'} onClick={handleChange('clients')}>
            <ListItemIcon><SupervisedUserCircleIcon /></ListItemIcon>
            <ListItemText primary="Clientes"/>
          </ListItem>
        </Link>
        <Link disabled={selected === 'contact'} to="/contact" style={link_style}>
          <ListItem button selected={selected === 'contact'} onClick={handleChange('contact')}>
          < ListItemIcon><EmailIcon/></ListItemIcon>
            <ListItemText primary="Contacto" />
          </ListItem>
        </Link>
      </List>
    </>
  )
};
