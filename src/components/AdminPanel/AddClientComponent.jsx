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



const useStyles = makeStyles((theme) => ({
  icon: {
    zIndex: 1400,
  },
  item: {
    backgroundColor: theme.palette.background.paper
  },
  title: {
    margin: theme.spacing(4, 0, 2)
  },
  AddIcon: {
    margin: theme.spacing(2),
  },
}));


const Clients = (props) => {
  const classes = useStyles();
  const dense = true;
  const [clients, setClients] = useState([{ name: "Jumbo", id: 1}, {  name: "Aldi süd", id: 2 }])
  const [addModal, setAddModal] = useState(false);

  const handleSubmitForm = data =>{
    console.log(data)
    // TODO agregar datos del current user a lo que se envía al servidor. El usuario actual vendrá por redux o useContext hook
  }

  // useEffect(() => {
  //   clients.map(client => generateClientList(client))
  // }, [clients])

  const client_list = []
  clients.map( client => {
    client_list.push(
      <ClientListItem client={client} />
    )
  })

  return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6" className={classes.title}>
            Polyclientes
          </Typography>
          <div className={classes.item}>
            <List dense={dense}>
              {client_list}
            </List>
          </div>
        </Grid>
        <Grid item xs={12} justify='flex-end'>
         <Tooltip title="Agregar cliente">
          <Fab color="primary" className={classes.AddIcon} size='small' onClick={ () => {setAddModal(true) }}>
            <AddIcon />
          </Fab>
         </Tooltip>
         <AddModal open={addModal} setOpen={setAddModal} />
        </Grid>
      </Grid>
  );
}

export default Clients;