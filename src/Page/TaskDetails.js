import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { getUserById, gettaskById, updatetask } from '../Components/APICalls';
import '../Styles/TaskDetails.css';
import FileUpload from '../Components/FileUpload';
import SwipeableEdgeDrawer from '../Components/Drawer';
import { Card, Box, Divider, Typography, Stack, Paper, Chip} from '@mui/material';
import Button from 'react-bootstrap/Button';

let user = await getUserById(window.sessionStorage.getItem("user"))

export default function Orders() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [task, setTask] = useState({
    starttime: null,
    endtime: null,
    notes: null,
    job_id: null,
    setup: null
  });
  const [isEditing, setIsEditing] = useState(false); // State to track edit mode
  const [isCompleted, setIsCompleted] = useState(task.completed || false);

  useEffect(() => {
    async function fetchTask() {
      try {
        const fetchedTask = await gettaskById(id);
        setTask(fetchedTask);
        setIsCompleted(fetchedTask.completed || false);
  
        setIsLoading(false);
      } catch (error) {
        setError('Error retrieving task!');
        setIsLoading(false);
      }
      console.log(isCompleted);
    }

    fetchTask();
  }, [id]);

  const handleEditClick = () => {
    setIsEditing(true); // Enable edit mode
  };

  const handleCancelClick = async () => {
    setIsEditing(false); // Enable edit mode
    const task = await gettaskById(id);
    setTask(task);
  };

  const saveChanges = async () => {
    var newStartTime = task.starttime ? new Date(task.starttime) : null
    var newEndTime = task.endtime ? new Date(task.endtime) : null
    var taskType = ''
    if(newStartTime !=null  && newEndTime !=null ){
      taskType = 'SameDay'
    }
    else if(newStartTime !=null){
      taskType = 'Place'
    }
    else if(newEndTime !=null){
      taskType = 'Takedown'
    }
    await updatetask(task.id, 
    {
      starttime: newStartTime,
      endtime: newEndTime, 
      notes: task.notes,
      setup: task.setup,
      type: taskType
    }) 

    setIsEditing(false); // Disable edit mode after saving changes
  };

  const handleInputChange = async (e, taskProp) => {
    var newVal = e.target.value;
    if(taskProp == 'starttime' || taskProp == 'endtime'){
      var date = moment.tz(e.target.value, 'America/Edmonton')
      newVal = date
    }
    await setTask((prevTask) => ({
      ...prevTask,
      [taskProp]: newVal,
    }));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleStatusChange = async (x) => {
    await updatetask(task.id, { type: x.target.value });
    window.location.reload()
  };

  function isValidType(type) {
    return ["Finished", "Cancelled", "Cancelled OS"].includes(type);
  }

  return (
    <div>
    <div className='container mt-3'>
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex">
          <a href={`/taskspage/${task.job_id}`} className="btn btn-link">Back</a>
        </div>

        <div className="d-flex align-items-center my-4">
          {user.permission === 1 &&
            <>
              {isEditing
                ? <>
                  <Button className="btn btn-primary mx-1 my-2" variant="light" onClick={handleCancelClick}>Cancel</Button>
                  <Button className="btn btn-warning mx-1 my-2" variant="dark" onClick={saveChanges}>Save Changes</Button>
                </>
                :
                <>
                  <Button className="btn btn-primary mx-3" variant="dark" style={{ width:"5rem" }} onClick={handleEditClick}>Edit</Button>
                  <select className="form-select" aria-label="Default select example" onChange={(x) => handleStatusChange(x)}
                    value={isValidType(task.type) ? task.type : ""}>
                    <option value="">In Progress</option>
                    <option value="Finished">Finished</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Cancelled OS">Cancelled on Site</option>
                  </select>
                </>
              }
            </>
          }
        </div>
      </div>
    </div>
      <div className="container text-center d-flex justify-content-center gap-3">
        <div>
        <Card variant="outlined">
                        <Box sx={{ p: 2 }}>
                            <Stack direction="row" justifyContent="space-between" >
                                <Typography gutterBottom variant="h5" component="div">
                                    TaskId: {task.id}
                                </Typography>
                            </Stack>
                        </Box>
                        <Box sx={{ p: 2 }}>
                            <Stack direction="row" spacing={1}>
                                <Chip color={task.type === 'Place' ? 'primary' : 'default'} label="Place" size="small"/>
                                <Chip color={task.type === 'Takedown' ? 'primary' : 'default'} label="Takedown" size="small"/>
                                <Chip color={task.type === 'SameDay' ? 'primary' : 'default'} label="SameDay" size="small"/>
                                <Chip color={task.type === 'NPAT' ? 'primary' : 'default'} label="NPAT" size="small"/>
                            </Stack>
                        </Box>
                        <Divider />

                        <fieldset disabled={user.permission == 2 || !isEditing}>
                          {isEditing 
                            ? <>
                              <Box sx={{ p: 2, textAlign: "left" }}>
                                  <Typography color="text.secondary">
                                  <input
                                    type="text"
                                    className="form-control my-1"
                                    id="notes"
                                    value={task.setup ? task.setup : ""}
                                    onChange={(e) => handleInputChange(e, 'setup')}/>
                                  </Typography>
                                  <Typography color="text.secondary" >
                                  <label>Notes: </label>
                                  <input
                                    type="text"
                                    className="form-control my-1"
                                    id="notes"
                                    value={task.notes ? task.notes : ""}
                                    onChange={(e) => handleInputChange(e, 'notes')}/>
                                  </Typography>
                              </Box>
                              <Box sx={{ p: 2 }}>
                                  <label htmlFor="exampleInputStartDate">Place:</label>
                                  <Typography color="text.primary" >
                                  <input type="datetime-local" className="form-control" id="startDate" value={moment(task.starttime).format('YYYY-MM-DDTHH:mm')} onChange={(e) => handleInputChange(e, 'starttime')}/>
                                  </Typography>
                                  <label htmlFor="exampleInputEndDate">Takedown:</label>
                                  <Typography color="text.primary" >
                                  <input type="datetime-local" className="form-control" id="enddate" value={moment(task.endtime).format('YYYY-MM-DDTHH:mm')} onChange={(e) => handleInputChange(e, 'endtime')}/>
                                  </Typography>
                              </Box>
                              </>
                            : <>
                              <Box sx={{ p: 2, textAlign: "left" }}>
                                  <Typography color="text.secondary">
                                      {`Setup: ${task.setup}`}
                                  </Typography>
                              <Divider />
                                  <Typography color="text.secondary" >
                                      {`Notes: ${task.notes}`}
                                  </Typography>
                              </Box>
                              <Divider />
                              <Box sx={{ p: 2 }}>
                                  <Typography color="text.primary" >
                                      {task.starttime && `Place: ${moment(task.starttime).format('MMMM DD YYYY h:mm A')}`}
                                  </Typography>
                                  <Typography color="text.primary" >
                                      {task.endtime && `Takedown: ${moment(task.endtime).format('MMMM DD YYYY h:mm A')}`}
                                  </Typography>
                              </Box>
                              </>
                          }
                        </fieldset>
                    </Card>
        </div>
        <div className="d-none d-sm-block">
          <Paper elevation={3} className='py-2'>
            <div className='container my-2'style={{width: '90%'}}>
              <div className="d-none d-sm-block" >
                <div>
                  Files
                </div>
                  <div className="d-flex flex-wrap justify-content-center">
                    <div className="mx-2 my-2">
                      <label htmlFor="formFileDisabled" className="form-label my-1">P. Confirm</label>
                      <FileUpload type="permitConfirmation" giveID={task.job_id}></FileUpload>
                    </div>
                    <div className="mx-2 my-2">
                      <label htmlFor="formFileDisabled" className="form-label my-1">Permit</label>
                      <FileUpload type="permit" giveID={task.job_id}></FileUpload>
                    </div>
                    <div className="mx-2 my-2">
                      <label htmlFor="formFileDisabled" className="form-label my-1">Plan</label>
                      <FileUpload type="plan"  giveID={task.job_id}></FileUpload>
                    </div>
                    <div className="mx-2 my-2">
                      <label htmlFor="formFileDisabled" className="form-label my-1">Photo</label>
                      <FileUpload type="photo" giveID={task.job_id}></FileUpload>
                    </div>
                  </div>
              </div>
            </div>
          </Paper>
        </div>
    </div>
    <div className='container my-2'>
      <Paper elevation={3}>
        <div className="d-block d-sm-none">
          <div className="card-header mx-4">
            Files
          </div>
          <div className="d-flex flex-wrap justify-content-center">
              <div className="mx-2 my-2" style={{ width:"10rem", textAlign:"center" }}>
                <SwipeableEdgeDrawer type="permitConfirmation" jobId={task.job_id} label="P. Confirm"></SwipeableEdgeDrawer>
              </div>
              <div className="mx-2 my-2" style={{ width:"10rem", textAlign:"center" }}>
                <SwipeableEdgeDrawer type="permit" jobId={task.job_id} label="Permit"></SwipeableEdgeDrawer>
              </div>
              <div className="mx-2 my-2" style={{ width:"10rem", textAlign:"center" }}>
                <SwipeableEdgeDrawer type="plan" jobId={task.job_id} label="Plan"></SwipeableEdgeDrawer>
              </div>
              <div className="mx-2 my-2" style={{ width:"10rem", textAlign:"center" }}>
                <SwipeableEdgeDrawer type="photo" jobId={task.job_id} label="Photo"></SwipeableEdgeDrawer>
              </div>
            </div>
        </div>
      </Paper>
    </div>
    </div>
  );
}
