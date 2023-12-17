import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { gettaskById, getUserById, updatetask } from "../Components/APICalls";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

let user = await getUserById(window.sessionStorage.getItem("user"));

function TaskEditPage() {
  const { id } = useParams();
  const [task, settask] = useState();
  const navigate = useNavigate();

  const handleFieldChange = (fieldName, event) => {
    let newValue = event.target.value;

    if (newValue !== task[fieldName]) {
      if(fieldName == 'starttime'|| fieldName == 'endtime'){
        newValue = new Date (newValue)
      }
      settask({ ...task, [fieldName]: newValue });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 

      updatetask(id, task);
    navigate("/taskdetails/"+id);
    window.location.reload()
  }

  useEffect(() => {
    async function fetchtask() {
      try{
        const fetchedtask = await gettaskById(id);
        settask(fetchedtask);
      } catch (error){
        console.error(error);
      }
    }
    fetchtask();
  }, [id]);

  return (
    <div className="container" style={{ maxWidth: '900px' }}>
      <h1 className="my-4 text-center">Edit task </h1>
      <form onSubmit={handleSubmit}>

      { user.permission == 1 && (
        <div className="mb-3">
          <label for="customerName">Name</label>
          <input type="text" className="form-control" id="customerName" value={task ? task.customer : ""} onChange={(e) => handleFieldChange('customer', e)}/>
        </div>
      )}

      { user.permission == 1 && (
        <div className="mb-3">
          <label for="phoneNumber">Phone Number</label>
          <input type="text" className="form-control" id="phoneNumber" value={task ? task.phone_number : ""} onChange={(e) => handleFieldChange('phone_number', e)}/>
        </div>
      )}

      { user.permission == 1 && (
        <div className="mb-3">
          <label for="setup">Setup</label>
          <input type="text" className="form-control" id="setup" value={task ? task.setup : ""} onChange={(e) => handleFieldChange('setup', e)}/>
        </div>
      )}

      { user.permission == 1 && (
        <div className="mb-3">
          <label for="email">Email address</label>
          <input type="text" className="form-control" id="email" value={task ? task.email : ""} onChange={(e) => handleFieldChange('email', e)}/>
        </div>
      )}

      { user.permission == 1 && (
        <div className="mb-3">
          <label for="permit_number">Permit Number</label>
          <input type="text" className="form-control" id="permit_number" value={task ? task.permit_number : ""} onChange={(e) => handleFieldChange('permit_number', e)}/>
        </div>
      )}
      
      { user.permission == 1 && (
        <div className="mb-3">
          <label for="poNumber">PO Number</label>
          <input type="text" className="form-control" id="poNumber" value={task ? task.po_number : ""} onChange={(e) => handleFieldChange('po_number', e)}/>
        </div>
      )}

      { user.permission == 1 && (
        <div className="mb-3">
          <label for="woNumber">WO Number</label>
          <input type="text" className="form-control" id="woNumber" value={task ? task.wo_number : ""} onChange={(e) => handleFieldChange('wo_number', e)}/>
        </div>
      )}

        <div className="mb-3">
          <label for="notes">Notes</label>
          < input type="text" className="form-control" id="notes" value={task ? task.notes : ""} onChange={(e) => handleFieldChange('notes', e)}/>
        </div>
        
        { user.permission == 1 && (
        <div className="mb-3">
          <div className="d-flex align-items-center">
           <label>Start Date</label>
           <input type="datetime-local" className="form-control mx-2" value={task ? new Date(task.starttime).toISOString().slice(0, 16) : ""} onChange={(e) => handleFieldChange('starttime', e)} />

            <label>End Date</label>
            <input type="datetime-local" className="form-control mx-2" value={task ? new Date(task.endtime).toISOString().slice(0, 16) : ""} onChange={(e) => handleFieldChange('endtime', e)} />
          </div>
        </div>
        )}

        <div className="text-center">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default TaskEditPage;
