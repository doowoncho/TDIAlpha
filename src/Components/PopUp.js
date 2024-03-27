import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { DialogContent } from '@mui/material';
import { getTasksByJobId } from './APICalls';

function SimpleDialog(props) {
  const { onClose, open, tasks } = props;
  const handleClose = () => {
    onClose();
  };

  return (
    <> 
        <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Tasks with Notes</DialogTitle>
        <DialogContent>     
            <List>
            {tasks.map((task) => (
                task.notes &&
                <ListItem key={task.id}>
                  <ListItemText primary={`Note: ${task.notes}`} secondary={`Task Id: ${task.id}`} />
                </ListItem>
            ))}
            </List>
        </DialogContent>
        </Dialog>
    </>
  );
}

export default function PopUp( id ) {
  const [open, setOpen] = React.useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksData = await getTasksByJobId(id);
        console.log(tasksData)
        setTasks(tasksData);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (!tasks.some(x => x.notes != null)) {
    return 'No Notes'
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Expand
      </Button>
      <SimpleDialog open={open} onClose={handleClose} tasks={tasks} />
    </div>
  );
}
