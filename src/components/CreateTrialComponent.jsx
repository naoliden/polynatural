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
import { countries } from '../shared/countries_es'


const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    display: 'flex',
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
    [theme.breakpoints.up('md')]:{
      paddingRight: theme.spacing(10),
      paddingLeft: theme.spacing(10),
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(3),
    },
    width: '90vw'
  },
  button: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
    width: 200,
  },
  item: {
    backgroundColor: "black",
  }

}));

const getToday = () =>{
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0
  let yyyy = today.getFullYear();
  return yyyy + '-' + mm + '-' + dd;
}

const frutas = [
  {
    value: 'Manzana',
    label: 'Manzana',
  },
  {
    value: 'Limon',
    label: 'Limón',
  },
  {
    value: 'Palta',
    label: 'Palta',
  },
  {
    value: 'Ciruela',
    label: 'Ciruela',
  },
  {
    value: 'Arandano',
    label: 'Arándano',
  },
];

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
  const md = 12;

  return (
    <>
    <Paper className={classes.paper}>
      <Grid container className={classes.title} xs={12} >
        <Grid item >
          <Typography gutterBottom={false} align='center' color="textPrimary" variant="h4">
            Crear nuevo ensayo
          </Typography>
        </Grid>
      </Grid>

      <form className={classes.root}>
        <Grid container spacing={3} justify='space-between'>
          <Grid item container direction="column" xs={12} lg={5}  alignItems='stretch'>
            <Grid item >
              <Typography gutterBottom={false} color="textPrimary" variant="caption">Fruta</Typography>
              <Controller
                  name="fruta"
                  as={Select}
                  options={frutas}
                  control={control}
                  rules={{ required: true }}
                  placeholder={"Selecciona la fruta del ensayo"}
                />
      
              <FormControl margin="normal" >
                <TextField id="variety" helperText="Ingresa la variedad a la cual corresponde la fruta" 
                  label="Variedad" variant="standard" inputRef={control} placeholder="ej: Pink lady"/>
              </FormControl>
            </Grid>
          </Grid>

          <Grid item container direction="column" xs={12} lg={5}>
            <FormControl margin="normal">
              <TextField id="client" helperText="Ingresa el nombre del cliente" variant="standard" 
                label="Nombre del cliente" inputRef={control}/>
            </FormControl>

            <FormControl>
              <TextField id="date" label="Fecha" helperText="Fecha de creación de los ensayos" type="date" 
                variant="standard" defaultValue={today} className={classes.datePicker} inputRef={control}
                InputLabelProps={{
                  shrink: true,
                }}/>
            </FormControl>

            <Typography gutterBottom={false} color="textPrimary" variant="caption">País de Origen</Typography>
            <Controller
              name="origen"
              as={Select}
              options={countries}
              control={control}
              rules={{ required: true }}
              placeholder={"Selecciona el país de origen"}
            />

            <Typography gutterBottom={false} color="textPrimary" variant="caption">País de Destino</Typography>
            <Controller
              name="destino"
              as={Select}
              options={countries}
              control={control}
              rules={{ required: true }}
              placeholder={"Selecciona el país de destino"}
            />

            <Typography gutterBottom={false} color="textPrimary" variant="caption">Tipo de medición</Typography>
            <Controller
                name="fruta"
                as={Select}
                options={tipos_medicion}
                control={control}
                rules={{ required: true }}
                placeholder={"Selecciona el tipo de medición"}
              />

            <FormControl margin="normal" >
              <TextField id="mediciones" type="number" helperText="Ingresa el número mediciones que se harán"
                label="Número de mediciones" variant="standard" inputRef={control}/>
            </FormControl>

            <FormControl margin="normal" >
              <TextField id="boxes" type="number" helperText="Ingresa el número de cajas a revisar en el ensayo"
                label="Número de cajas" variant="standard" inputRef={control}/>
            </FormControl>

            <FormControl margin="normal" >
              <TextField id="trays" type="number" helperText="Ingresa el número de bandejas por caja"
              label="Número de bandejas" variant="standard" inputRef={control}/>

            </FormControl>
            <FormControl margin="normal" >
              <TextField id="calibre" type="number" helperText="Ingresa el calibre de la fruta" 
                label="Calibre" variant="standard" inputRef={control}/>
            </FormControl>

            </Grid>
            <Grid container justify='flex-end'>
              <Button variant="contained" color="primary" size="medium" type="submit" className={classes.button}  >
                Crear ensayo
              </Button>
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