import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import MessageIcon from '@material-ui/icons/Message';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useForm } from 'react-hook-form';
// import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    // backgroundColor: "blue",
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    // flexDirection: 'column'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  avatarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
}));

const ContactUs = (props) => {
  const classes = useStyles();
  const { handleSubmit, register } = useForm();

  const handleSubmitForm = data =>{
    console.log(data)
    // TODO agregar datos del current user a lo que se envía al servidor. El usuario actual vendrá por redux o useContext hook
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Grid container className={classes.avatarContainer} >
          <Grid item xs={4}>
            <Avatar className={classes.avatar}>
              <RecentActorsIcon />
            </Avatar>
          </Grid>
          <Grid item xs={4}>
            <Avatar className={classes.avatar}>
              <MessageIcon/>
            </Avatar>
          </Grid>
          <Grid item xs={14}>
            <Avatar className={classes.avatar}>
              <ContactSupportIcon/>
            </Avatar>
          </Grid>
        </Grid>
        <Typography component="h1" variant="h5">
          Envíanos tus comentarios
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit((data) => handleSubmitForm(data))}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Nombre"
                autoFocus
                inputRef={register}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="client"
                variant="outlined"
                fullWidth
                id="client"
                label="Nombre del cliente"
                inputRef={register}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="email"
                label="Correo electrónico"
                name="email"
                inputRef={register}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="Comment"
                label="Ingresa tus comentarios"
                type="Comment"
                id="Comment"
                inputRef={register}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Enviar
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default ContactUs;