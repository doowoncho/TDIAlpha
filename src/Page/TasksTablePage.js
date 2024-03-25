import FileUpload from "../Components/FileUpload";
import React, { useEffect, useState, useRef } from "react";
import { getAlltasks, updatetask, deletetask, getUserById, getAllUsers, getTasksByJobId, getJobById, getFilesById, createtask, updateJob } from "../Components/APICalls";
import "bootstrap-icons/font/bootstrap-icons.css";
import Table from "../Components/Table";
import { useParams } from "react-router-dom";
import { TasksTableColumns } from "../Helpers/TableUtils";
import SwipeableEdgeDrawer from "../Components/Drawer";
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import FeedIcon from '@mui/icons-material/Feed';
import MapIcon from '@mui/icons-material/Map';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import JobDetails from "../Components/JobDetails";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
 
let user = await getUserById(window.sessionStorage.getItem("user"))

export default function TasksTable() {
  const [files, setFiles] = useState("");
  const { id } = useParams();
  const [taskList, settaskList] = useState();
  const [job, setJob] = useState({
      contact:null, 
      status: null,
      wo_number: null,
      po_number: null,
      email: null,
      location: null,
      phone_number: null,
      starttime: null,
      endtime: null,
      permit_number: null,
      request_id: null,
      company: null,
      stamp: null,
      starttime: null,
      endtime: null
  });
  const [isEditing, setIsEditing] = useState(false); // State to track edit mode
  //entire list of tasks
  const originalDataRef = useRef(null);
  const [openDialog, setOpenDialog] = useState(false); // State variable to manage the visibility of the dialog
  const [type, setType] = React.useState('');

  // Function to handle the opening of the dialog
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleAddTask = () => {
    addTask(type);
    setOpenDialog(false);
  };

  const handleType = (event) => {
    setType(event.target.value);
  };
  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTasksByJobId(id);
        const jobData = await getJobById(id);
        setJob(jobData);

        //sort by newest
        const sortedData = data.sort((taskA, taskB) => {
          const timeA = taskA.endtime ? new Date(taskA.endtime) : new Date(taskA.starttime);
          const timeB = taskB.endtime ? new Date(taskB.endtime) : new Date(taskB.starttime);
          return timeA - timeB;
        })
        settaskList(sortedData);

        async function fetchFiles() {
          try {
            const fetchedFiles = await getFilesById(id);
            setFiles(fetchedFiles);
          } catch (error) {
            console.error(error);
          }
        }
        fetchFiles();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
  };
    fetchData();
  }, []);

  const handletaskUpdate = async (id, params) => {
    await updatetask(id, params);
    // No need to refetch data, just update the local state
    settaskList((prevtasks) =>
      prevtasks.map((task) => (task.id === id ? { ...task, ...params } : task))
    );
  };
  
  async function addTask(type) {
    // Assuming createtask returns the newly created task, adjust accordingly
    let completed = false
    const newTask = await createtask({ job_id: parseInt(id), completed: completed, type: type });
  
    // Update the taskList with the new task
    settaskList((prevtasks) => [...prevtasks, newTask]);
  }

  const handletaskDelete = async (id) => {
    await deletetask(id);
    // No need to refetch data, just update the local state
    settaskList((prevtasks) => prevtasks.filter((task) => task.id !== id));
  };

  const handleEditClick = () => {
    setIsEditing(true); // Enable edit mode
  };

  const handleCancelClick = async () => {
    setIsEditing(false); // Enable edit mode
    const jobData = await getJobById(id);
    setJob(jobData);
  };

  const saveChanges = async () => {
    var newStartTime = job.starttime ? new Date(job.starttime) : null
    var newEndTime = job.endtime ? new Date(job.endtime) : null

    await updateJob(job.id, 
    {
      contact:job.contact, 
      status: job.status,
      wo_number: job.wo_number,
      po_number: job.po_number,
      email: job.email,
      location: job.location,
      phone_number: job.phone_number,
      permit_number: job.permit_number,
      request_id: job.request_id,
      company: job.company,
      stamp: job.stamp,
      starttime: newStartTime,
      endtime: newEndTime
    }) 
    
    var npatTask = taskList.filter(x => x.type == "npat")[0]
    if(npatTask){
      console.log(npatTask)
      var temp = new Date()
      temp.setDate(newStartTime.getDate() - 1)
      await handletaskUpdate(npatTask.id, {starttime: temp})
    }

    setIsEditing(false);
  };

  const handleInputChange = async (e, jobProp) => {
    const newVal = e.target.value;
    await setJob((prevTask) => ({
      ...prevTask,
      [jobProp]: newVal,
    }));
  };

  return (
    <div className="container">
      <div className="container text-center justify-content-center d-flex">
        {job && <JobDetails job={job} handleInputChange = {handleInputChange} isEditing={isEditing} user={user} handleCancelClick={handleCancelClick} saveChanges={saveChanges} handleEditClick={handleEditClick}/>}
        
        <div className="card d-none d-sm-block my-4" style={{width: '70%', margin: '0 auto'}}>
          <div className="card-header">
            Files
          </div>
          <div className="d-flex flex-wrap">
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
    <header className='container text-center my-2'>
      <h1>Tasks</h1>
      <Table
        data={taskList}
        columns={TasksTableColumns}
        handleUpdate={handletaskUpdate}
        handleDelete={handletaskDelete} 
      />
      <button className='my-1 btn btn-outline-primary' onClick={handleOpenDialog}> 
        Add Task
      </button>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Button onClick={handleCloseDialog} className="ml-5" style={{ width:'10%', marginLeft:'auto'}}>
          <CloseIcon />
        </Button>
        <DialogContent>
          <DialogContentText>
            Select The Type of Task
          </DialogContentText>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={type}
              label="Type"
              onChange={handleType}
            >
              <MenuItem value={"NPAT"}>NPAT</MenuItem>
              <MenuItem value={"Setup"}>Setup</MenuItem>
              <MenuItem value={"Takedown"}>Takedown</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddTask}>
            Add Task
          </Button>
        </DialogActions>
      </Dialog>
    </header>
    </div>
  );
}
