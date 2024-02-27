import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { getUserById, gettaskById, updatetask, getJobById, getFilesById, getTasksByJobId } from '../Components/APICalls';
import '../Styles/TaskDetails.css';
import FileUpload from '../Components/FileUpload';
import SwipeableEdgeDrawer from '../Components/Drawer';

let user = await getUserById(window.sessionStorage.getItem("user"))

export default function Orders() {
  const { id } = useParams();
  let jobID;
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
  const [job, setJob] = useState()
  const [files, setFiles] = useState(null);
  const [isCompleted, setIsCompleted] = useState(task.completed || false);

  useEffect(() => {
    async function fetchTask() {
      try {
        const fetchedTask = await gettaskById(id);
        setTask(fetchedTask);
        setIsCompleted(fetchedTask.completed || false);
  
        const fetchedJob = await getJobById(fetchedTask.job_id);
        setJob(fetchedJob);
  
        const fetchedFiles = await getFilesById(fetchedJob.id);
        setFiles(fetchedFiles);
        console.log(fetchedFiles);
        console.log(files);
  
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
      taskType = 'both'
    }
    else if(newStartTime !=null){
      taskType = 'place'
    }
    else if(newEndTime !=null){
      taskType = 'pickup'
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
  
  jobID = job.id;

  return (
    <div>

      <div className='container d-flex justify-content-between mt-3'>
        <div className="d-flex">
          <a href={`/taskspage/${task.job_id}`}>Back</a>
        </div>

        {user.permission == 1 &&
        <div className="d-flex">
          {isEditing
            ? <>
                <button className="btn btn-primary px-4" onClick={handleCancelClick}>Cancel</button>
                <button className="btn btn-warning mx-2 px-4" onClick={saveChanges}>Save Changes</button>
              </>
            : 
            <>
            <button className="btn btn-primary px-4" onClick={handleEditClick}>Edit</button> 
            <div class="form-check">
              <input class="form-check-input m-1 h-50" type="checkbox" value="" id="flexCheckDefault" checked={isCompleted} onChange={handleCheckboxChange}></input>
                <label class="form-check-label h5" for="flexCheckDefault">Mark As Complete</label>
            </div>
            </>
          }
        </div>}

      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="card">
          <div className="card-body">

              <label>ID</label>
              <input type="number" className="form-control" value={task.id} disabled/>

            <fieldset disabled={user.permission == 2 || !isEditing}>
                  {isEditing 
                  ? <>
                    <label htmlFor="exampleInputStartDate">Start Time:</label>
                    <input type="datetime-local" className="form-control" id="startDate" value={moment(task.starttime).format('YYYY-MM-DDTHH:mm')}
                    onChange={(e) => handleInputChange(e, 'starttime')}/>
                    
                    <label htmlFor="exampleInputEndDate">End Time:</label>
                    <input
                    type="datetime-local"
                    className="form-control"
                    id="enddate"
                    value={moment(task.endtime).format('YYYY-MM-DDTHH:mm')}
                    onChange={(e) => handleInputChange(e, 'endtime')}/>
                  </>             
                 : <>
                    {task.starttime &&
                    <>
                      <label htmlFor="exampleInputStartDate">Drop Off Time:</label>
                      <input type="datetime-local" className="form-control" id="startDate" value={moment(task.starttime).format('YYYY-MM-DDTHH:mm')}
                      onChange={(e) => handleInputChange(e, 'starttime')}/>
                    </>}
                    {task.endtime &&
                    <>
                    <label htmlFor="exampleInputEndDate">Pick Up Time:</label>
                    <input
                    type="datetime-local"
                    className="form-control"
                    id="enddate"
                    value={moment(task.endtime).format('YYYY-MM-DDTHH:mm')}
                    onChange={(e) => handleInputChange(e, 'endtime')}/>
                    </>}
                  </>
                }
            </fieldset>

          </div>
        </div>
      </div>

    <div className='container my-2'>
      <div className="card d-none d-sm-block" style={{width: '8 0%', margin: '0 auto'}}>
          <div className="card-header">
            Files
          </div>
            <div className="d-flex flex-wrap justify-content-center">
              <div className="mx-2 my-2">
                <label htmlFor="formFileDisabled" className="form-label my-1">Permit Confirmation</label>
                <FileUpload type="permitConfirmation" giveID={id}></FileUpload>
              </div>
              <div className="mx-2 my-2">
                <label htmlFor="formFileDisabled" className="form-label my-1">Permit</label>
                <FileUpload type="permit" giveID={id}></FileUpload>
              </div>
              <div className="mx-2 my-2">
                <label htmlFor="formFileDisabled" className="form-label my-1">Plan</label>
                <FileUpload type="plan"  giveID={id}></FileUpload>
              </div>
              <div className="mx-2 my-2">
                <label htmlFor="formFileDisabled" className="form-label my-1">Photo</label>
                <FileUpload type="photo" giveID={id}></FileUpload>
              </div>
            </div>
      </div>
    </div>

  <div className='container my-2'>
      <div className="card d-block d-sm-none">
        <div className="card-header">
          Files
        </div>
        <div className="d-flex flex-wrap justify-content-center">
            <div className="mx-2 my-2">
              <SwipeableEdgeDrawer type="permitConfirmation" jobId={id} label="Permit Confirmation"></SwipeableEdgeDrawer>
            </div>
            <div className="mx-2 my-2">
              <SwipeableEdgeDrawer type="permit" jobId={id} label="Permit"></SwipeableEdgeDrawer>
            </div>
            <div className="mx-2 my-2">
              <SwipeableEdgeDrawer type="plan" jobId={id} label="Plan"></SwipeableEdgeDrawer>
            </div>
            <div className="mx-2 my-2">
              <SwipeableEdgeDrawer type="photo" jobId={id} label="Photo"></SwipeableEdgeDrawer>
            </div>
          </div>
      </div>
  </div>

      <div className="container">
        <div className="card my-3 mx-4">
          <div className="card-header">Setup</div>
          <div className="card-body">
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
      </div>

      <div className="container">
        <div className="card my-3 mx-4">
          <div className="card-header">Notes</div>
          <div className="card-body">
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
      </div>

    </div>
  );
}
