//got too tired but basically need to change this so that on submit we upload the photo file but difficult because that is in a child 
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import FileUpload from '../Components/FileUploadGeneric';
import { createJob } from '../Components/APICalls';
import DateInput from '../Components/DateInput';

function FormPage() {
  const [dates, setDates] = useState([{ date: '', startTime: '', endTime: '' }]);
  const [job, setJob] = useState();

  const handleDateChange = (index, field, value) => {
    const updatedDates = [...dates];
    updatedDates[index][field] = value;
    setDates(updatedDates);
  };

  const addDate = () => {
    setDates([...dates, { date: '', startTime: '', endTime: '' }]);
  };

  const deleteDate = (index) => {
    const updatedDates = [...dates];
    updatedDates.splice(index, 1);
    setDates(updatedDates);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    const customer = document.getElementById('customerName').value;
    const email = document.getElementById('email').value;
    const poNumber = document.getElementById('poNumber').value;
    const woNumber = document.getElementById('woNumber').value;
    const location = document.getElementById('location').value;
    const photo = document.getElementById('fileUpload').value;

    dates.forEach((dateTime) => {     
      const startTime = new Date(dateTime.date + 'T' + dateTime.startTime);
      const endTime = new Date(dateTime.date + 'T' + dateTime.endTime);
      const newJob = {
        customer,
        status: 'New',
        email,
        po_number: poNumber,
        wo_number: woNumber,
        setup: location,
        starttime: startTime,
        endtime: endTime
      };
      const createdJob = createJob(newJob);
      setJob(createdJob);
    });
  }
  
  return (
    <div className="container" style={{ maxWidth: '900px' }}>
      <h1 className="my-4 text-center">Request a job </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="customerName">Name</label>
          <input type="text" className="form-control" id="customerName" placeholder="Enter name"/>
        </div>
        <div className="mb-3">
          <label htmlFor="email">Email address</label>
          <input type="text" className="form-control" id="email" placeholder="Enter email"/>
        </div>
        <div className="mb-3">
          <label htmlFor="poNumber">PO Number</label>
          <input type="text" className="form-control" id="poNumber" placeholder="Enter PO Number (Optional)" />
        </div>
        <div className="mb-3">
          <label htmlFor="woNumber">WO Number</label>
          <input type="text" className="form-control" id="woNumber" placeholder="Enter WO Number (Optional)" />
        </div>
        <div className="mb-3">
          <label htmlFor="location">Location</label>
          <input type="text" className="form-control" id="location" placeholder="Enter Location" />
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
              deleteDate={deleteDate}
            />
          ))}
          <button type="button" className="btn btn-primary my-2" onClick={addDate}>Add Date and Time</button>
{/* 
          <FileUpload type="photo" callback={uploadFileBeforeSubmit}></FileUpload> */}

        <div className="text-center">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>

      </form>
    </div>
  );
}

export default FormPage;
