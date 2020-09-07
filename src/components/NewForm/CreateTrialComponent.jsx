import React, { useMemo, useState }from "react";
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { FormControl, InputLabel, Input, Button, TextField, Typography, Grid } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import { useForm, register, Controller } from 'react-hook-form';
import { Select as MUISelect } from '@material-ui/core';
import Select from 'react-select';
// TODO should be a fetch to the server according to the system language.
import { countries } from './files/countries_es';
import { frutas, ciruelas, arandanos, duraznos, mandarinas, peras, limones, naranjas, paltas, manzanas} from './files/frutas';


const useStyles = makeStyles((theme) => ({
  form: {
    margin: theme.spacing(1),
    // display: 'flex',
    alignContent:"space-around",
  },
  container: {
    justifyContent: 'center',
    direction: 'row',
  },
  title: {
    paddingTop: 10,
    justifyContent: "center"
  },
  datePicker: {
    minWidth: 20,
  },
  paper: {
    // display: 'flex',
    width: '100%',
    // marginTop: 60,
    [theme.breakpoints.up('md')]:{
      paddingRight: theme.spacing(10),
      paddingLeft: theme.spacing(10),
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(3),
    },
  },
  button: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
    width: 200,

  },
  item: {
    backgroundColor: "black",
  },
  left: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
  }

}));

const getToday = () =>{
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0
  let yyyy = today.getFullYear();
  return yyyy + '-' + mm + '-' + dd;
}

const tipos_medicion =[
  {
    value: "Por bandejas",
    label: "Por bandejas",
  },
  {
    value: "A granel",
    label: "A granel",  
  },
]

const NewForm = (props) => {
  const today = getToday();
  const classes = useStyles();
  const { control, handleSubmit } = useForm();


  return (
    <>
      <Paper className={classes.paper}>
        <Grid container xs={12} >
          <Grid item className={classes.title} xs={12}>
            <Typography gutterBottom={false} align='center' color="textPrimary" variant="h4">
              Crear nuevo ensayo
            </Typography>
          </Grid>
        </Grid>
        <form className={classes.form}>
          <Grid container spacing={5}>
            <Grid container item xs={12} md={6} className={classes.left} spacing={2}>
              <Grid item xs={12}>
                <Typography gutterBottom={true} color="textPrimary" variant="caption">Fruta</Typography>
              </Grid>
              <Grid item xs={12}>
                <Controller
                    name="fruta"
                    as={Select}
                    options={frutas}
                    control={control}
                    rules={{ required: true }}
                    placeholder={"Selecciona la fruta del ensayo"}
                    defaultValue={'manzana'}
                  />
                </Grid>
            </Grid>
            <Grid container item xs={12} md={6}>
              CHAO
            </Grid>

            <Grid item container alignItems="center" justify="flex-end">
              <Grid item>
                <Button variant="contained" color="primary" type="submit" className={classes.button}>
                  Crear prueba
                </Button>
              </Grid>
            </Grid>


          </Grid>
        </form>

      </Paper>
    </>
  );
}


function MapStateToProps(global_state){
  return {
    message: global_state.message 
  }
}

export default connect(MapStateToProps)(NewForm);