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


const ClientListItem = ({client}) => {
  const classes = useStyles();
  const [ openEdit, setOpenEdit ] = useState(false);
  const [ openDelete, setOpenDelete ] = useState(false);
  
  const handleDelete = () => {
    console.log(`DELETE client_id: ${client.id}`);
    setOpenDelete(!openDelete);
  }

  const handleEdit = () => {
    console.log(`EDIT client.id: ${client.id}`);
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
        <ListItemText primary={`${client.name}`}/>
        <ListItemSecondaryAction>
          <IconButton edge="start" aria-label="edit" onClick={handleEdit}>
            <EditIcon type="button" className={classes.icon} name={client.id} />
          </IconButton>
          <IconButton edge="end" aria-label="delete" onClick={handleDelete}>
            <DeleteIcon type="button" className={classes.icon} name={client.id} />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <EditModal open={openEdit} setOpen={setOpenEdit} client={client} />
      <DeleteModal open={openDelete} setOpen={setOpenDelete} client={client} />
    </Fragment>
  )
}

export default ClientListItem;