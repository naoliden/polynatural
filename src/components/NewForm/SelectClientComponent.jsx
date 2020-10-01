import React, { useEffect } from 'react';
import Select from 'react-select';
import LoadingSpinner from "../LoadingComponent";
import Typography from '@material-ui/core/Typography';
import {connect} from 'react-redux'
import { fetchClients } from "../../redux/actions/ClientActions";

const ClientSelect = ({clients, onChange, fetchClients}) => {

  useEffect(() => {
    fetchClients();
  }, [])

  if(clients.loading){
    return <LoadingSpinner color='primary' text="Cargando clientes" />
  }
  else if(clients.error){
    return <Typography variant="h5" color="error">  500 | {clients.error}</Typography>

  } else {
    const client_list = [...clients.clients]
    for(let i = 0; i < client_list.length; i++){
      client_list[i]["value"] = client_list[i]['client_id'];
      client_list[i]["label"] = client_list[i]['client_name'];
    }
    return <Select onChange={onChange} options={client_list} placeholder={"Selecciona un cliente para el ensayo"}/>
  } 
}

const MapStateToProps = (gstate) => {
  return {
    clients: gstate.clients
  }
}

const MapDispatchToProps = dispatch => {
  return {
    fetchClients: (url) => dispatch(fetchClients(url)),
  }
}

export default connect(MapStateToProps, MapDispatchToProps)(ClientSelect);