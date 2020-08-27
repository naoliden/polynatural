import React, { useMemo }from "react";
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, InputLabel, Input, Button, TextField } from "@material-ui/core";
import { connect } from 'react-redux'
import { useForm } from 'react-hook-form';


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

function DatePickers() {
  const classes = useStyles();
  const today = getToday()

  return (
    <form className={classes.container} noValidate>
      <TextField
        id="date"
        label="Fecha"
        type="date"
        defaultValue={today}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  );
}


// TODO ADD TABS
const NewForm = (props) => {
    return (
      <div style={{ display: "flex", justifyContent: "center", paddingTop: 20 }}>
          
        <form style={{ width: "95%" }}>
          <h1>{getToday()}</h1>

          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="name">Name</InputLabel>
            <Input id="name" type="text" />
          </FormControl>

          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input id="email" type="email" />
          </FormControl>

          <FormControl margin="normal" fullWidth>
            <InputLabel htmlFor="email">Message</InputLabel>
            <Input id="email" multiline rows={10} />
          </FormControl>

          <Button variant="contained" color="primary" size="medium" >
            Send
          </Button>
        </form>
      </div>
    );
}

function MapStateToProps(global_state){
  return {
    message: global_state.message 
  }
}

export default connect(MapStateToProps)(NewForm);