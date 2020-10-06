import React, { Fragment, useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';


const useStyles = makeStyles((theme) => ({
  icon: {
    zIndex: 1400,
  },
}));


const UserListItem = ({ user, setRefresh }) => {
  const classes = useStyles();
  const [ openEdit, setOpenEdit ] = useState(false);
  const [ openDelete, setOpenDelete ] = useState(false);
  
  const handleDelete = () => {
    console.log(`DELETE user_id: ${user.user_id}`);
    setOpenDelete(!openDelete);
  }

  const handleEdit = () => {
    console.log(`EDIT user_id: ${user.user_id}`);
    setOpenEdit(!openEdit);
  }

  return (
    <Fragment>
      <ListItem >
        <ListItemAvatar>
          <Avatar>
            <SupervisedUserCircleIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={`${user.firstname} ${user.lastname}`}/>
        <ListItemSecondaryAction>
          <IconButton edge="start" aria-label="edit" onClick={handleEdit}>
            <EditIcon type="button" className={classes.icon} name={user.user_id}/>
          </IconButton>
          <IconButton edge="end" aria-label="delete" onClick={handleDelete}>
            <DeleteIcon type="button" className={classes.icon} name={user.user_id}/>
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <EditModal open={openEdit} setOpen={setOpenEdit} user={user}  setRefresh={setRefresh}/>
      <DeleteModal open={openDelete} setOpen={setOpenDelete} user={user}  setRefresh={setRefresh}/>
    </Fragment>
  )
}

export default UserListItem;