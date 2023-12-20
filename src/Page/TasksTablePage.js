import FileUpload from "../Components/FileUpload";
import React, { useEffect, useState, useRef } from "react";
import { getAlltasks, updatetask, deletetask, getUserById, getAllUsers, getTasksByJobId, getJobById, getFilesById, createtask, updateJob } from "../Components/APICalls";
import "bootstrap-icons/font/bootstrap-icons.css";
import Table from "../Components/Table";
import { useParams } from "react-router-dom";
 
let user = await getUserById(window.sessionStorage.getItem("user"))

export default function TasksTable() {
  const [files, setFiles] = useState("");
  const { id } = useParams();
  const [taskList, settaskList] = useState();
  const [job, setJob] = useState({
      customer:null, 
      status: null,
      wo_number: null,
      po_number: null,
      email: null,
      location: null,
      phone_number: null,
      starttime: null,
      endtime: null
  });
  const [isEditing, setIsEditing] = useState(false); // State to track edit mode
  //entire list of tasks
  const originalDataRef = useRef(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTasksByJobId(id);
        const jobData = await getJobById(id);
        setJob(jobData)
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
            console.log(fetchedFiles);
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
  
  async function addTask() {
    // Assuming createtask returns the newly created task, adjust accordingly
    const newTask = await createtask({ job_id: parseInt(id) });
  
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

  const handleCancelClick = () => {
    setIsEditing(false); // Enable edit mode
    window.location.reload()
  };

  const saveChanges = async () => {
    await updateJob(job.id, 
    {
      customer:job.customer, 
      status: job.status,
      wo_number: job.wo_number,
      po_number: job.po_number,
      email: job.email,
      location: job.location,
      phone_number: job.phone_number,
    }) 

    setIsEditing(false); // Disable edit mode after saving changes
  };

  const handleInputChange = async (e, jobProp) => {
    const newVal = e.target.value;
    await setJob((prevTask) => ({
      ...prevTask,
      [jobProp]: newVal,
    }));
  };

  return (
    <div>

    {job && <div className="container text-center justify-content-center my-4 d-flex">
      <div>
      <div className="card mx-4">
        <div className="card-header">
          Job Details
        </div>
          <fieldset disabled={!isEditing}>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="">Customer</span>
              </div>
              <input type="text" value={job.customer} className="form-control" onChange={(e)=>handleInputChange(e, 'customer')}/>
            </div>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="">Email</span>
              </div>
              <input type="text" value={job.email} className="form-control" onChange={(e)=>handleInputChange(e, 'email')}/>
            </div>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="">Phone Number</span>
              </div>
              <input type="text" value={job.phone_number} onChange={(e)=>handleInputChange(e, 'phone_number')} className="form-control"/>
            </div>
            <div className="input-group d-none d-sm-flex">
              <div className="input-group-prepend">
                <span className="input-group-text" id="">Status</span>
              </div>
              <input type="text" value={job.status} className="form-control" readOnly/>
            </div>
            <div className="input-group d-none d-sm-flex">
              <div className="input-group-prepend">
                <span className="input-group-text" id="">WO Number</span>
              </div>
              <input type="text" value={job.wo_number} onChange={(e)=>handleInputChange(e, 'wo_number')} className="form-control"/>
            </div>
            <div className="input-group d-none d-sm-flex">
              <div className="input-group-prepend">
                <span className="input-group-text" id="">Permit Number</span>
              </div>
              <input type="text" value={job.permit_number} onChange={(e)=>handleInputChange(e, 'permit_number')} className="form-control"/>
            </div>
          </fieldset>
      </div>

      {user.permission == 1 &&
          <>
            {isEditing
              ? <>
              <button className="btn btn-primary my-3 px-4" onClick={handleCancelClick}>Cancel</button>
              <button className="btn btn-warning mx-2 my-3 px-4" onClick={saveChanges}>Save Changes</button>
              </>
              : <button className="btn btn-primary my-3 px-4" onClick={handleEditClick}>Edit</button> 
            }
          </>
        }
      </div>
      <div className="card d-none d-sm-flex">
        <div className="card-header">
          Files
        </div>
        <div className="d-flex flex-wrap justify-content-center">
          <div className="mx-2 my-2">
            <label htmlFor="formFileDisabled" className="form-label my-1">Permit Confirmation</label>
            <FileUpload type="p_confirm" task={files.permit_confirmation_file} name={files.permit_confirmation_name}></FileUpload>
          </div>
          <div className="mx-2 my-2">
            <label htmlFor="formFileDisabled" className="form-label my-1">Permit</label>
            <FileUpload type="permit" task={files.permit_file} name={files.permit_name}></FileUpload>
          </div>
          <div className="mx-2 my-2">
            <label htmlFor="formFileDisabled" className="form-label my-1">Map Drawing</label>
            <FileUpload type="map" task={files.map_file} name={files.map_drawing_name}></FileUpload>
          </div>
          <div className="mx-2 my-2">
            <label htmlFor="formFileDisabled" className="form-label my-1">Photo</label>
            <FileUpload type="photo" task={files.photo_file} name={files.photo_name}></FileUpload>
          </div>
        </div>
      </div>
      </div>}
    <header className='container text-center my-4'>
      <h1>Tasks</h1>
      <Table
          data={taskList}
          displayColumns={["ID", "StartTime", "EndTime", "Setup", "Assigned"]}
          handleUpdate={handletaskUpdate} handleDelete={handletaskDelete} 
        />
      <button className='my-1 btn btn-outline-primary' onClick={()=>addTask()}> 
        Add Task
      </button>
    </header>
  </div>
  );
}
