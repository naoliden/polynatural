import React, { useMemo, useState }from "react";
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { FormControl, InputLabel, Input, Button, TextField, Typography, Grid } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import Select from 'react-select';
import { useForm, register, Controller } from 'react-hook-form';
import { Select as MUISelect } from '@material-ui/core';
import { countries } from './files/countries_es';
import { frutas } from './files/frutas';
import FruitVariety from './SelectVarietyComponent';

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
    width: '100%',
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
    width: 300,
  },
  left: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]:{
      alignItems: 'stretch',
    }
  },
  right: {
    minHeight: 400,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
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
  const [selectedFruit, setFruit] = useState({value: null, label: null}) 
  const [variety, setVariety] = useState({value: null, label: null}) 
  const { control, handleSubmit, register } = useForm();


  const handleChangeFruit = (fruit) => {
    setFruit(fruit)
    // console.log(fruit.value);
  }

  const handleFormSubmit = (data) => {
    // console.log(JSON.stringify(data))
    // TODO dispatch redux action que junta los states y data
    console.log(selectedFruit)
    console.log(variety)
  }


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
        <form className={classes.form} onSubmit={handleSubmit((data) => handleFormSubmit(data))} >
          <Grid container spacing={5}>
            {/* REVIEW Lado izquierdo */}
            <Grid container item xs={12} md={6} className={classes.left} spacing={3}>
              <Grid item xs={12}>
                <Typography color="textPrimary" variant="body1">Fruta</Typography>
              <Grid/>
              <Grid item>
                <Controller
                  name="fruta"
                  control={control}
                  rules={{ required: true }}
                  defaultValue={selectedFruit}
                  render={() => 
                    <Select onChange={handleChangeFruit} options={frutas} placeholder={"Selecciona la fruta del ensayo"}/>
                  }
                  />
              </Grid>
              <Grid item xs={12} style={{marginTop: 10}}>
                {selectedFruit.value? <FruitVariety fruit={selectedFruit} control={control} onChange={setVariety}/> : <div></div>}
              </Grid>
            </Grid>
            </Grid>
            {/* REVIEW Lado derecho */}
            <Grid container item xs={12} md={6} className={classes.right} spacing={3}>
              <Grid item xs={12} >
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