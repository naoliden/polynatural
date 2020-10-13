import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Select from "react-select";

const useStyles = makeStyles((theme) => ({
  item: {
    paddingTop: 10,
    paddingBottom: 10,
    alignSelf: "flex-start",
    [theme.breakpoints.up("sm")]: {
      maxWidth: "90%",
    },
  },
}));

const UsersSelect = ({ onChange, users }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid item xs={12} className={classes.item}>
        <Typography color="textPrimary" variant="body1">
          Usuarios
        </Typography>
      </Grid>
      <Grid item xs={12} className={classes.item}>
        <Select
          isMulti={true}
          name="users_select"
          onChange={onChange}
          options={users}
          className="basic-multi-select"
          classNamePrefix="select"
        />
      </Grid>
    </React.Fragment>
  );
};

export default UsersSelect;
