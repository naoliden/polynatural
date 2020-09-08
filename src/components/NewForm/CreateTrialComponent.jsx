import React, { useState }from "react";
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Button, TextField, Typography, Grid, Checkbox, FormControlLabel } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import { connect } from 'react-redux';
import Select from 'react-select';
import { useForm, Controller } from 'react-hook-form';
import { countries } from './files/countries_es';
import { frutas } from './files/frutas';
import FruitVariety from './SelectVarietyComponent';

const useStyles = makeStyles((theme) => ({
  form: {
    margin: theme.spacing(1),
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
    [theme.breakpoints.up('sm')]:{
      paddingRight: theme.spacing(10),
      paddingLeft: theme.spacing(10),
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(3),
    },
  },
  button: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
    justifyContent: 'center',
    height: 45,
    [theme.breakpoints.only('xl')]:{
      width: 900,
    },
    [theme.breakpoints.only('lg')]:{
      width: 700,
    },
    [theme.breakpoints.only('md')]:{
      width: 500,
    },
    [theme.breakpoints.only('sm')]:{
      width: 300,
    },
    [theme.breakpoints.only('xs')]:{
      width: 220,
    },
  },
  leftSide: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'space-around',
    [theme.breakpoints.down('sm')]:{
      alignItems: 'stretch',
    }
  },
  rightSide: {
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
  // Los params que necesitaban rendereo condicional no los pude rescatar con react-hook-form asi que use useState.
  const [selectedFruit, setFruit] = useState({value: null, label: null});
  const [mediciones, setMedicion] = useState(0);
  const [variety, setVariety] = useState({value: null, label: null});
  const [bandejas, setBandejas] = useState({value: null, label: null});
  const [lab, setLab] = useState(true);
  const { control, handleSubmit, register } = useForm();


  const handleChangeMedicion = (medicion) => {
    setBandejas(medicion)
  }

  const handleChangeFruit = (fruit) => {
    setFruit(fruit)
  }


  const handleFormSubmit = (data) => {
    // TODO dispatch redux action que junta los states y data
    console.log(data)

    props.dispatch( {
      type: "CREATE_FORM",
      payload: {
        fruit: selectedFruit,
        variety: variety,
      }
    })
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
            <Grid container item xs={12} md={6} className={classes.leftSide} spacing={3}>
              <Grid item xs={12} className={classes.item}>
                <Typography color="textPrimary" variant="body1">Fruta</Typography>
              <Grid/>
              <Grid item xs={12} className={classes.item}>
                <Controller
                  name="fruta"
                  control={control}
                  rules={{ required: true }}
                  defaultValue={selectedFruit}
                  render={() => 
                    <Select onChange={handleChangeFruit} options={frutas} placeholder={"Selecciona la fruta del ensayo"} inputRef={register}/>
                  }
                />
              </Grid>
              <Grid item xs={12} className={classes.item} >
                {selectedFruit.value? <FruitVariety fruit={selectedFruit} control={control} onChange={setVariety}/> : <div></div>}
              </Grid>
              <Grid item xs={12} className={classes.item}>
                <TextField name="client" helperText="Ingresa el nombre del cliente" variant="standard" 
                  label="Nombre del cliente" inputRef={register} className={classes.textInput}/>
              </Grid>
              <Grid item xs={12} className={classes.item}>
                <TextField name="date" label="Fecha" helperText="Fecha de creación de los ensayos" type="date" 
                  variant="standard" defaultValue={today} className={clsx(classes.textInput, classes.datePicker)} inputRef={register}
                  InputLabelProps={{
                    shrink: true,
                  }}/>
              </Grid>
              <Grid item xs={12} className={classes.item}>
                <Typography color="textPrimary" variant="body1">País de Origen</Typography>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox checked={lab} onChange={() => {setLab(!lab)}} name="lab" />}
                  label="El ensayo será realizado en laboratorio"
                />
              </Grid>
              <Grid item xs={12} className={classes.item}>
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
                {lab?
                  null
                  :
                  <>
                    <Grid item xs={12} className={classes.item}>
                      <Typography color="textPrimary" variant="body1">País de Destino</Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.item}>
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
                  </>
                }
              </Grid>
            </Grid>
            {/* REVIEW Lado derecho */}
            <Grid container item xs={12} md={6} className={classes.rightSide} spacing={3}>
              <Grid item xs={12} >
                <Typography color="textPrimary" variant="body1">Tipo de medición</Typography>
              </Grid>
              <Grid item xs={12} className={classes.item}>
                <Controller
                  name="tipo_medicion"
                  control={control}
                  rules={{ required: true }}
                  defaultValue={selectedFruit}
                  as={() => 
                    <Select onChange={handleChangeMedicion} options={tipos_medicion} placeholder={"Selecciona a granel o bandejas"}/>
                  }
                />
              </Grid>
              <Grid item xs={12} >
    
                  <TextField name="mediciones" type="number" helperText="Ingresa el número mediciones que se harán"
                    label="Número de mediciones" variant="standard" inputRef={register} className={classes.textInput}/>
    
              </Grid>
              <Grid item xs={12}>
    
                  <TextField name="ntratamientos" type="number" helperText="Ingresa número de tratamientos" 
                    label="Número de tratamientos" variant="standard" inputRef={register} className={classes.textInput}/>
    
              </Grid>
              <Grid item xs={12}>
    
                  <TextField name="cajas" type="number" helperText="Ingresa el número de cajas a revisar en el ensayo"
                    label="Número de cajas por tratamiento" variant="standard" inputRef={register} className={classes.textInput}/>
    
              </Grid>
              <Grid item xs={12} >
                {(bandejas.value === "bandejas")? 
                  <TextField name="bandejas" type="number" helperText="Ingresa el número de bandejas por caja"
                    label="Número de bandejas" variant="standard" inputRef={register} className={classes.textInput}/>
                  :
                  null
                }
              </Grid>
              <Grid item xs={12} >
                <TextField name="calibre" type="number" helperText="Ingresa el calibre de la fruta" 
                  label="Calibre" variant="standard" inputRef={register} className={classes.textInput}/>
              </Grid>
              <Grid item xs={12}>
                <TextField name="comments" multiline={true} helperText="Ingresa algún comentario o instrucción" 
                  label="Comentarios o instrucciones" variant="standard" inputRef={register} className={classes.textInput}/>
              </Grid>
            </Grid>
            <Grid item container xs={12} justify='center'>
              <Button variant="contained" disableElevation type="submit" color="primary" className={classes.button}>
                Crear prueba
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