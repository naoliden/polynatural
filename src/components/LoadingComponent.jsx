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
      <CircularProgress color={color} />
      <Typography color={color} variant="subtitle1">{text}</Typography>
    </div>
  );
}

export default LoadingSpinner;