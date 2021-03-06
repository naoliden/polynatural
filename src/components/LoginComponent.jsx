import React, { useState } from 'react';
import logo from '../shared/logo.png';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Copyright from './CopyrightComponent';
import { connect } from 'react-redux';
import { Login } from '../redux/actions/LoginActions';
import { baseURL } from '../shared/constants';


// const randomBackground = (previous) =>{
//   const arr = ['../shared/login/manzanas.jpg', '../shared/login/frutas.jpg', '../shared/login/limones.jpg']
//   return arr[Math.floor(Math.random() * arr.length)]
// }


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    // TODO En el servidor usar un URL como este que de me una imagen random. 
    // Crear endpoint en el server-side.
    // backgroundImage: 'url(https://url-privada?-servidor-polynatural/random)',
    // backgroundImage: 'url(../public/assets/manzanas.jpg)',
    backgroundImage: `url(${require('../shared/login/manzanas.jpg')})`,
    // TODO luego descomentar esto.
    // backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const LoginComponent = (props) => {
  const classes = useStyles();
  const [email, setEmail] = useState(localStorage.email);
  const [password, setPassword] = useState("");
  const [formSent, setFormSent] = useState(false)
  const [checked, setChecked] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const response = await fetch( baseURL + '/auth/login', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({email, password}),
      });

      if (response.status === 403)
      {
        throw new Error("Wrong password");
      } 
      else if(response.status === 400)
      {
        throw new Error("Wrong email");
      }
      else if(response.status > 400){
        throw new Error("Server Error");
      }
      
      const user = await response.json();

      props.login(user);
      // login, guardo el usuario y token en redux
      localStorage.setItem('token', user.token);

      if(checked){
        localStorage.setItem('email', email);
      }

    } catch (err) {
      setFormSent(true);
    }


  }

  const handleChangeEmail = e => {
    setEmail(e.target.value);
  }

  const handleChangePassword = e => {
    setPassword(e.target.value);
  }

  const handleChangeChecked = e => {
    setChecked(e.target.checked);
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <img src={logo} alt="logo"></img>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              error={formSent}
              helperText={ formSent && "Correo o contraseña incorrectos"}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={handleChangeEmail}
              autoFocus
            />
            <TextField
              error={formSent}
              helperText={ formSent && "Correo o contraseña incorrectos"}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={handleChangePassword}
              autoComplete="current-password"
            />
            <FormControlLabel
              control={
                <Checkbox color="primary" 
                onChange={handleChangeChecked}
                checked={checked}/>
              }
              label="Remember me"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              // onClick={() => {window.location.href = "/dashboard"}}
              >
              Sign In
            </Button>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

const MapStateToProps = gstate => {
  return {
    user: gstate.login
  }
}

const MapDispatchToProps = dispatch => {
  return {
    login: (user) => dispatch(Login(user))
  }
}

export default connect(MapStateToProps, MapDispatchToProps)(LoginComponent);
