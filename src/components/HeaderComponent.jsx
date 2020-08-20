import React from 'react';
import clsx from 'clsx';
import { makeStyles, fade } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { MainListItems, SecondaryListItems } from './SideListComponent';
import logo from '../shared/logo.png';
import Grid from '@material-ui/core/Grid';
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import ProfileButton from './ProfileButtonComponent';
import SideBar from './SideBarComponent';



const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
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
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(3),
    marginLeft: theme.spacing(4),
    width: "90%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "100%"
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      // width: "20ch"
      width: "auto"
    }
  },
}));


//TODO considerar convertir en class component extends React.PureComponent para arreglar rerenders al abrir la app.
const HeaderComponent = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const toggleSideBar = () => {
    setOpen(!open);
    console.log(open)
  };


  return (
    <>
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
                <a href="/home"><img className={classes.logo} src={logo} alt="logo" /></a>
              </Grid>
              <Grid item xs={"auto"} >
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder="Search…"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput
                    }}
                    inputProps={{ "aria-label": "search" }}
                    fullWidth
                    />
                </div>
              </Grid>
            </Grid>
          </Grid>
          <ProfileButton />
        </Toolbar>
      </AppBar>
      {/* TODO pasar drawer a un archivo aparte */}

      <SideBar open={open} toggleSideBar={toggleSideBar}/>
      {/* <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={toggleSideBar}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <div className={classes.content}>
          <Divider />
          <MainListItems/>
          <Divider />
          <SecondaryListItems/>
        </div>
      </Drawer> */}
    </>
  );
}


export default HeaderComponent;