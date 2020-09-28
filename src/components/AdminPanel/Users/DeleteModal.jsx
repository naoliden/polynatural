import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';



const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }, 
  item: {
    marginLeft: 10
  }
}));


const EditClientModal = ({open, setOpen, client}) => {
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    console.log(`DELETED: ${client.name}`);
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h5" id="transition-modal-title">
                  Borrar cliente
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" id="transition-modal-title">
                  {`Estas seguro que deseas eliminar a ${client.name}?`}
                </Typography>
              </Grid>
              <ButtonGroup variant="contained" className={classes.item}>
                <Button color='primary' onClick={handleSubmit}>Si</Button>
                <Button color='secondary' onClick={handleClose}>No</Button>
              </ButtonGroup>
            </Grid>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}


export default EditClientModal;
