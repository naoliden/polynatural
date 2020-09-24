import React, {useState, useEffect, useRef }from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import SaveIcon from "@material-ui/icons/Save";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center"
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative"
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700]
    }
  },
  fabProgress: {
    color: green[500],
    position: "absolute",
    top: -6,
    left: -6,
    zIndex: 1
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  }
}));

const SuccessOrFail = ({ success, clicked, loading }) => {
  if (success && clicked) {
    return (
      <React.Fragment>
        <CheckIcon />
      </React.Fragment>
    );
  } else if (!success && !loading && clicked) {
    return (
      <React.Fragment>
        <CloseIcon />
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <SaveIcon />
      </React.Fragment>
    );
  }
};

const defColor = (success, loading, clicked) => {
  if (success && clicked && !loading) {
    return "primary";
  } else if (!success && clicked && !loading) {
    return "secondary";
  } else {
    return "primary";
  }
};

const SubmitButton = ({text, submitFunction}) => {
  // TODO Add this as submit button for forms. 
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [clicked, setClicked] = useState(false);
  const timer = useRef();

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success
  });

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = () => {
    setClicked(true);
    if (clicked && success) {
      // pass;
    } else {
      if (!loading) {
        setSuccess(false);
        setLoading(true);
        timer.current = setTimeout(() => {
          setSuccess(true);
          setLoading(false);
        }, 2000);
      }
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Fab
          aria-label="save"
          color={defColor(success, loading, clicked)}
          className={buttonClassname}
          onClick={handleButtonClick}
        >
          <SuccessOrFail
            clicked={clicked}
            success={success}
            loading={loading}
          />
        </Fab>
        {loading && (
          <CircularProgress size={68} className={classes.fabProgress} />
        )}
      </div>
      <div className={classes.wrapper}>
        <Button
          variant="contained"
          color={defColor(success, loading, clicked)}
          className={buttonClassname}
          disabled={loading}
          onClick={handleButtonClick}
          type="submit"
        >
          {text}
        </Button>
        {loading && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}
      </div>
    </div>
  );
}

export default SubmitButton;