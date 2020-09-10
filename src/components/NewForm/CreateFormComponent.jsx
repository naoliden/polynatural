import React, { useState }from "react";
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Button, TextField, Typography, Grid, FormControlLabel } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Fab from '@material-ui/core/Fab';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import Select from 'react-select';
import Divider from '@material-ui/core/Divider'
import { connect } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { countries } from './files/countries_es';
import { frutas } from './files/frutas';
import FruitVariety from './SelectVarietyComponent';
import { UnidadExperimental } from './UnidadExperimentalComponent';


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
  },
  AddIcon: {
    margin: theme.spacing(2),
  },
  listItem: {
    marginTop: 15,
  },
  mgBottom: {
    marginBottom: 10,
  }
}));

const getToday = () =>{
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0
  let yyyy = today.getFullYear();
  return yyyy + '-' + mm + '-' + dd;
}

const today = getToday();


// Valores para dropdown lists
const tipos_medicion =[
  {
    value: "bandejas",
    label: "Por bandejas",
  },
  {
    value: "granel",
    label: "A granel",  
  },
  {
    value: "mallas",
    label: "Por mallas",  
  },
]

const estados_medicion = [
  {
  value: "frio",
  label: "En frío",
  },
  {
  value: "ambiente",
  label: "Temperatura ambiente",
  },
]



