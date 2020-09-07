import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { MainListItems } from './SideListComponent';


const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
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
  fixedHeight: {
    height: '100vh',
  },
}))


export const SideBar = ({open, toggleSideBar}) =>{
  const classes = useStyles();
  return(
    <Drawer
      variant="permanent"
      className={classes.fixedHeight}
      classes={{paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)}}
      open={open}
      >
      <div className={classes.toolbarIcon}>
        <IconButton onClick={toggleSideBar}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <div className={classes.content}>
        <MainListItems/>
      </div>
    </Drawer>
  )
}


export default SideBar;