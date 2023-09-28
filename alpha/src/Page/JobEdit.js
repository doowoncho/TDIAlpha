import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getJobById, updateJob } from "../Components/APICalls";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import DateInput from '../Components/DateInput';
import { useNavigate } from "react-router-dom";

function JobEditPage() {
  const { id } = useParams();
  const [dates, setDates] = useState([{ date: '', startTime: '', endTime: '' }]);
  const [job, setJob] = useState();
  const navigate = useNavigate();


  const handleFieldChange = (fieldName, event) => {
    const newValue = event.target.value;

    if (newValue !== job[fieldName]) {
      setJob({ ...job, [fieldName]: newValue });
    }
  };

  const handleDateChange = (index, field, value) => {
    const updatedDates = [...dates];
    updatedDates[index][field] = value;
    setDates(updatedDates);

    const startTime = new Date(updatedDates.date + 'T' + updatedDates.startTime);
    const endTime = new Date(updatedDates.date + 'T' + updatedDates.endTime);
    setJob({ ...job, ['starttime']: startTime });
    setJob({ ...job, ['endtime']: endTime });
  };

  const deleteDate = (index) => {
    const updatedDates = [...dates];
    updatedDates.splice(index, 1);
    setDates(updatedDates);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    const STARTTIME = 'starttime'
    const ENDTIME = 'endtime'

    dates.forEach((dateTime) => {     

      updateJob(id, job);
    });
    // navigate("/jobdetails/"+id);
    // window.location.reload()
  }

  useEffect(() => {
    async function fetchJob() {
      try{
        const fetchedJob = await getJobById(id);
        setJob(fetchedJob);
      } catch (error){
        console.error(error);
      }
    }
    fetchJob();
  }, [id]);

  return (
    <div className="container" style={{ maxWidth: '900px' }}>
      <h1 className="my-4 text-center">Edit Job </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="customerName">Name</label>
          <input type="text" className="form-control" id="customerName" value={job ? job.customer : ""} onChange={(e) => handleFieldChange('customer', e)}/>
        </div>
        <div className="mb-3">
          <label htmlFor="setup">Location</label>
          <input type="text" className="form-control" id="setup" value={job ? job.setup : ""} onChange={(e) => handleFieldChange('setup', e)}/>
        </div>
        <div className="mb-3">
          <label htmlFor="email">Email address</label>
          <input type="text" className="form-control" id="email" value={job ? job.email : ""} onChange={(e) => handleFieldChange('email', e)}/>
        </div>
        <div className="mb-3">
          <label htmlFor="permit_number">Permit Number</label>
          <input type="text" className="form-control" id="permit_number" value={job ? job.permit_number : ""} onChange={(e) => handleFieldChange('permit_number', e)}/>
        </div>
        <div className="mb-3">
          <label htmlFor="poNumber">PO Number</label>
          <input type="text" className="form-control" id="poNumber" value={job ? job.po_number : ""} onChange={(e) => handleFieldChange('po_number', e)}/>
        </div>
        <div className="mb-3">
          <label htmlFor="woNumber">WO Number</label>
          <input type="text" className="form-control" id="woNumber" value={job ? job.wo_number : ""} onChange={(e) => handleFieldChange('wo_number', e)}/>
        </div>
        <div className="mb-3">
          <label htmlFor="notes">Notes</label>
          <input type="text" className="form-control" id="notes" value={job ? job.notes : ""} onChange={(e) => handleFieldChange('notes', e)}/>
        </div>
        <p className="text-danger">
          Experimental way to handle multiple dates and times that a client might ask for.
        </p>
            {dates.map((date, index) => (
            <DateInput
              key={index}
              date={date}
              index={index}
              handleDateChange={handleDateChange}
              editMode={false}
              deleteDate={deleteDate}
            />
          ))}
        <div className="text-center">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default JobEditPage;
