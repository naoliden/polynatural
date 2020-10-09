import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import Clients from './Clients/ClientListComponent';
import Users from './Users/UsersComponent';


const useStyles = makeStyles( theme => ({
  container: {
    justifyContent: "center",
    alignContent: "flex-start",
  },
  item: {
    alignItems: "center",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

const AdminPanel = (props) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);


  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Grid container className={classes.container} spacing={3}>
      <Grid item xs={12} sm={10}>
        <Typography variant="h5">Panel de configuración</Typography>
      </Grid>
      <Grid item xs={12} sm={10}>
      {/*  TODO seccion opciones generales*/}
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography className={classes.heading}>
              Opciones generales
            </Typography>
            <Typography className={classes.secondaryHeading}>
              Nombre de usuario, contraseña, correo
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Cambiar contraseña o correo.</Typography>
          </AccordionDetails>
        </Accordion>

        {/*  DONE seccion opciones nuevo cliente*/}
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography className={classes.heading}>
              Clientes
              </Typography>
            <Typography className={classes.secondaryHeading}>
              Agregar, eliminar o editar clientes
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Clients />
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3bh-content"
            id="panel3bh-header"
          >
            <Typography className={classes.heading}>Usuarios</Typography>
            <Typography className={classes.secondaryHeading}>
              Agregar, eliminar o editar usuarios y permisos
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Users />
          </AccordionDetails>
        </Accordion>
      </Grid>
    </Grid>
  );
};

export default AdminPanel;
