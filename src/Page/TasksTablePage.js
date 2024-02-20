import FileUpload from "../Components/FileUpload";
import React, { useEffect, useState, useRef } from "react";
import { getAlltasks, updatetask, deletetask, getUserById, getAllUsers, getTasksByJobId, getJobById, getFilesById, createtask, updateJob } from "../Components/APICalls";
import "bootstrap-icons/font/bootstrap-icons.css";
import Table from "../Components/Table";
import { useParams } from "react-router-dom";
import moment from "moment";
import { TasksTableColumns } from "../Helpers/TableUtils";
 
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
  
  async function addTask() {
    // Assuming createtask returns the newly created task, adjust accordingly
    let completed = false
    const newTask = await createtask({ job_id: parseInt(id), completed: completed });
  
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
                <span className="input-group-text" id="">Contact</span>
              </div>
              <input type="text" value={job.contact || ''} className="form-control" onChange={(e)=>handleInputChange(e, 'contact')}/>
            </div>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="">Company</span>
              </div>
              <input type="text" value={job.company || ''} onChange={(e)=>handleInputChange(e, 'company')} className="form-control"/>
            </div>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="">Email</span>
              </div>
              <input type="text" value={job.email || ''} className="form-control" onChange={(e)=>handleInputChange(e, 'email')}/>
            </div>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="">Phone Number</span>
              </div>
              <input type="text" value={job.phone_number || ''} onChange={(e)=>handleInputChange(e, 'phone_number')} className="form-control"/>
            </div>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="">Status</span>
              </div>
              <input type="text" value={job.status || ''} className="form-control" readOnly/>
            </div>
            <div className="input-group d-none d-sm-flex">
              <div className="input-group-prepend">
                <span className="input-group-text" id="">WO Number</span>
              </div>
              <input type="text" value={job.wo_number || ''} onChange={(e)=>handleInputChange(e, 'wo_number')} className="form-control"/>
            </div>
            <div className="input-group d-none d-sm-flex">
              <div className="input-group-prepend">
                <span className="input-group-text" id="">Permit Number</span>
              </div>
              <input type="text" value={job.permit_number || ''} onChange={(e)=>handleInputChange(e, 'permit_number')} className="form-control"/>
            </div>
            <div className="input-group d-none d-sm-flex">
              <div className="input-group-prepend">
                <span className="input-group-text" id="">PO Number</span>
              </div>
              <input type="text" value={job.po_number || ''} onChange={(e)=>handleInputChange(e, 'po_number')} className="form-control"/>
            </div>
            <div className="input-group d-none d-sm-flex">
              <div className="input-group-prepend">
                <span className="input-group-text" id="">Request ID</span>
              </div>
              <input type="text" value={job.request_id || ''} onChange={(e)=>handleInputChange(e, 'request_id')} className="form-control"/>
            </div>
          
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="">Stamp</span>
              </div>
              <select value={job.stamp == null ? "none" : job.stamp} onChange={(e) => handleInputChange(e, 'stamp')}>
                <option value="stamped">Stamped</option>
                <option value="reStamped">Re-stamped</option>
                <option value="rushedStamp">Rushed Stamp</option>
                <option value="none">None</option>
              </select>
            </div>
            <div className="input-group d-none d-sm-flex">
              <div className="input-group-prepend">
                <span className="input-group-text" id="">Start Time</span>
              </div>
                    <input type="datetime-local" className="form-control" id="startDate" value={moment(job.starttime).format('YYYY-MM-DDTHH:mm')}
                    onChange={(e) => handleInputChange(e, 'starttime')}/>
            </div>
            <div className="input-group d-none d-sm-flex">
              <div className="input-group-prepend">
                <span className="input-group-text" id="">End Time</span>
              </div>
                    <input type="datetime-local" className="form-control" id="startDate" value={moment(job.endtime).format('YYYY-MM-DDTHH:mm')}
                    onChange={(e) => handleInputChange(e, 'endtime')}/>
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
      </div>}
    <header className='container text-center my-4'>
      <h1>Tasks</h1>
      <Table
          data={taskList}
          columns={TasksTableColumns}
          handleUpdate={handletaskUpdate} handleDelete={handletaskDelete} 
        />
      <button className='my-1 btn btn-outline-primary' onClick={()=>addTask()}> 
        Add Task
      </button>
    </header>
  </div>
  );
}
