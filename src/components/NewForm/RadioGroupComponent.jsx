import React, { useState } from 'react';
import clsx from 'clsx';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
  datePicker: {
    minWidth: 20,
  },
  textInput: {
    minWidth: 300,
  },
  AddIcon: {
    margin: theme.spacing(2),
  },
  listItem: {
    marginTop: 10,

  }
}));


const TextRadios = ({today, index, callback, register, control}) => {
  const [ value, setValue ] = useState('');
  const classes = useStyles();
  
  const handleChangeStage = (event) => {
    setValue(event.target.value)
  }

  return(
    <>
      <Grid item xs={12} className={classes.listItem}>
        <TextField name={`M${index}`} label="Fecha" helperText={`Fecha de la medición ${index}`} type="date" 
        variant="standard" defaultValue={today} className={clsx(classes.textInput, classes.datePicker, classes.listItem)} inputRef={register}
        InputLabelProps={{
          shrink: true,
        }}/>
      </Grid>
      <Grid item className={classes.listItem}>
        <FormControl component="fieldset"> 
          <FormLabel component="legend">¿En qué etapa será la medicion?</FormLabel>
          <RadioGroup aria-label={`RM-${index}`} name={`RM${index}`} value={value} onChange={handleChangeStage} row>
            <FormControlLabel value="inicial" control={<Radio />} label="Medición inicial" labelPlacement="top"/>
            <FormControlLabel value="frio" control={<Radio />} label="En frío" labelPlacement="top"/>
            <FormControlLabel value="ambiente" control={<Radio />} label="Temperatura ambiente" labelPlacement="top"/>
          </RadioGroup>
        </FormControl>
      </Grid>
    </>
  )
}

export default TextRadios;