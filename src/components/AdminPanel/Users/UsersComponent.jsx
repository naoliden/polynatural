
import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';

import EditModal from './EditModal';
import DeleteModal from './DeleteModal';
import AddUserModal from "./AddModal";
import UserListItem from './UsersListItemComponent';
import fetch from 'cross-fetch';
import LoadingSpinner from '../../LoadingComponent';
import { baseURL } from '../../../shared/constants';
import { Typography } from '@material-ui/core';


const styles = theme => ({
  icon: {
    zIndex: 1400,
  },
  AddIcon: {
    margin: theme.spacing(2),
  },
});




const UserList = ({ users, setRefresh }) => {
  const user_list = []
  let clients = Object.keys(users).sort();
  for(var i = 0; i < clients.length; i++){

    user_list.push(<Divider style={ {padding: 1, margin: 10} }/>)
    user_list.push(<Typography variant="h6" gutterBottom> {clients[i]} </Typography>)

    users[clients[i]].map( user => {
      user_list.push(<UserListItem user={user} setRefresh={setRefresh}/>)
      return true;
    }
    )
  }

  return user_list;
}


class Users extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refresh: false,
      users: null,
      addModal: false,
      clients: null,
    }

    this.setAddModal = bool => {
      this.setState({ addModal: bool })
    }
    
    this.get_client_list = (clients) => {
      const client_list = clients.reduce( (acc, item) => {
        acc.push({label: item["client_name"], value: item["client_id"] })
        return acc;
      }, [])
      return client_list;
    }
  }

  
  componentDidMount() {
    fetch(baseURL + "/clients")
      .then( response => response.json() )
      .then( clients => this.get_client_list(clients) )
      .then( client_list => {
        fetch(baseURL + "/users")
          .then( response => response.json())
          .then( data => {
            this.setState({ users: data, clients: client_list })
          })
          .catch(function(error) { 
            console.log('Users request failed', error) 
          })
        }
      )  
      .catch(function(error) { 
        console.log('Clients request failed', error) 
      })
  }


  componentDidUpdate(prevProps) {
    if (this.props.refresh !== prevProps.refresh) {
      const users = this.fetchUsers();
      this.setState({ users: users })
    }
  }

  
  render() {
    
    const setRefresh = () => {
      this.setState({refresh: !this.state.refresh})
    }

    const { classes } = this.props;

    return (
    <Grid container spacing={3}>
      <Grid item xs={12}>

        { this.state.users?
          <List>
            <UserList users={this.state.users} setRefresh={this.setRefresh}/>
          </List>
          : <LoadingSpinner/>
        }

      </Grid>
      <Grid item container xs={12} justify='flex-end'>
        <Tooltip title="Agregar cliente">
          <Fab color="primary" className={classes.AddIcon} size='small' onClick={ () => this.setState({ addModal: true }) }>
            <AddIcon />
          </Fab>
        </Tooltip>
        { this.state.clients?
          <AddUserModal 
            open={this.state.addModal} 
            setOpen={this.setAddModal} 
            clients={this.state.clients}
            setRefresh={this.setRefresh}
            />
          : <LoadingSpinner/>
        }
      </Grid>
    </Grid>
    )
}
}



export default withStyles(styles, { withTheme: true })(Users);