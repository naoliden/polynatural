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
import { baseURL } from '../../../shared/constants';
import fetch from 'cross-fetch';

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


const AddClientModal = ({ open, setOpen, setRefresh, refresh }) => {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();


  const handleClose = () => {
    setOpen(false);
  };

  const submitForm = async (data) => {
    try {
      const response = await fetch(baseURL + "/clients/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (response.status >= 400 && response.status < 500) {
        throw new Error("Error del cliente");
      
      } else if (response.status >= 500) 
      {
        throw new Error("Error del servidor");
      }      
      
      let clients = await response.json();
      console.log(clients)
      setRefresh(!refresh);

    } catch (error) {
      console.error(error.message)
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
                    Agregar nuevo cliente
                  </Typography>
                </Grid>
                <Grid item xs={10}>
                  <TextField key={"name"} name={`name`} helperText="Ingresa el nombre del nuevo cliente" label="Nuevo cliente"
                    variant="standard" inputRef={register}/>
                </Grid>
                <Button type="submit" color='primary' variant='contained'>Guardar Cambios</Button>
              </Grid>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}


export default AddClientModal;
