import React, { useMemo, useState }from "react";
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, InputLabel, Input, Button, TextField, Typography } from "@material-ui/core";
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux'
import { useForm, register } from 'react-hook-form';
import { countries } from '../shared/countries'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
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
    value: 'Selecciona un fruto',
    label: 'Selecciona un fruto',
  },
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
    value: "Selecciona un tipo de medicion",
    label: "Selecciona un tipo de medición",
  },
  {
    value: "Por bandejas",
    label: "Por bandejas",
  },
  {
    value: "A granel",
    label: "A granel",  
  },
]

// TODO ADD TABS
const NewForm = (props) => {
  const today = getToday()
  const classes = useStyles();
  const [ fruta, setFruta ] = useState('Selecciona un fruto')
  const [ measurement, setMeasurement ] = useState("Selecciona un tipo de medición")
  const [ origen, setOrigen ] = useState("Chile")
  const [ destino, setDestino ] = useState("Germany")

  const handleChangeFruta = (event) => {
    // handleChange for dropdown de fruta
    setFruta(event.target.value);
  };

  const handleChangeMeasurement = (event) => {
    // handleChange for dropdown de tipo de medición
    setMeasurement(event.target.value);
  };

  const handleChangeOrigen = (event) => {
    // handleChange for dropdown de tipo de medición
    setOrigen(event.target.value);
  };

  const handleChangeDestino = (event) => {
    // handleChange for dropdown de tipo de medición
    setDestino(event.target.value);
  };


  return (
    <>
    <form className={classes.container}>

      <FormControl margin="normal" fullWidth>
        <TextField id="client" helperText="Cliente/ client" variant="outlined" />
      </FormControl>

      <TextField id="date" label="Fecha" type="date" variant="outlined" defaultValue={today} className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />

      {/* TODO falta cuantas veces se va a realizar una medición (inicial, 15 y 30 dias?) */}

      <FormControl margin="normal" fullWidth>
        <TextField
          id="select-fruta"
          select
          label="Fruta"
          value={fruta}
          onChange={handleChangeFruta}
          helperText="Selecciona fruta"
          variant="outlined"
        >
          {frutas.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </FormControl>

      <FormControl margin="normal" fullWidth>
        <TextField
          id="origen"
          select
          label="Origen"
          value={origen}
          onChange={handleChangeOrigen}
          helperText="Selecciona país de origen"
          variant="outlined"
        >
          {countries.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>
      </FormControl>

      <FormControl margin="normal" fullWidth>
        <TextField
          id="destino"
          select
          label="Destino"
          value={destino}
          onChange={handleChangeDestino}
          helperText="Selecciona país de destino"
          variant="outlined"
        >
          {countries.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>
      </FormControl>
      
      <FormControl margin="normal" fullWidth>
        <TextField 
          id="select-measurement"
          select
          helperText="Seleccionar el tipo de medición - Granel o por bandejas"
          variant="outlined"
          value={measurement}
          onChange={handleChangeMeasurement}
          label="Tipo de medición/ Measurement"
         >
          {tipos_medicion.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </FormControl>
      
      <FormControl margin="normal" fullWidth>
        <TextField id="boxes" type="number" helperText="Cajas/ Boxes" variant="outlined" />
      </FormControl>

      <FormControl margin="normal" fullWidth>
        <TextField id="calibre" type="number" helperText="Calibre/ Box units" variant="outlined" />
      </FormControl>

      <FormControl margin="normal" fullWidth>
        <TextField id="trays" type="number" helperText="Bandejas/ Trays" variant="outlined" />
      </FormControl>
      
      {/* <FormControl margin="normal" fullWidth>
        <InputLabel htmlFor="name">Cajas</InputLabel>
        <Input id="cajas" type="number" variant='outlined'/>
      </FormControl>

      <FormControl margin="normal" fullWidth>
        <InputLabel htmlFor="calibre">Calibre</InputLabel>
        <Input id="bandejas" type="number" />
      </FormControl>
      
      <FormControl margin="normal" fullWidth>
        <InputLabel htmlFor="bandejas">Bandejas</InputLabel>
        <Input id="bandejas" type="number" />
      </FormControl> */}


      <Button variant="contained" color="primary" size="medium" fullWidth>
        Listo
      </Button>
    </form>
    </>
  );
}

function MapStateToProps(global_state){
  return {
    message: global_state.message 
  }
}

export default connect(MapStateToProps)(NewForm);