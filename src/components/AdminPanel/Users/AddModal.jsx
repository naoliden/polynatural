import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import MenuItem from '@material-ui/core/MenuItem';
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { useForm } from 'react-hook-form';
import fetch from 'cross-fetch';
import { baseURL } from '../../../shared/constants';
import { loadState } from "../../../shared/utils";


const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  container: {
    alignItems: "center",
    justifyContent: "space-around",
  },
  input: {
    minWidth: '25ch',
    margin: 10,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20
  },
  form: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const user_types = [
  {
    value: 'admin',
    label: 'admin',
  },
  {
    value: 'client',
    label: 'client',
  },
  {
    value: 'collector',
    label: 'collector',
  },
];


const AddUserModal = ({ open, setOpen, clients, setRefresh }) => {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const [userType, setUserType] = useState("")
  const [client, setClient] = useState("")

  const handleClose = () => {
    setOpen(false);
  };

  const submitForm = async data => {
    const all_data = {
      ...data,
      client_id: client,
      user_type: userType,
    }
    try {
      const response = await fetch(baseURL + "/users/register", 
      {
        method: "POST",
        headers: { "Content-Type": "application/json" , token: loadState("token")},
        body: JSON.stringify(all_data),
      })
      const parsed_response = await response.json();
      setRefresh();

    } catch(err) {
      console.error(err);

    } finally {
      handleClose();
    }
  }

  return (
    <div className={classes.container}>
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
            <Grid item xs={12}>
              <Typography variant="h5" id="transition-modal-title" style={{margin: 5}}>
                Agregar nuevo usuario
              </Typography>
            </Grid>
            <Grid container spacing={3} className={classes.inputs}>
              <form className={classes.form} onSubmit={ handleSubmit((data) => submitForm(data))}>
                  <Grid item xs={12}>
                    <TextField key={"firstname"} name={`firstname`} helperText="Ingresa el nombre" label="Nombre"
                      variant="standard" inputRef={register} className={classes.input} />
                    <TextField key={"lastname"} name={`lastname`} helperText="Ingresa el apellido" label="Apellido"
                      variant="standard" inputRef={register} className={classes.input} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField key={"email"} name={`email`} helperText="Ingresa un correo electrónico" label="Correo"
                      variant="standard" inputRef={register} className={classes.input} />
                    <TextField key={"password"} name={`password`} helperText="Ingresa una contraseña" label="Contraseña"
                      variant="standard" inputRef={register} type="password" className={classes.input} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField key={"client"}
                      name={`client`}
                      helperText="Ingresa el cliente al que pertenece el usuario" 
                      label="Cliente"
                      variant="standard"
                      inputRef={register}
                      className={classes.input}
                      value={client}
                      onChange={ (e) => setClient(e.target.value) }
                      select
                      >
                        {clients.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                    </TextField>

                    <TextField key={"user_type"}
                      name={`user_type`}
                      helperText="Ingresa el tipo de usuario" 
                      label="Tipo de usuario"
                      variant="standard"
                      inputRef={register}
                      className={classes.input}
                      value={userType}
                      onChange={ (e) => setUserType(e.target.value) }
                      select
                      >
                        {user_types.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                    </TextField>
                  </Grid>
                <Grid container className={classes.button}>
                  <Button type="submit" color='primary' variant='contained'>Guardar Cambios</Button>
                </Grid>
              </form>
            </Grid>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}


export default AddUserModal;