const NewForm = (props) => {
  // TODO pasar los datos de cada input con un onChange a redux, y que se cargen en los valores 
  // TODO por default, asi al cambiar de pestaña no se borra lo ingresado.
  const classes = useStyles();
  // Los params que necesitaban rendereo condicional no los pude rescatar con react-hook-form por lo que usé useState.
  const [selectedFruit, setFruit] = useState({value: null, label: null});
  const [variety, setVariety] = useState({value: null, label: null});
  const [unidad_experimental, setUE] = useState({value: null, label: null});
  const [mediciones, setMediciones] = useState([]);
  const [tratamientos, setTratamientos] = useState([]);
  const [lab, setLab] = useState(true);
  const { control, handleSubmit, register } = useForm();


  const handleFormSubmit = (data) => {
    console.log(data);
    console.log(selectedFruit);
    console.log(variety);
    console.log(selectedFruit)
    console.log(unidad_experimental)
    console.log(mediciones.length)
    console.log(tratamientos.length)
    console.log(lab)
  }

  const handleChangeMedicion = (medicion) => {
    setUE(medicion)
  }

  const handleChangeFruit = (fruit) => {
    setFruit(fruit)
  }

  const handleChangeLab = (event) => {
      setLab(event.target.value === 'true');
  }

  const addMediciones = () => {
    const index = mediciones.length
    console.log(index)
    if(index === 0){
      setMediciones([
        ...mediciones,
        <div key={`M${mediciones.length}`} className={classes.item}>
          <Grid item xs={12}>
            <Typography color="textPrimary" variant="body1">Medicion inicial</Typography>
          </Grid>
          <Grid item xs={12} >
            <TextField name={`medicion${mediciones.length}`} helperText={`Fecha de la medición inicial`} type="date" 
              variant="standard" defaultValue={today} className={clsx(classes.textInput)} inputRef={register}
              InputLabelProps={{
                shrink: true,
              }}/>
          </Grid>
        </div>
       ])
    } else {
      setMediciones([
        ...mediciones,
        <div key={`M${mediciones.length}`} className={classes.item}>
          <Divider/>
          <Grid item xs={12} className={classes.listItem}>
            <Typography color="textPrimary" variant="body1">{`Medicion ${mediciones.length}`}</Typography>
          </Grid>
          <Grid item xs={12} >
            <TextField name={`medicion${mediciones.length}`} helperText={`Fecha de la medición ${mediciones.length}`} type="date" 
            variant="standard" defaultValue={today} className={clsx(classes.textInput, classes.datePicker)} inputRef={register}
            InputLabelProps={{
              shrink: true,
            }}/>
          </Grid>
          <Grid item className={classes.listItem}>
            <Controller
              name={`tipo_medicion${mediciones.length}`}
              as={Select}
              options={estados_medicion}
              control={control}
              rules={{ required: true }}
              placeholder={"Selecciona el tipo de medición"}
              defaultValue={'inicial'}
              />
          </Grid>
        </div>
      ])
    }
  }
    
  const removeMediciones = () => {
    const temp_array = [...mediciones];
    temp_array.pop();
    setMediciones(temp_array)
  }

  const addTratamiento = () => {
    setTratamientos([
      ...tratamientos,
      <TextField key={`T${tratamientos.length}`} name={`T${tratamientos.length}`} helperText="Nombre del tratamiento" label={`T${tratamientos.length}`}
      variant="standard" inputRef={register} className={clsx(classes.textInput, classes.listItem)}/>
     ])
  }

  const removeTratamiento = () => {
    const temp_array = [...tratamientos];
    temp_array.pop();
    setTratamientos(temp_array)
  }



  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <Grid container >
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
                  <Select onChange={handleChangeFruit} options={frutas} placeholder={"Selecciona la fruta del ensayo"}/>
              </Grid>
                {selectedFruit.value? 
                  <Grid item xs={12} className={classes.item} >
                    <FruitVariety fruit={selectedFruit} control={control} onChange={setVariety}/> 
                  </Grid>
                  : <div></div>
                }
              <Grid item xs={12} className={classes.item}>
                <TextField name="client" helperText="Ingresa el nombre del cliente" variant="standard" 
                  label="Nombre del cliente" inputRef={register} className={classes.textInput}/>
              </Grid>
              <Grid item xs={12} className={classes.item}>
                <Typography className={clsx(classes.listItem, classes.mgBottom)} color="textPrimary" variant="body1">¿Dónde se realizará el ensayo?</Typography>
                  {/* <FormLabel component="legend">¿Dónde se realizará el ensayo?</FormLabel> */}
                <FormControl component="fieldset">
                  <RadioGroup aria-label="lab1" name="lab" value={lab.toString()} onChange={handleChangeLab}>
                    <FormControlLabel value="true" control={<Radio />} label="Laboratorio" />
                    <FormControlLabel value="false" control={<Radio />} label="Línea de packing" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12} className={classes.item}>
                <Typography color="textPrimary" variant="body1">País de Origen</Typography>
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
                  <div></div>
                  :
                  <React.Fragment>
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
                  </React.Fragment>
                }
              <Grid item xs={12} >
                <Typography color="textPrimary" variant="body1">Unidad experimental</Typography>
              </Grid>
              <Grid item xs={12} className={classes.item}>
                  <Select onChange={handleChangeMedicion} options={tipos_medicion} placeholder={"Selecciona unidad experimental"}/>
              </Grid>
              </Grid>
            </Grid>
            {/* REVIEW Lado derecho */}
            <Grid container item xs={12} md={6} className={classes.rightSide} spacing={3}>
              <Grid item xs={12}>
                <Typography>Ingresa las mediciones que se harán</Typography>
                <Tooltip title="Agregar fecha de medicion">
                  <Fab color="primary" className={classes.AddIcon} size='small'>
                    <AddIcon onClick={addMediciones}/>
                  </Fab>
                </Tooltip>
                <Tooltip title="Eliminar medicion">
                  <Fab color="secondary" className={classes.AddIcon} size='small'>
                    <RemoveIcon onClick={removeMediciones}/>
                  </Fab>
                </Tooltip>
                <Grid item xs={12}>
                  {mediciones}
                </Grid>
              </Grid>
              <Grid item xs={12} >
                <TextField name="unidades_tratamiento" type="number" helperText="Ingresa el número unidades por tratamiento, si es una caja ingresa 1."
                  label="Número de unidades por tratamiento" variant="standard" inputRef={register} className={classes.textInput}/>  
              </Grid>
              <Grid item xs={12} className={classes.listItem}>
                <Typography>Ingresa los tratamientos a realizar</Typography>
                <Tooltip title="Agregar tratamiento">
                  <Fab color="primary" className={classes.AddIcon} size='small'>
                    <AddIcon onClick={addTratamiento}/>
                  </Fab>
                </Tooltip>
                <Tooltip title="Eliminar tratamiento">
                  <Fab color="secondary" className={classes.AddIcon} size='small'>
                    <RemoveIcon onClick={removeTratamiento}/>
                  </Fab>
                </Tooltip>
                <Grid item xs={12}>
                  {tratamientos}
                </Grid>
              </Grid>
              <Grid item xs={12}>
    
                  <TextField name="cajas" type="number" helperText="Ingresa el número de cajas a revisar en el ensayo"
                    label="Número de cajas por tratamiento" variant="standard" inputRef={register} className={classes.textInput}/>
    
              </Grid>
              <UnidadExperimental register={register} ue={unidad_experimental.value} style={classes.textInput} />
              {/* {(bandejas.value === "bandejas")? 
                <Grid item xs={12} >
                  <TextField name="bandejas" type="number" helperText="Ingresa el número de bandejas por caja"
                    label="Número de bandejas" variant="standard" inputRef={register} className={classes.textInput}/>
                  </Grid>
                  :
                  {(bandejas.value === "malla")?
                  <Grid item xs={12} >
                    <TextField name="bandejas" type="number" helperText="Ingresa el número de bandejas por caja"
                    label="Número de bandejas" variant="standard" inputRef={register} className={classes.textInput}/>
                  </Grid>
                  : <div></div>
                  }
                }
              } */}
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
    </React.Fragment>
  );
}


function MapStateToProps(global_state){
  return {
    message: global_state.message 
  }
}

export default connect(MapStateToProps)(NewForm);