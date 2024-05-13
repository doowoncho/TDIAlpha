import FileUpload from "../Components/FileUpload";
import React, { useEffect, useState, useRef } from "react";
import { getAlltasks, updatetask, deletetask, getUserById, getAllUsers, getTasksByJobId, getJobById, getFilesById, createtask, updateJob } from "../Components/APICalls";
import "bootstrap-icons/font/bootstrap-icons.css";
import Table from "../Components/Table";
import { useParams } from "react-router-dom";
import { TasksTableColumns } from "../Helpers/TableUtils";
import SwipeableEdgeDrawer from "../Components/Drawer";
import JobDetails from "../Components/JobDetails";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import moment from "moment";
import { LinearProgress } from "@mui/material";
 
let user = await getUserById(window.sessionStorage.getItem("user"))

export default function TasksTable() {
  const { id } = useParams();
  const [files, setFiles] = useState("");
  const [loading, setLoading] = useState(true);
  const [taskList, setTaskList] = useState([]);
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
      endtime: null,
      jobNotes: null
  });

  const [isEditing, setIsEditing] = useState(false); // State to track edit mode
  //entire list of tasks
  const originalDataRef = useRef(null);
  const [openDialog, setOpenDialog] = useState(false); // State variable to manage the visibility of the dialog
  const [type, setType] = React.useState('');
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

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
  
  const notesChange = (event) =>{
     setJob((prevTask) => ({
      ...prevTask,
      jobNotes: event.target.value,
    }));
  }
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tasks, job, files] = await Promise.all([
          getTasksByJobId(id),
          getJobById(id),
          getFilesById(id)
        ]);
  
        let taskTotal = 0;
        let taskFinished = 0;
        for (let i = 0; i < tasks.length; i++) {
          if (tasks[i]["type"] === "Finished" || tasks[i]["type"] === "Cancelled" || tasks[i]["type"] === "Cancelled OS") {
            taskFinished++;
          }
          taskTotal++; 
        }
        if (taskTotal === taskFinished) {
          await updateJob(job.id, 
            {
              contact:job.contact, 
              status: "Completed",
              wo_number: job.wo_number,
              po_number: job.po_number,
              email: job.email,
              location: job.location,
              phone_number: job.phone_number,
              permit_number: job.permit_number,
              request_id: job.request_id,
              company: job.company,
              stamp: job.stamp,
              // starttime: moment.tz(newStartTime, 'America/Edmonton').utc(),
              // endtime: moment.tz(newEndTime, 'America/Edmonton').utc()
            }) 
        }
        setJob(job);
         // Sort tasks by newest
        tasks.sort((taskA, taskB) => {
          const timeA = taskA.endtime ? new Date(taskA.endtime) : new Date(taskA.starttime);
          const timeB = taskB.endtime ? new Date(taskB.endtime) : new Date(taskB.starttime);
          return timeA - timeB;
        });
        setTaskList(tasks);
        setFiles(files);
        setLoading(false);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);

  const handletaskUpdate = async (id, params) => {
    await updatetask(id, params);
    // No need to refetch data, just update the local state
    setTaskList((prevtasks) =>
      prevtasks.map((task) => (task.id === id ? { ...task, ...params } : task))
    );
  };
  
  async function addTask(type) {
    // Assuming createtask returns the newly created task, adjust accordingly
    let completed = false
    let startDate
    if(type == "NPAT"){
      let job = await getJobById(parseInt(id))
      startDate = new Date(job.starttime);
      startDate.setDate(startDate.getDate() - 1)
    }

    const newTask = await createtask({ job_id: parseInt(id), completed: completed, type: type, starttime: startDate});
  
    // Update the taskList with the new task
    setTaskList((prevtasks) => [...prevtasks, newTask]);
  }

  const handletaskDelete = async (id) => {
    setSelectedRowId(id); // Set the selected row ID
    setDeleteDialogOpen(true); // Open the delete dialog
    handleConfirmDelete(id);
  };

  const handleConfirmDelete = async (id) => {
    await id.forEach(element => {
      deletetask(element);
    })
    // setTaskList((prevtasks) => prevtasks.filter((task) => task.id !== id));
    window.location.reload();
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
      // starttime: moment.tz(newStartTime, 'America/Edmonton').utc(),
      // endtime: moment.tz(newEndTime, 'America/Edmonton').utc()
    }) 
    
    var npatTask = taskList.filter(x => x.type == "NPAT")[0]
    if(npatTask){
      newStartTime?.setDate(newStartTime.getDate() - 1)
      await handletaskUpdate(npatTask.id, {starttime: moment.tz(newStartTime, 'America/Edmonton').utc()})
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

  if(loading == true){
    return <LinearProgress />
  }

  return (
    <div className="container">
      <div className="container text-center justify-content-center d-flex">
        {job && <JobDetails job={job} handleInputChange = {handleInputChange} isEditing={isEditing} user={user} handleCancelClick={handleCancelClick} saveChanges={saveChanges} handleEditClick={handleEditClick}/>}
        <div className="card d-none d-sm-block my-4">
          <div className="card-header">
            Files
          </div>
          <div className="d-flex flex-wrap justify-content-center">
            <div className="mx-2 my-2">
              <label htmlFor="formFileDisabled" className="form-label my-1">P.Confrim</label>
              <FileUpload type="permitConfirmation" giveID={id} files={files}></FileUpload>
            </div>
            <div className="mx-2 my-2">
              <label htmlFor="formFileDisabled" className="form-label my-1">Permit</label>
              <FileUpload type="permit" giveID={id} files={files}></FileUpload>
            </div>
            <div className="mx-2 my-2">
              <label htmlFor="formFileDisabled" className="form-label my-1">Plan</label>
              <FileUpload type="plan"  giveID={id} files={files}></FileUpload>
            </div>
            <div className="mx-2 my-2">
              <label htmlFor="formFileDisabled" className="form-label my-1">Photo</label>
              <FileUpload type="photo" giveID={id} files={files}></FileUpload>
            </div>
          </div>
        </div>
      </div>
      <div className="card d-block d-sm-none my-2">
        <div className="card-header">
          Files
        </div>
        <div className="d-flex flex-wrap justify-content-center">
          <div className="mx-2 my-2">
            <SwipeableEdgeDrawer type="permitConfirmation" jobId={id} label="P. Confirm" count = {files.permitConfirmation?.length} files={files}></SwipeableEdgeDrawer>
          </div>
          <div className="mx-2 my-2">
            <SwipeableEdgeDrawer type="permit" jobId={id} label="Permit" count = {files.permit?.length} files={files}></SwipeableEdgeDrawer>
          </div>
          <div className="mx-2 my-2">
            <SwipeableEdgeDrawer type="plan" jobId={id} label="Plan" count = {files.plan?.length} files={files}></SwipeableEdgeDrawer>
          </div>
          <div className="mx-2 my-2">
            <SwipeableEdgeDrawer type="photo" jobId={id} label="Photo" count = {files.photo?.length} files={files}></SwipeableEdgeDrawer>
          </div>
        </div>
      </div>
    <header className='container text-center my-2'>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <label>Notes </label>
      <input
        type="text"
        className="form-control my-1"
        id="notes"
        value={job.jobNotes ?? ""}
        onChange={(e) => notesChange(e)}
      />
      <Button variant="contained" onClick={() => updateJob(id, job)} style={{ alignSelf: 'flex-start', marginTop: '10px' }}>Save</Button>
    </div>
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
            Select Task Type
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
              <MenuItem value={"Place"}>Place</MenuItem>
              <MenuItem value={"Knockdown"}>Knockdown</MenuItem>
              <MenuItem value={"SameDay"}>SameDay</MenuItem>
              <MenuItem value={"PickUp"}>Pickup</MenuItem>
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
