import React from 'react';
import { makeStyles, fade } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { connect } from 'react-redux';
import { Logout } from '../redux/actions/LoginActions'


const useStyles = makeStyles((theme) => ({
    grow: {
      flexGrow: 1
    },
    sectionDesktop: {
      display: "flex",
    },
    text:{
      zIndex: 'tooltip',
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25)
      },
    },
    link: {
      'text-decoration': 'none',
      'text-decoration-line': 'none',
      'text-decoration-style': 'none',
      'text-decoration-color': 'none',
      'text-decoration-thickness': 'none',
    }
  })
);

const ProfileButton = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  let history = useHistory();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };


  const handleMenuClose = () => {
    setAnchorEl(null);
  };


  const handleLogout = () => {
    setAnchorEl(null);
    localStorage.removeItem("token");
    props.logout();
    history.push("/");
    // TODO solo remover el token debería hacerme logout. No es necesario history.push
  };


  const menuId = "primary-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      className={classes.text}
    >
      <MenuItem onClick={handleLogout}>Log out</MenuItem>
    </Menu>
  );


  return (
    <>
      <div className={classes.grow} />
      <div className={classes.sectionDesktop}>
        <IconButton
          edge="end"
          aria-label="account of current user"
          aria-controls={menuId}
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="inherit"
        >
        <AccountCircle />
        </IconButton>
      </div>
      {renderMenu}
    </>
  );
}


const MapStateToProps = gstate => {
  return {
    user: gstate.login.user
  }
}

const MapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(Logout())
  }
}


export default connect(MapStateToProps, MapDispatchToProps)(ProfileButton);
