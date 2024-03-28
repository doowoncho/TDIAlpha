import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { getUserById, gettaskById, updatetask, getJobById, getFilesById, getTasksByJobId } from '../Components/APICalls';
import '../Styles/TaskDetails.css';
import FileUpload from '../Components/FileUpload';
import SwipeableEdgeDrawer from '../Components/Drawer';
import { Card, Box, Divider, Typography, Stack, Paper, Checkbox, FormControlLabel } from '@mui/material';
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
    const newVal = e.target.value;
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

  const handleCheckboxChange = async () => {
    const newCompletedStatus = !isCompleted;
    setIsCompleted(newCompletedStatus);
    console.log(newCompletedStatus);

    // Update the completion status in the database
    await updatetask(task.id, { completed: newCompletedStatus });
  };

  return (
    <div>

    <div className='container mt-3' style={{ padding: '0 15px' }}>
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex">
          <a href={`/taskspage/${task.job_id}`} className="btn btn-link">Back</a>
        </div>

        <div className="d-flex align-items-center ml-3"> {/* ml-auto adds margin to the left */}
          {user.permission === 1 &&
            <>
              {isEditing
                ? <>
                  <Button className="btn btn-primary mx-1 my-2" variant="light" onClick={handleCancelClick}>Cancel</Button>
                  <Button className="btn btn-warning mx-1 my-2" variant="dark" onClick={saveChanges}>Save Changes</Button>
                </>
                :
                <>
                  <Button className="btn btn-primary mx-3 my-2" variant="dark" style={{ width:"5rem" }} onClick={handleEditClick}>Edit</Button>
                  <div className="form-check ml-2">
                    <FormControlLabel className='ml-2' control={
                      <Checkbox className="form-check-input" type="checkbox" id="flexCheckDefault" checked={isCompleted} onChange={handleCheckboxChange} />
                    }
                    label="Complete"
                    />
                    {/* <label className="form-check-label" htmlFor="flexCheckDefault">Complete</label> */}
                  </div>
                </>
              }
            </>
          }
        </div>
      </div>
    </div>
      <div className="container text-center d-flex justify-content-center gap-3">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Card variant="outlined" sx={{ maxWidth: 360 }}>
            <Box sx={{ p: 2 }}>
              <Stack direction="row" justifyContent="space-between" style={{ textAlign: "center" }}>
                <Typography gutterBottom variant="h6" component="div">
                  ID: {task.id}
                </Typography>
              </Stack>
            </Box>
            <Divider />
            <Box sx={{ p: 2 }}>
              <fieldset disabled={user.permission == 2 || !isEditing}>
                {isEditing 
                  ? <>
                      <label htmlFor="exampleInputStartDate">Start Time:</label>
                      <input type="datetime-local" className="form-control" id="startDate" value={moment(task.starttime).format('YYYY-MM-DDTHH:mm')} onChange={(e) => handleInputChange(e, 'starttime')}/>
                      <label htmlFor="exampleInputEndDate">End Time:</label>
                      <input type="datetime-local" className="form-control" id="enddate" value={moment(task.endtime).format('YYYY-MM-DDTHH:mm')} onChange={(e) => handleInputChange(e, 'endtime')}/>
                    </>
                  : <>
                      {task.starttime &&
                        <>
                          <label htmlFor="exampleInputStartDate">Drop Off Time:</label>
                          <input type="datetime-local" className="form-control" id="startDate" value={moment(task.starttime).format('YYYY-MM-DDTHH:mm')} onChange={(e) => handleInputChange(e, 'starttime')}/>
                        </>
                      }
                      {task.endtime &&
                        <>
                          <label htmlFor="exampleInputEndDate">Pick Up Time:</label>
                          <input type="datetime-local" className="form-control" id="enddate" value={moment(task.endtime).format('YYYY-MM-DDTHH:mm')} onChange={(e) => handleInputChange(e, 'endtime')}/>
                        </>
                      }
                    </>
                }
              </fieldset>
            </Box>
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
                      <label htmlFor="formFileDisabled" className="form-label my-1">Permit Confirmation</label>
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
                <SwipeableEdgeDrawer type="permitConfirmation" jobId={task.job_id} label="Permit Confirmation"></SwipeableEdgeDrawer>
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


      <div className="container">
        <Paper elevation={3}>
          <div className="my-3 mx-4">
            <div className="card-header">Setup</div>
            <div>
              <fieldset disabled={user.permission == 2 || !isEditing}>
                <input
                  type="text"
                  className="form-control text-center my-4"
                  id="notes"
                  aria-describedby="emailHelp"
                  value={task.setup ? task.setup : ""}
                  onChange={(e) => handleInputChange(e, 'setup')}/>
              </fieldset>
            </div>
          </div>
        </Paper>
      </div>

      <div className="container">
      <Paper elevation={3}>
          <div className="my-3 mx-4">
            <div>Notes</div>
            <div>
              <fieldset disabled={!isEditing}>
                <input
                  type="text"
                  className="form-control text-center my-4"
                  id="notes"
                  aria-describedby="emailHelp"
                  value={task.notes ? task.notes : ""}
                  onChange={(e) => handleInputChange(e, 'notes')}/>
              </fieldset>
              {user.permission == 2 &&
              <div className="d-flex justify-content-end">
                {isEditing
                  ? <>
                      <button className="btn btn-primary px-4" onClick={handleCancelClick}>Cancel</button>
                      <button className="btn btn-warning mx-2 px-4" onClick={saveChanges}>Save Changes</button>
                    </>
                  : 
                  <button className="btn btn-primary px-4" onClick={handleEditClick}>Edit</button> 
                }
              </div>
            }
            </div>
          </div>
        </Paper>
      </div>

    </div>
  );
}
