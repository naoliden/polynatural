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

  // return (
  //   <div>
  //     <h1 style="display:inline-block;border-right:1px solid rgba(0, 0, 0,.3);margin:0;margin-right:20px;padding:10px 23px 10px 0;font-size:24px;font-weight:500;vertical-align:top">
  //       404
  //     </h1>
  //     <div style="display:inline-block;text-align:left;line-height:49px;height:49px;vertical-align:middle">
  //       <h2 style="font-size:14px;font-weight:normal;line-height:inherit;margin:0;padding:0">
  //         Esta página no existe.
  //       </h2>
  //     </div>
  //   </div>
  // )

  return (
    <React.Fragment>
      <Grid container className={classes.container}>
        <Grid item>
            <Typography variant="h3" color='error'>Oops!</Typography>
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