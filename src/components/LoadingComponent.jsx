import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
}));

const LoadingSpinner = ({color, text}) => {
  const classes = useStyles();
  // color: primary, secondary, 
  return (
    <div className={classes.root}>
      <div className='col-12'>
        <CircularProgress color={color} />
      </div>
      <Typography color={color} variant="h6">{text}</Typography>
    </div>
  );
}

LoadingSpinner.defaultProps = {
  color: "primary",
  text: "",
}

export default LoadingSpinner;