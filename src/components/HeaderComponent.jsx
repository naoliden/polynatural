import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Grid from '@material-ui/core/Grid';
import logo from '../shared/logo.png';
import ProfileButton from './ProfileButtonComponent';
import SideBar from './SideBarComponent';
import SearchBar from './SearchBarComponent';


const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  logo: {
    margin: 0,
    padding: 0,
    maxWidth: 160,
    flexGrow: 1,    
      [theme.breakpoints.down("sm")]: {
      display: 'none',
      }
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
}));


//REVIEW considerar convertir en class component extends React.PureComponent para arreglar rerenders al abrir la app.
const HeaderComponent = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const toggleSideBar = () => {
    setOpen(!open);
  };


  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <Grid container justify="flex-start" alignItems="center" >
            <Grid item xs={1}  style={{ maxWidth: '3vw' }}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleSideBar}
                className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                >
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item container xs={11} alignContent='flex-start' alignItems="center">
              <Grid item xs={false} sm={"auto"}>
                <a href="/"><img className={classes.logo} src={logo} alt="logo" /></a>
              </Grid>
              <Grid item xs={"auto"} >
                <SearchBar />
              </Grid>
            </Grid>
          </Grid>
          <ProfileButton />
        </Toolbar>
      </AppBar>
      <SideBar open={open} toggleSideBar={toggleSideBar}/>
    </React.Fragment>
  );
}


export default HeaderComponent;