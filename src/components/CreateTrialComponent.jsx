import React, { useMemo, useState }from "react";
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, InputLabel, Input, Button, TextField, Typography } from "@material-ui/core";
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux'
import { useForm, register } from 'react-hook-form';


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

// TODO ADD TABS
const NewForm = (props) => {
  const today = getToday()
  const classes = useStyles();
  const [ fruta, setFruta ] = useState({value: 'Selecciona una fruta', lable: 'Selecciona una fruta'})

  const handleChangeFruta = (event) => {
    setFruta(event.target.value);
  };


  return (
    <>
    <form className={classes.container}>

      <TextField id="date" label="Fecha" type="date" variant="outlined" defaultValue={today} className={classes.textField}
       InputLabelProps={{
          shrink: true,
        }}
      />
      
      <FormControl margin="normal" fullWidth>
        <InputLabel htmlFor="name">Cajas</InputLabel>
        <Input id="cajas" type="number" variant='outlined'/>
      </FormControl>
      
      <FormControl margin="normal" fullWidth>
        <InputLabel htmlFor="bandejas">Bandejas</InputLabel>
        <Input id="bandejas" type="number" />
      </FormControl>

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


      <Button variant="contained" color="primary" size="medium" >
        Send
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