import React, { useState, useEffect }from "react";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
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
import { useForm, Controller } from 'react-hook-form';
import FruitVariety from './SelectVarietyComponent';
import { countries } from './files/countries_es';
import { frutas } from './files/frutas';
import ClientSelect from "./SelectClientComponent";
import { connect } from 'react-redux';
import { SaveForm } from '../../redux/actions/FormActions';
import { baseURL } from '../../shared/constants';
import fetch from 'cross-fetch';


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
    alignContent: 'flex-start',
    [theme.breakpoints.down('sm')]:{
      alignItems: 'stretch',
    }
  },
  rightSide: {
    flexDirection: 'row',
    justifyContent: 'center',
    // alignItems: 'space-around',
    alignContent: 'flex-start',
    minHeight: 400,
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
    [theme.breakpoints.up('xs')]:{
      minWidth: 300,
    },
    [theme.breakpoints.up('lg')]:{
      minWidth: 465,
    },
    // witdh: '100%'
  },
  AddIcon: {
    margin: theme.spacing(2),
  },
  listItem: {
    marginTop: 15,
    // width: 350,
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
    value: "individual",
    label: "Fruto individual",  
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


// DONE Component def
const NewForm = ({ SaveForm }) => {
  const classes = useStyles();
  const [selectedFruit, setFruit] = useState({value: null, label: null});
  const [variety, setVariety] = useState({value: null, label: null});
  const [unidad_experimental, setUE] = useState({value: null, label: null});
  const [mediciones, setMediciones] = useState([]);
  const [tratamientos, setTratamientos] = useState([]);
  const [client, setClient] = useState({value: null, label: null});
  
  const [users, setUsers] = useState(null);

  const [lab, setLab] = useState(true);
  const { control, handleSubmit, register } = useForm();


  const handleFormSubmit = async (data) => {
    if(data.destino === undefined){
      data.destino = data.origen
    }

    const data_tratamientos = []
    for( var i = 0; i < tratamientos.length; i++){
      if(data.hasOwnProperty(`T${i}`)){
        data_tratamientos.push({label: `T${i}`, type: data[`T${i}`]})
      }
    }
    
    const data_mediciones = []
    if(data.hasOwnProperty("medicion0")){
      data_mediciones.push({date: data["medicion0"], type: "inicial"})
    }
    for( var j = 1; j < mediciones.length; j++){
      if(data.hasOwnProperty(`medicion${j}`)){
        data_mediciones.push({date: data[`medicion${j}`], type: data[`tipo_medicion${j}`]})
      }
    }
    const all_data = {
      fruit: selectedFruit,
      variety: variety,
      // Bool, ensayo hecho en lab o en linea de packing
      lab: lab,
      cliente: client,
      origen: data.origen,
      destino: data.destino,
      comentarios: data.comments,
      calibre: data.calibre,
      // Lote identificador de la fruta utilizada
      lote: data.lote,
      // Lugar donde se realiza la aplicacion, 
      lugar_aplicacion: data.lugar_aplicacion,
      // Fecha y tipo de cada medicion
      mediciones: data_mediciones,
      // Tipo de unidad experimental
      unidad_experimental: unidad_experimental,
      // Tipo de cada Tratamiento T_i
      tratamientos: data_tratamientos,
      // Tamaño de cada Tratamiento T_i
      replicas: data.replicas,
      // Número de unidades por cada unidad experimental
      unidades_por_ue: data.unidades_por_ue,
      // Usuarios asignados al ensayo
      users: data.users
    }

    // Agrego todo el estado global de redux
    SaveForm(all_data);

    try {
      const send_data = await fetch(baseURL + "newform",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...all_data })
      });

      const response = await send_data.json();
      
    } catch (error) {
      console.error(error);
    }

  }

  const handleChangeClient = (client) => {
    setClient(client);
  }

  const handleChangeMedicion = (medicion) => {
    setUE(medicion);
  }

  const handleChangeFruit = (fruit) => {
    setFruit(fruit);
  }

  const handleChangeLab = (event) => {
      setLab(event.target.value === 'true');
  }

  const addMediciones = () => {
    const index = mediciones.length
    if(index === 0){
      setMediciones([
        ...mediciones,
        <div key={`M${mediciones.length}`} className={classes.item}>
          <Grid item xs={12}>
            <Typography color="textPrimary" variant="body1">Medicion inicial</Typography>
          </Grid>
          <Grid item xs={12}>
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
            {/* TODO que le defaultValue sea el valor definido en la fecha anterior, no siempre que sea today */}
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
    setMediciones(temp_array);
  }

  const addTratamiento = () => {
    const index = tratamientos.length;
    setTratamientos([
      ...tratamientos,
      <TextField key={`T${index}`} name={`T${index}`} helperText="Nombre del tratamiento" label={`T${index}`}
      variant="standard" inputRef={register} className={clsx(classes.textInput, classes.listItem)}/>
     ])
  }

  const removeTratamiento = () => {
    const temp_array = [...tratamientos];
    temp_array.pop();
    setTratamientos(temp_array);
  }


  const getUsers = async (client_id) => {
    try {
      const response = await fetch(baseURL + `/users/by_id?select=true&client_id=${client_id}`)
      const parsed_response = await response.json();
      setUsers(parsed_response);

    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    console.log("Client selected")
    console.log(client)
    getUsers(client.client_id)
  }, [client])


// DONE Comienza el componente
  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <Grid container >
          <Grid item className={classes.title} xs={12}>
            <Typography align='center' color="textPrimary" variant="h4">
              Crear nuevo ensayo
            </Typography>
          </Grid>
        </Grid>

        <form className={classes.form} onSubmit={handleSubmit((data) => handleFormSubmit(data))} >
          <Grid container spacing={5}>
            {/* DONE Lado izquierdo */}
            <Grid container item xs={12} md={6} className={classes.leftSide} spacing={3}>
              <Grid item xs={12} className={classes.item}>
                <Typography color="textPrimary" variant="body1">Especie</Typography>
              </Grid>
              <Grid item xs={12} className={classes.item}>
                  <Select onChange={handleChangeFruit} options={frutas} placeholder={"Selecciona la fruta del ensayo"}/>
              </Grid>
                {selectedFruit.value? 
                  <React.Fragment>
                    <Grid item xs={12} className={classes.item}>
                      <Typography color="textPrimary" variant="body1">Especie</Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.item} >
                      <FruitVariety fruit={selectedFruit} control={control} onChange={setVariety}/> 
                    </Grid>
                  </React.Fragment>
                  : <div></div>
                }
              <Grid item xs={12} className={classes.item}>
                <Typography color="textPrimary" variant="body1">Cliente</Typography>
              </Grid>
              <Grid item xs={12} className={classes.item}>
                <ClientSelect onChange={handleChangeClient} />
              </Grid>

{/* TODO */}
              {client.client_id? 
                <React.Fragment>
                  <Grid item xs={12} className={classes.item}>
                    <Typography color="textPrimary" variant="body1">Usuarios asignados</Typography>
                  </Grid>
                  <Grid item xs={12} className={classes.item}>
                    <Controller 
                      as={Select}
                      name="users"
                      isMulti
                      options={users}
                      control={control}
                      placeholder="Usuarios asignados al ensayo: "
                    />
                  </Grid>
                </React.Fragment>
                :
                <div></div>}

              <Grid item xs={12} className={classes.item}>
                <Typography className={clsx(classes.listItem, classes.mgBottom)} color="textPrimary" variant="body1">
                  ¿Dónde se realizará el ensayo?
                </Typography>
                <FormControl component="fieldset">
                  <RadioGroup aria-label="lab1" name="lab" value={lab.toString()} onChange={handleChangeLab}>
                    <FormControlLabel value="true" control={<Radio />} label="Laboratorio" />
                    <FormControlLabel value="false" control={<Radio />} label="Línea de packing" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12} className={classes.item}>
                <TextField name="lugar_aplicacion" helperText="Nombre del lugar donde se realiza la aplicación" variant="standard" 
                  label="Lugar de aplicación" placeholder="Polynatural, Dole Puerto Montt, etc ..." inputRef={register} className={classes.textInput}/>
              </Grid>
              <Grid item xs={12} className={classes.item}>
              <TextField name="lote" helperText="Lote identificador de la fruta" variant="standard" 
                  label="Lote" inputRef={register} className={classes.textInput}/>
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
              <Grid item xs={12} >
                <TextField name="unidades_por_ue" type="number" helperText="Ingresa tamaño de una unidad experimental, si es por fruta individual ingresa 1"
                  label="Número de unidades por unidad experimental" variant="standard" inputRef={register} className={classes.textInput}/>  
              </Grid>
              <Grid item xs={12} >
                <TextField name="calibre" type="number" helperText="Ingresa el calibre de la fruta" 
                  label="Calibre" variant="standard" inputRef={register} className={classes.textInput}/>
              </Grid>
            </Grid>
            {/* DONE Lado derecho */}
            <Grid container item xs={12} md={6} className={classes.rightSide} spacing={3}>
              <Grid item xs={12}>
                <Typography>Ingresa las mediciones que se harán</Typography>
                <Tooltip title="Agregar fecha de medicion">
                  <Fab color="primary" className={classes.AddIcon} size='small' onClick={addMediciones}>
                    <AddIcon />
                  </Fab>
                </Tooltip>
                <Tooltip title="Eliminar medicion">
                  <Fab color="secondary" className={classes.AddIcon} size='small' onClick={removeMediciones}>
                    <RemoveIcon />
                  </Fab>
                </Tooltip>
                <Grid item xs={12}>
                  {mediciones}
                </Grid>
              </Grid>
              {/* REVIEW  */}


              <Grid item xs={12} className={classes.listItem}>
                <Typography>Ingresa los tratamientos a realizar</Typography>
                <Tooltip title="Agregar tratamiento">
                  <Fab color="primary" className={classes.AddIcon} size='small' onClick={addTratamiento}>
                    <AddIcon />
                  </Fab>
                </Tooltip>
                <Tooltip title="Eliminar tratamiento">
                  <Fab color="secondary" className={classes.AddIcon} size='small' onClick={removeTratamiento}>
                    <RemoveIcon />
                  </Fab>
                </Tooltip>
                <Grid item xs={12}>
                  {tratamientos}
                </Grid>
              </Grid>
              <Grid item xs={12}>
                  <TextField name="replicas" type="number" helperText="Ingresa el número de réplicas por tratamiento"
                    label="Número de réplicas por tratamiento" variant="standard" inputRef={register} className={classes.textInput}/>
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


const MapStateToProps = (gstate) =>{
  return {
    form: gstate.form
  }
}

const MapDispatchToProps = (dispatch) => {
  return {
    SaveForm: (data) => dispatch(SaveForm(data)),
  }
}


export default connect(MapStateToProps, MapDispatchToProps)(NewForm);