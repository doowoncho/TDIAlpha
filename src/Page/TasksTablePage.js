import FileUpload from "../Components/FileUpload";
import React, { useEffect, useState, useRef } from "react";
import { getAlltasks, updatetask, deletetask, getUserById, getAllUsers, getTasksByJobId, getJobById, getFilesById } from "../Components/APICalls";
import "bootstrap-icons/font/bootstrap-icons.css";
import Table from "../Components/Table";
import e from "cors";
import { useParams } from "react-router-dom";
 
let user = await getUserById(window.sessionStorage.getItem("user"))
let users = await getAllUsers()

export default function TasksTable() {
  const [files, setFiles] = useState("");
  const { id } = useParams();
  const [taskList, settaskList] = useState();
  const [job, setJob] = useState();
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
    console.log(id)
    await updatetask(id, params);
    // No need to refetch data, just update the local state
    settaskList((prevtasks) =>
      prevtasks.map((task) => (task.id === id ? { ...task, ...params } : task))
    );
  };
  
  const handletaskDelete = async (id) => {
    await deletetask(id);
    // No need to refetch data, just update the local state
    settaskList((prevtasks) => prevtasks.filter((task) => task.id !== id));
  };

  return (
    <div>

    {job && <div className="container text-center justify-content-center my-4 d-flex">
      <div className="card mx-4">
        <div className="card-header">
          Job Details
        </div>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="">Customer</span>
              </div>
              <input type="text" value={job.customer} className="form-control" readOnly/>
            </div>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="">Email</span>
              </div>
              <input type="text" value={job.email} className="form-control" readOnly/>
            </div>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="">Phone Number</span>
              </div>
              <input type="text" value={job.phone_number} className="form-control" readOnly/>
            </div>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="">Status</span>
              </div>
              <input type="text" value={job.status} className="form-control" readOnly/>
            </div>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="">WO Number</span>
              </div>
              <input type="text" value={job.wo_number} className="form-control" readOnly/>
            </div>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="">Permit Number</span>
              </div>
              <input type="text" value={job.permit_number} className="form-control" readOnly/>
            </div>
      </div>
      <div className="card">
        <div className="card-header">
          Files
        </div>
            <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
              <div>
                <label for="formFileDisabled" className="form-label my-1">Permit Confirmation</label>
                  <FileUpload type="p_confirm" task={files.permit_confirmation_file} name={files.permit_confirmation_name}></FileUpload>
              </div>
              <div>
                <label for="formFileDisabled" className="form-label my-1">Permit</label>
                  <FileUpload type="permit" task={files.permit_file} name={files.permit_name}></FileUpload>
              </div>
              <div>
                <label for="formFileDisabled" className="form-label my-1">Map Drawing</label>
                  <FileUpload type="map" task={files.map_file} name={files.map_drawing_name}></FileUpload>
              </div>
              <div>
                <label for="formFileDisabled" className="form-label my-1">Photo</label>
                  <FileUpload type="photo" task={files.photo_file} name={files.photo_name}></FileUpload>
              </div>
        </div>
      </div>
      </div>}

    <header className='container text-center my-4'>
      <h1>Tasks Page</h1>
      <Table
          data={taskList}
          displayColumns={["ID", "StartTime", "EndTime", "Setup", "Assigned"]}
          handletaskUpdate={handletaskUpdate} handletaskDelete={handletaskDelete} 
        />
      <button className='my-1 btn btn-outline-primary'>
        Add Task
      </button>
    </header>
  </div>
  );
}
