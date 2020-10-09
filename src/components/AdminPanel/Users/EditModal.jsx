import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import MenuItem from "@material-ui/core/MenuItem";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { useForm } from "react-hook-form";
import fetch from "cross-fetch";
import { baseURL } from "../../../shared/constants";
import { loadState } from "../../../shared/utils";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "block",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    overflow:'scroll',
    position:'absolute',
    marginTop: 40,
    marginLeft: "20%",
    marginRight: "20%",
    marginBottom: 40,
    height: "90%",
  },
  paper: {
    display: "flex",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    alignContent: "center",
    justifyContent: "center",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  input: {
    minWidth: "35ch",
    margin: 10,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
    paddingBottom: 20,
    minWidth: 150,
  },
  form: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
    justifyContent: "center",
    alignItems: "center"
  },
}));

const user_types = [
  {
    value: "admin",
    label: "admin",
  },
  {
    value: "client",
    label: "client",
  },
  {
    value: "collector",
    label: "collector",
  },
];

const EditUserModal = ({ open, setOpen, clients, setRefresh, user }) => {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const [userType, setUserType] = useState(user.user_type)
  const [client, setClient] = useState(user.client_name);
  const [changeName, setChangeName] = useState(false);
  const [changePass, setChangePass] = useState(false);
  const [changeEmail, setChangeEmail] = useState(false);
  const [changeClient, setChangeClient] = useState(false);
  const [changeUserType, setChangeUserType] = useState(false);

  const handleChangeName = (e) => {
    setChangeName(e.target.checked);
  };

  const handleChangeEmail = (e) => {
    setChangeEmail(e.target.checked);
  };

  const handleChangeClient = (e) => {
    setChangeClient(e.target.checked);
  };

  const handleChangePass = (e) => {
    setChangePass(e.target.checked);
  };

  const handleChangeUserType = (e) => {
    setChangeUserType(e.target.checked);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitForm = async (data) => {
    const submit_data = {};
    submit_data["user_id"] = user.user_id;

    if( changeName && ((data.firstname !== user.firstname) || (data.lastname !== user.lastname))){
      submit_data['firstname'] = data.firstname;
      submit_data['lastname'] = data.lastname;
    }

    if( changeEmail && (data.email !== user.email )){
      submit_data['email'] = data.email;
    }

    if( changeClient && ( client !== user.client_id )){
      submit_data['client_id'] = client;
    }

    if( changeUserType && (userType !== user.user_type )){
      submit_data['user_type'] = data.user_type;
    }

    if( changePass ){
      try {
        const response = await fetch(baseURL + "/users/changepass", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            token: loadState("token"),
          },
          body: JSON.stringify(data.password),
        });

        const parsed_response = await response.json();

      } catch (error) {
        console.error(error);
      }
    }

    try {
      const response = await fetch(baseURL + "/users/edit", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          token: loadState("token"),
        },
        body: JSON.stringify(submit_data),
      });

      const parsed_response = await response.json();

    } catch (error) {
      console.error(error);
    }

    handleClose();
    setRefresh();
  };

  return (
    <div >
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Grid container spacing={3} className={classes.container}>
              <Grid item container justify='center'>
                <Typography
                  variant="h5"
                  id="transition-modal-title"
                  style={{ margin: 5, marginBottom: 15  }}
                  >
                  Editar información de usuario
                </Typography>
              </Grid>
            
              <form className={classes.form} onSubmit={handleSubmit((data) => submitForm(data))}>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        onChange={handleChangeName}
                        checked={changeName}
                      />
                    }
                    label="Editar nombre?"
                  />
                </Grid>
                  {changeName ? (
                    <React.Fragment>
                      <Grid item xs={12}>
                        <TextField
                          key={"firstname"}
                          name={`firstname`}
                          helperText="Ingresa el nombre"
                          label="Nombre"
                          variant="standard"
                          inputRef={register}
                          className={classes.input}
                          value={user.firstname}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          key={"lastname"}
                          name={`lastname`}
                          helperText="Ingresa el apellido"
                          label="Apellido"
                          variant="standard"
                          inputRef={register}
                          value={user.lastname}
                          className={classes.input}
                        />
                      </Grid>
                    </React.Fragment>
                  ) : null}

                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        onChange={handleChangeEmail}
                        checked={changeEmail}
                      />
                    }
                    label="Cambiar correo electrónico?"
                  />
                </Grid>
                  {changeEmail ? (
                    <Grid item xs={12}>
                      <TextField
                        key={"email"}
                        name={`email`}
                        helperText="Ingresa nuevo correo"
                        label="Email"
                        variant="standard"
                        inputRef={register}
                        type="email"
                        value={user.email}
                        className={classes.input}
                      />
                    </Grid>
                  ) : null}

                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        onChange={handleChangePass}
                        checked={changePass}
                      />
                    }
                    label="Cambiar contraseña?"
                  />
                </Grid>
                  {changePass ? (
                    <Grid item xs={12}>
                      <TextField
                        key={"password"}
                        name={`password`}
                        helperText="Ingresa una contraseña"
                        label="Contraseña"
                        variant="standard"
                        inputRef={register}
                        type="password"
                        className={classes.input}
                      />
                    </Grid>
                  ) : null}

                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        onChange={handleChangeClient}
                        checked={changeClient}
                      />
                    }
                    label="Cambiar usuario de empresa?"
                  />
                </Grid>
                {changeClient ? (
                  <Grid item xs={12}>
                    <TextField
                      key={"client"}
                      name={`client`}
                      helperText="Ingresa el cliente al que pertenece el usuario"
                      label="Cliente"
                      variant="standard"
                      inputRef={register}
                      className={classes.input}
                      value={client}
                      onChange={(e) => setClient(e.target.value)}
                      select
                    >
                      {clients.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                ) : null}

                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="primary"
                        onChange={handleChangeUserType}
                        checked={changeUserType}
                      />
                    }
                    label="Cambiar tipo de usuario?"
                  />
                </Grid>
                  {changeUserType ? (
                    <Grid item xs={12}>
                      <TextField
                        key={"user_type"}
                        name={`user_type`}
                        helperText="Ingresa el tipo de usuario"
                        label={`Tipo de usuario actual ${user.user_type}`}
                        variant="standard"
                        inputRef={register}
                        className={classes.input}
                        value={userType}
                        onChange={(e) => setUserType(e.target.value)}
                        select
                      >
                        {user_types.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                  ) : null}

                <Grid container className={classes.button}>
                  <Button type="submit" color="primary" variant="contained">
                    Guardar Cambios
                  </Button>
                </Grid>
              </form>
            </Grid>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default EditUserModal;
