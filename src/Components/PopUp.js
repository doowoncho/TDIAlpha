import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { DialogContent } from '@mui/material';
import { getPermitCostLogsByJobId, getTasksByJobId } from './APICalls';
const moment = require('moment-timezone');

function NotesBox(props) {
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

function PermitLogsBox(props) {
  const { onClose, open, logs } = props;
  const handleClose = () => {
    onClose();
  };

  // Sort the logs array in descending order based on the date property
logs.sort((a, b) => moment(b.date).valueOf() - moment(a.date).valueOf());

  return (
    <> 
        <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Costs are without 10% increase</DialogTitle>
        <DialogContent>     
            <List>
            {logs.map((permitCost) => (
                <ListItem key={permitCost.id}>
                  <ListItemText primary={`Cost: ${permitCost.cost}`} secondary={`Created Date: ${moment.tz(permitCost.date, 'America/Edmonton').format('MM/DD/YYYY h:mm A')}`}/>
                </ListItem>
            ))}
            </List>
        </DialogContent>
        </Dialog>
    </>
  );
}

export default function PopUp( id, field ) {
  const [open, setOpen] = React.useState(false);
  const [tasks, setTasks] = useState([]);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksData = await getTasksByJobId(id);
        const logsData = await getPermitCostLogsByJobId(id)
        setLogs(logsData);
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

  if (field == 'permit_logs'){
    return <div>
            <Button variant="outlined" onClick={handleClickOpen}>
              Costs
            </Button>
            <PermitLogsBox open={open} onClose={handleClose} logs={logs} />
          </div>
  }

  if (tasks.some(x => x.notes != null)) {
    return <div>
            <Button variant="outlined" onClick={handleClickOpen}>
              Expand
            </Button>
            <NotesBox open={open} onClose={handleClose} tasks={tasks} />
          </div>
  }

  return (
      'No Notes'
  );
}
