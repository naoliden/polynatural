import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  }
));


const Home = (props) => {
  
    const classes = useStyles();

    return(
      <>
        {props.content}
      </>
    )
}

export default Home;