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
    paddingBottom: 30,
    justifyContent: "center",
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
    alignItems: 'space-around',
    [theme.breakpoints.down('sm')]:{
      alignItems: 'stretch',
    }
  },
  right: {
    minHeight: 400,
    flexDirection: 'row',
    alignItems: 'space-around',
    justifyContent: 'flex-start',
  },
  item: {
    paddingTop: 10,
    paddingBottom: 10,
    alignSelf: 'flex-start',
    [theme.breakpoints.up('sm')]:{
      // alignSelf: 'center',
      maxWidth: '90%',
    }
  },
  textInput: {
    minWidth: 300,
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
    value: "bandejas",
    label: "Por bandejas",
  },
  {
    value: "granel",
    label: "A granel",  
  },
]

const NewForm = (props) => {
  // TODO pasar los datos de cada input con un onChange a redux, y que se cargen en los valores por default, asi al cambiar de pestaña no se borra lo ingresado.
  const today = getToday();
  const classes = useStyles();
  const [selectedFruit, setFruit] = useState({value: null, label: null}) 
  const [variety, setVariety] = useState({value: null, label: null}) 
  const [tipoMedicion, setMedicion] = useState({value: "bandejas", label: "bandejas"}) 
  const { control, handleSubmit, register } = useForm();


  const handleChangeMedicion = (medicion) => {
    setMedicion(medicion)
    // if(medicion === "bandejas"){
    //   continue;
    // }
  }

  const handleChangeFruit = (fruit) => {
    setFruit(fruit)
    // console.log(fruit.value);
  }

  const handleFormSubmit = (data) => {
    // console.log(JSON.stringify(data))
    // TODO dispatch redux action que junta los states y data
    console.log(selectedFruit)
    console.log(variety)
    console.log(tipoMedicion)
    console.log(data)
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
              <Grid item xs={12} className={classes.item}>
                <Typography color="textPrimary" variant="body1">Fruta</Typography>
              <Grid/>
              <Grid item xs={12} className={classes.item} >
                <Controller
                  name="fruta"
                  control={control}
                  rules={{ required: true }}
                  defaultValue={selectedFruit}
                  render={() => 
                    <Select onChange={handleChangeFruit} options={frutas} placeholder={"Selecciona la fruta del ensayo"} />
                  }
                />
              </Grid>
              <Grid item xs={12} className={classes.item} >
                {selectedFruit.value? <FruitVariety fruit={selectedFruit} control={control} onChange={setVariety}/> : <div></div>}
              </Grid>
              <Grid item xs={12} className={classes.item}>
                <FormControl margin="normal">
                  <TextField id="client" helperText="Ingresa el nombre del cliente" variant="standard" 
                    label="Nombre del cliente" inputRef={register} className={classes.textInput}/>
                </FormControl>
              </Grid>
              <Grid item xs={12} className={classes.item}>
              <FormControl>
                <TextField id="date" label="Fecha" helperText="Fecha de creación de los ensayos" type="date" 
                  variant="standard" defaultValue={today} className={clsx(classes.textInput, classes.datePicker)} inputRef={register}
                  InputLabelProps={{
                    shrink: true,
                  }}/>
                </FormControl>
              </Grid>
              <Grid item xs={12} className={classes.item}>
                <Typography color="textPrimary" variant="body1">País de Origen</Typography>
                <Controller
                  name="origen"
                  as={Select}
                  options={countries}
                  control={control}
                  rules={{ required: true }}
                  placeholder={"Selecciona el país de origen"}
                  defaultValue={'Chile'}

                />
              </Grid>
              <Grid item xs={12} className={classes.item}>
                <Typography color="textPrimary" variant="body1">País de Destino</Typography>
                <Controller
                  name="destino"
                  as={Select}
                  options={countries}
                  control={control}
                  rules={{ required: true }}
                  placeholder={"Selecciona el país de destino"}
                  defaultValue={'Alemania'}
                />
              </Grid>
            </Grid>
            </Grid>
            {/* REVIEW Lado derecho */}
            <Grid container item xs={12} md={6} className={classes.right} spacing={3}>

              <Grid item xs={12} >
                <Typography color="textPrimary" variant="body1">Tipo de medición</Typography>
              </Grid>
              <Grid item xs={12} className={classes.item}>
                <Controller
                  name="fruta"
                  control={control}
                  rules={{ required: true }}
                  defaultValue={selectedFruit}
                  render={() => 
                    <Select onChange={handleChangeMedicion} options={tipos_medicion} placeholder={"Selecciona granel o bandejas"}/>
                  }
                />
              </Grid>
              <Grid item xs={12} >
                <FormControl margin="normal">
                  <TextField id="mediciones" type="number" helperText="Ingresa el número mediciones que se harán"
                    label="Número de mediciones" variant="standard" inputRef={register} className={classes.textInput}/>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl margin="normal" >
                  <TextField id="boxes" type="number" helperText="Ingresa el número de cajas a revisar en el ensayo"
                    label="Número de cajas" variant="standard" inputRef={register} className={classes.textInput}/>
                </FormControl>
              </Grid>
              <Grid item xs={12} >
                {(tipoMedicion.value === "bandejas")? 
                  <FormControl margin="normal" >
                    <TextField id="trays" type="number" helperText="Ingresa el número de bandejas por caja"
                      label="Número de bandejas" variant="standard" inputRef={register} className={classes.textInput}/>
                  </FormControl> 
                  :
                  null
                }
              </Grid>
              <Grid item xs={12} >
                <FormControl margin="normal" >
                  <TextField id="calibre" type="number" helperText="Ingresa el calibre de la fruta" 
                    label="Calibre" variant="standard" inputRef={register} className={classes.textInput}/>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl margin="normal" >
                  <TextField id="testigos" type="number" helperText="Ingresa numero de testigos" 
                    label="Testigos" variant="standard" inputRef={register} className={classes.textInput}/>
                </FormControl>
              </Grid>
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