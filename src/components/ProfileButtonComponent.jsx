import React from 'react';
import { makeStyles, fade } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";


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

export default function ProfileButton() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);


  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };


  const handleMenuClose = () => {
    setAnchorEl(null);
  };


  const menuId = "primary-search-account-menu";
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
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <Link to="/" style={{ color: 'inherit', textDecoration: 'inherit'}} >
        <MenuItem onClick={handleMenuClose}>Log out</MenuItem>
      </Link>
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
