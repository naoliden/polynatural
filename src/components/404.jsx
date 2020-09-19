import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import LoadingComponent from "./LoadingComponent";

const useStyles = makeStyles((theme) => ({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  item: {
    paddingLeft: 15,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 0,
    }
  },
  spinner: {
    margin: 50,
  }
}));


const PageNotFoundComponent = props => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid container className={classes.container}>
        <Grid item>
            <Typography variant="h2" color='error'>Oops!</Typography>
            {/* <div className={classes.item}> */}
              <Typography variant="h5" gutterBottom>
                Lo sentimos! Esta página no existe...
              </Typography>
              {/* <Typography variant="h6" >- 404 Not found</Typography> */}
              <Grid className={classes.spinner}>
                <LoadingComponent text={"404 Not found"} />
              </Grid>
            {/* </div> */}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
 
export default PageNotFoundComponent;