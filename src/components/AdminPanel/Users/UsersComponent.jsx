
import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
// import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import List from "@material-ui/core/List";

import AddUserModal from "./AddModal";
import UserListItem from './UsersListItemComponent';
import fetch from 'cross-fetch';
import LoadingSpinner from '../../LoadingComponent';
import { baseURL } from '../../../shared/constants';
import { Typography } from '@material-ui/core';

import { connect } from 'react-redux';

const styles = theme => ({
  icon: {
    zIndex: 1400,
  },
  AddIcon: {
    margin: theme.spacing(2),
  },
});


const UserList = ({ users, setRefresh, clients }) => {
  const user_list = []
  let clients_list = Object.keys(users).sort();
  for(var i = 0; i < clients_list.length; i++){

    // user_list.push(<Divider style={ {padding: 1, margin: 10} }/>)
    user_list.push(<Typography variant="h6" gutterBottom> {clients_list[i]} </Typography>)

    users[clients_list[i]].map( user => {
      user_list.push(<UserListItem user={user} setRefresh={setRefresh} clients={clients}/>)
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
      loading: true,
      error: false,
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
    
    this.setRefresh = () => {
      this.setState({ refresh: !this.state.refresh })
    }

    this.fetchUsers = async () => {
      try {
        const response = await fetch(baseURL + "/users")
        const parsed = await response.json()
        this.setState(
          { users: parsed,
            loading: false,
            clients: this.get_client_list(this.props.clients),
          })
        
      } catch (error) {
        console.log('Users request failed', error) 
      }

    }

  }

  
  componentDidMount() {
    console.log("FETCHING USERS...")
    this.fetchUsers()
  }


  componentDidUpdate(prevProps, prevState) {
    if (this.state.refresh !== prevState.refresh) {
      this.fetchUsers();
    }
  }

  
  render() {
    const { classes } = this.props;
    
    return (
    <Grid container spacing={3}>
      <Grid item xs={12}>

        { (this.state.loading)?
          <LoadingSpinner/>
          :
          <List>
            <UserList users={this.state.users} setRefresh={this.setRefresh} clients={this.state.clients}/>
          </List>
        }

      </Grid>
      <Grid item container xs={12} justify='flex-end'>
        <Tooltip title="Agregar cliente">
          <Fab color="primary" className={classes.AddIcon} size='small' onClick={ () => this.setState({ addModal: true }) }>
            <AddIcon />
          </Fab>
        </Tooltip>
        { (this.state.clients )?
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