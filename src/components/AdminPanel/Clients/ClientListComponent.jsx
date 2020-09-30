import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ClientListItem from './ClientListItemComponent';
import Tooltip from '@material-ui/core/Tooltip'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add';
import AddModal from './AddModal';
import { connect } from 'react-redux';
import LoadingSpinner from "../../LoadingComponent";
import { fetchClients } from "../../../redux/actions/ClientActions";


const useStyles = makeStyles((theme) => ({
  icon: {
    zIndex: 1400,
  },
  item: {
    backgroundColor: theme.palette.background.paper
  },
  AddIcon: {
    margin: theme.spacing(2),
  },
}));

const ClientList = ({clients, refresh, setRefresh}) => {

  if(clients.loading){
    return <LoadingSpinner color='primary' text="Cargando clientes" />
  }
  else if(clients.error){
    return <Typography variant="h5" color="error">  500 | {clients.error}</Typography>

  } else {

    const client_list = []
    clients.clients.map( client => {
      client_list.push(
        <ClientListItem key={client.client_id} client={client} refresh={refresh} setRefresh={setRefresh}/>
      )
      // retorna true porque la arrow function debe retornar ALGO. Pero no se usa para nada.
      return true;
    })
    return client_list;
  }
}

const Clients = ({fetchClients, clients}) => {
  const classes = useStyles();
  const [addModal, setAddModal] = useState(false);
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    fetchClients();
  }, [fetchClients, refresh])


  return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <List dense={true}>
            <ClientList clients={clients} setRefresh={setRefresh} refresh={refresh}/>
          </List>
        </Grid>
        <Grid item container xs={12} justify='flex-end'>
         <Tooltip title="Agregar cliente">
          <Fab color="primary" className={classes.AddIcon} size='small' onClick={ () => {setAddModal(true) }}>
            <AddIcon />
          </Fab>
         </Tooltip>
         <AddModal open={addModal} setOpen={setAddModal} setRefresh={setRefresh} refresh={refresh}/>
        </Grid>
      </Grid>
  );
}

const MapStateToProps = gs => {
  return {
    clients: gs.clients,
  }
}

const MapDispatchToProps = dispatch => {
  return {
    fetchClients: (url) => dispatch(fetchClients(url)),
  }
}


export default connect(MapStateToProps, MapDispatchToProps)(Clients);