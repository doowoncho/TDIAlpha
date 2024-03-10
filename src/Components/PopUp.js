import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import { blue } from '@mui/material/colors';
import { DialogContent } from '@mui/material';
import { getTasksByJobId } from './APICalls';

function SimpleDialog(props) {
  const { onClose, open, jobId } = props;
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksData = await getTasksByJobId(jobId);
        setTasks(tasksData);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [jobId]);

  const handleClose = () => {
    onClose();
  };

  return (
    <> 
    {tasks &&
        <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Notes</DialogTitle>
        <DialogContent>     
            <List>
            {tasks.map((task) => (
                <ListItem key={task.id}>
                <ListItemAvatar>
                    <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                    <PersonIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={task.title} />
                </ListItem>
            ))}
            </List>
        </DialogContent>
        </Dialog>
    }
    </>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  jobId: PropTypes.string.isRequired,
};

export default function PopUp({ id }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Expand
      </Button>
      <SimpleDialog open={open} onClose={handleClose} jobId={id} />
    </div>
  );
}
