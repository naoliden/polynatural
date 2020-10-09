import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useForm } from 'react-hook-form';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import fetch from 'cross-fetch';
import { baseURL } from '../../../shared/constants';
import { loadState } from '../../../shared/utils';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));


const EditClientModal = ({open, setOpen, client, refresh, setRefresh}) => {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();


  const handleClose = () => {
    setOpen(false);
  };

  const submitForm = async (data) => {
    try{
      const response = await fetch(baseURL + "/clients/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json", token: loadState("token") },
        body: JSON.stringify({new_name: data.new_name, client_id: client.client_id}),
      })
      
      if (response.status >= 400 && response.status < 500) {
        throw new Error("Error del cliente");
        
      } else if (response.status >= 500) 
      {
        throw new Error("Error del servidor");
      }
      let parsed_response = await response.json();
      setRefresh(!refresh);

    } catch(err){
      console.error(err);
    
    } finally {
      handleClose();
    }
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <form onSubmit={ handleSubmit((data) => submitForm(data))}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h5" id="transition-modal-title">
                    Editar cliente
                  </Typography>
                </Grid>
                <Grid item xs={10}>
                  <TextField key={client.client_id} name={`new_name`} helperText="Nombre del cliente" label={client.client_name}
                    variant="standard" inputRef={register}/>
                </Grid>
                <Button type="submit" color="primary" variant='contained'>Guardar Cambios</Button>
              </Grid>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}


export default EditClientModal;
