//got too tired but basically need to change this so that on submit we upload the photo file but difficult because that is in a child 
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import FileUpload from '../Components/FileUploadGeneric';
import { createJob } from '../Components/APICalls';
import DateInput from '../Components/DateInput';
import { useNavigate } from "react-router-dom";
// import { create } from 'domain';

function FormPage() {
  const [dates, setDates] = useState([{ date: '', startTime: '', endTime: '' }]);
  const [job, setJob] = useState();
  const navigate = useNavigate();

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
    const phone_number = document.getElementById('phoneNumber').value;

    dates.forEach((dateTime) => {     
      const startTime = new Date(dateTime.date + 'T' + dateTime.startTime);
      const endTime = new Date(dateTime.date + 'T' + dateTime.endTime);
      const newJob = {
        customer,
        status: 'New',
        email,
        phone_number: phone_number,
        po_number: poNumber,
        wo_number: woNumber,
        setup: location,
        starttime: startTime,
        endtime: endTime
      };
      const createdJob = createJob(newJob);
      setJob(createdJob);
      navigate("/jobstable/");
      window.location.reload()
    });
  }
  
  return (
    <div className="container" style={{ maxWidth: '900px' }}>
      <h1 className="my-4 text-center">Request a job </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="customerName">Name</label>
          <input type="text" className="form-control" id="customerName" placeholder="Enter Name" required/>
        </div>
        <div className="mb-3">
          <label htmlFor="email">Email address</label>
          <input type="text" className="form-control" id="email" placeholder="Enter Email" required/>
        </div>
        <div className="mb-3">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input type="text" className="form-control" id="phoneNumber" placeholder="Enter Phone Number" required/>
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
          <input type="text" className="form-control" id="location" placeholder="Enter Location" required/>
        </div>
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

          <FileUpload type="photo"></FileUpload> 
          <p1 className = "text-danger">Currently not functional but this would be the image upload</p1>

        <div className="text-center">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>

      </form>
    </div>
  );
}

export default FormPage;
