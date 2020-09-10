import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

export const UnidadExperimental = ({register, ue, style}) => {

  if( ue === "bandejas"){
    return(
      <Grid item xs={12} >
       <TextField name="bandejas" type="number" helperText="Ingresa el número de bandejas por caja"
         label="Número de bandejas" variant="standard" inputRef={register} className={style}/>
      </Grid>
    )
  }
  else if( ue === "mallas"){
    return(
      <Grid item xs={12} >
       <TextField name="mallas" type="number" helperText="Ingresa el número de mallas por caja"
         label="Número de mallas" variant="standard" inputRef={register} className={style}/>
      </Grid>
    )
  } else {
    return(
      <div></div>
    )
  }
}
  